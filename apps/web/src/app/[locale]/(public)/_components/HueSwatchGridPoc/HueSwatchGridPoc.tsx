'use client';

import { useEffect, useRef, useState } from 'react';

const STAGE_WIDTH = 900;
const STAGE_HEIGHT = 400;
const GRID_COLUMNS = 23;
const GRID_ROWS = 10;
const HUE_DURATION_MS = 12_000;
const EDGE_PERIOD_MS = 6_000;
const EDGE_BAND_WIDTH = 0.16;
const EDGE_ALPHA_MIN = 0.35;
const EDGE_ALPHA_RANGE = 0.4;
const EDGE_GLOW = 0.2;
const EDGE_GLOW_ALPHA = 0.45;
const FRAME_INTERVAL_MS = 1000 / 20;
const OVERLAY_REACH = 0.4;
const SEAM = 1;

const EDGE_ARROW_LENGTH = 6;
const EDGE_ARROW_WIDTH = 3;
const EDGE_ARROW_ANGLES: Record<ArrowDirection, number> = {
  right: 0,
  down: Math.PI / 2,
  left: Math.PI,
  up: -Math.PI / 2,
};

type Hsl = readonly [number, number, number];
type EdgeDirection = -1 | 1;
type EdgeSide = 'top' | 'right' | 'bottom' | 'left';
type ArrowDirection = 'up' | 'right' | 'down' | 'left';

const FALLBACK_EDGE: EdgeLine = { direction: 1, phase: 0, speed: 1 };

/** Warm / cool / magenta palette, matching the hue swatch demo. */
const PALETTE: readonly Hsl[] = [
  [22, 90, 58],
  [34, 92, 62],
  [46, 90, 66],
  [16, 88, 55],
  [8, 82, 55],
  [205, 86, 62],
  [218, 90, 58],
  [196, 80, 66],
  [330, 80, 60],
  [344, 86, 62],
  [310, 76, 58],
];

const createRandom = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

interface EdgeLine {
  readonly direction: EdgeDirection;
  readonly phase: number;
  readonly speed: number;
}

interface EdgeLines {
  readonly horizontal: readonly EdgeLine[];
  readonly vertical: readonly EdgeLine[];
}

interface Cell {
  readonly row: number;
  readonly column: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly anchorHue: number;
  readonly saturation: number;
  readonly lightness: number;
  readonly phase: number;
  readonly speed: number;
  readonly offsets: readonly [number, number, number, number];
}

interface Scene {
  readonly cells: readonly Cell[];
  readonly lines: EdgeLines;
}

interface EdgeStrength {
  readonly alpha: number;
  readonly reach: number;
  readonly glow: number;
}

interface EdgeGeometry {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly start: readonly [number, number];
  readonly end: readonly [number, number];
}

interface EdgeGlowOptions {
  readonly context: CanvasRenderingContext2D;
  readonly geometry: EdgeGeometry;
  readonly alpha: number;
}

interface CellEdgeOptions {
  readonly context: CanvasRenderingContext2D;
  readonly cell: Cell;
  readonly side: EdgeSide;
  readonly line: EdgeLine;
  readonly position: number;
  readonly hueOffset: number;
  readonly baseHue: number;
  readonly elapsed: number;
}

const buildEdgeLines = (random: () => number, count: number): EdgeLine[] =>
  Array.from({ length: count }, () => ({
    direction: random() < 0.5 ? -1 : 1,
    phase: random(),
    speed: 0.7 + random() * 0.6,
  }));

const buildLines = (random: () => number): EdgeLines => ({
  // One line per shared edge: `columns + 1` vertical lines and `rows + 1`
  // horizontal ones. A line is shared by the cells on both sides of it.
  horizontal: buildEdgeLines(random, GRID_ROWS + 1),
  vertical: buildEdgeLines(random, GRID_COLUMNS + 1),
});

const buildCells = (random: () => number): Cell[] => {
  const cellWidth = STAGE_WIDTH / GRID_COLUMNS;
  const cellHeight = STAGE_HEIGHT / GRID_ROWS;
  const cells: Cell[] = [];

  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let column = 0; column < GRID_COLUMNS; column += 1) {
      const palette =
        PALETTE[Math.floor(random() * PALETTE.length)] ?? PALETTE[0];

      cells.push({
        row,
        column,
        x: column * cellWidth + SEAM / 2,
        y: row * cellHeight + SEAM / 2,
        width: cellWidth - SEAM,
        height: cellHeight - SEAM,
        anchorHue: palette[0],
        saturation: palette[1],
        lightness: palette[2],
        phase: random() * 360,
        speed: 0.6 + random() * 0.8,
        offsets: [
          40 + random() * 20,
          120 + random() * 30,
          230 + random() * 30,
          300 + random() * 30,
        ],
      });
    }
  }

  return cells;
};

const buildScene = (random: () => number): Scene => ({
  cells: buildCells(random),
  lines: buildLines(random),
});

const normaliseHue = (hue: number) => ((hue % 360) + 360) % 360;

const cellHue = (cell: Cell, elapsed: number) =>
  cell.anchorHue + (elapsed / HUE_DURATION_MS) * 360 * cell.speed + cell.phase;

interface ColorSample {
  readonly hue: number;
  readonly saturation: number;
  readonly lightness: number;
}

const sampleCell = (cell: Cell, baseHue: number): ColorSample => ({
  hue: normaliseHue(baseHue),
  saturation: cell.saturation,
  lightness: cell.lightness,
});

/** Mixes two hues along the shortest arc so blends never sweep the long way. */
const mixHue = (from: number, to: number) => {
  const delta = ((to - from + 540) % 360) - 180;

  return normaliseHue(from + delta / 2);
};

const mixSamples = (from: ColorSample, to: ColorSample): ColorSample => ({
  hue: mixHue(from.hue, to.hue),
  saturation: (from.saturation + to.saturation) / 2,
  lightness: (from.lightness + to.lightness) / 2,
});

const sampleColor = (sample: ColorSample) =>
  `hsl(${sample.hue}, ${sample.saturation}%, ${sample.lightness}%)`;

/** Ping-pongs between 0 and 1, bouncing off both ends. */
const pingPong = (value: number) => {
  const wrapped = ((value % 1) + 1) % 1;

  return 1 - Math.abs(2 * wrapped - 1);
};

interface EdgeMotion {
  readonly cycle: number;
  /** Highlight position along the line, 0 at the start and 1 at the end. */
  readonly centre: number;
}

/** Shared clock for a line's fade pulse and travelling highlight. */
const edgeMotion = (line: EdgeLine, elapsed: number): EdgeMotion => {
  const cycle = (elapsed / EDGE_PERIOD_MS) * line.speed + line.phase;
  const travel = pingPong(cycle);

  return {
    cycle,
    centre: line.direction > 0 ? travel : 1 - travel,
  };
};

/**
 * Fade pulse and travelling highlight for one edge line.
 *
 * `position` is the cell's centre along the line (0–1), so every cell on the
 * line sees the same highlight pass over it. Lines animate backwards and
 * forwards; the direction is assigned randomly per line.
 */
const edgeStrength = (
  line: EdgeLine,
  position: number,
  elapsed: number,
): EdgeStrength => {
  const { cycle, centre } = edgeMotion(line, elapsed);
  const distance = Math.abs(position - centre);
  const highlight = Math.max(0, 1 - distance / EDGE_BAND_WIDTH);
  const pulse = 0.5 + 0.5 * Math.sin(cycle * Math.PI * 2);

  return {
    alpha: Math.min(
      0.95,
      EDGE_ALPHA_MIN + EDGE_ALPHA_RANGE * pulse + EDGE_GLOW * highlight,
    ),
    reach: 0.7 + 0.3 * pulse,
    glow: highlight * EDGE_GLOW_ALPHA,
  };
};

/**
 * Whether the line's highlight is currently moving towards the end of the
 * line (right/down) or back towards the start (left/up).
 */
const isEdgeForward = (line: EdgeLine, elapsed: number) => {
  const cycle = (elapsed / EDGE_PERIOD_MS) * line.speed + line.phase;
  const wrapped = ((cycle % 1) + 1) % 1;
  const rising = wrapped < 0.5;

  return rising === line.direction > 0;
};

const edgeGeometry = (
  cell: Cell,
  side: EdgeSide,
  reach: number,
): EdgeGeometry => {
  const { x, y, width, height } = cell;
  const reachX = width * OVERLAY_REACH * reach;
  const reachY = height * OVERLAY_REACH * reach;

  switch (side) {
    case 'top':
      return {
        x,
        y,
        width,
        height: reachY,
        start: [x, y],
        end: [x, y + reachY],
      };
    case 'right':
      return {
        x: x + width - reachX,
        y,
        width: reachX,
        height,
        start: [x + width, y],
        end: [x + width - reachX, y],
      };
    case 'bottom':
      return {
        x,
        y: y + height - reachY,
        width,
        height: reachY,
        start: [x, y + height],
        end: [x, y + height - reachY],
      };
    case 'left':
      return {
        x,
        y,
        width: reachX,
        height,
        start: [x, y],
        end: [x + reachX, y],
      };
  }
};

/** Thin white glint that travels along the line on top of the colour fade. */
const paintEdgeGlow = ({ context, geometry, alpha }: EdgeGlowOptions) => {
  const gradient = context.createLinearGradient(
    geometry.start[0],
    geometry.start[1],
    geometry.end[0],
    geometry.end[1],
  );

  gradient.addColorStop(0, `rgba(255, 252, 245, ${alpha})`);
  gradient.addColorStop(1, 'rgba(255, 252, 245, 0)');
  context.fillStyle = gradient;
  context.fillRect(geometry.x, geometry.y, geometry.width, geometry.height);
};

const paintCellEdge = ({
  context,
  cell,
  side,
  line,
  position,
  hueOffset,
  baseHue,
  elapsed,
}: CellEdgeOptions) => {
  const { alpha, reach, glow } = edgeStrength(line, position, elapsed);
  const geometry = edgeGeometry(cell, side, reach);
  const color = (valueAlpha: number) =>
    `hsla(${normaliseHue(baseHue + hueOffset)}, ${cell.saturation}%, ${cell.lightness}%, ${valueAlpha})`;
  const gradient = context.createLinearGradient(
    geometry.start[0],
    geometry.start[1],
    geometry.end[0],
    geometry.end[1],
  );

  gradient.addColorStop(0, color(alpha));
  gradient.addColorStop(1, color(0));
  context.fillStyle = gradient;
  context.fillRect(geometry.x, geometry.y, geometry.width, geometry.height);

  if (glow > 0.01) {
    paintEdgeGlow({
      context,
      geometry: edgeGeometry(cell, side, reach * 0.6),
      alpha: glow,
    });
  }
};

const verticalGutterSample = (
  cells: readonly Cell[],
  baseHues: readonly number[],
  boundary: number,
  row: number,
): ColorSample | undefined => {
  const leftIndex = row * GRID_COLUMNS + boundary - 1;
  const rightIndex = row * GRID_COLUMNS + boundary;
  const left = boundary > 0 ? cells[leftIndex] : undefined;
  const right = boundary < GRID_COLUMNS ? cells[rightIndex] : undefined;

  if (left && right) {
    return mixSamples(
      sampleCell(left, baseHues[leftIndex] ?? 0),
      sampleCell(right, baseHues[rightIndex] ?? 0),
    );
  }

  if (left) {
    return sampleCell(left, baseHues[leftIndex] ?? 0);
  }

  if (right) {
    return sampleCell(right, baseHues[rightIndex] ?? 0);
  }

  return undefined;
};

const horizontalGutterSample = (
  cells: readonly Cell[],
  baseHues: readonly number[],
  boundary: number,
  column: number,
): ColorSample | undefined => {
  const topIndex = (boundary - 1) * GRID_COLUMNS + column;
  const bottomIndex = boundary * GRID_COLUMNS + column;
  const top = boundary > 0 ? cells[topIndex] : undefined;
  const bottom = boundary < GRID_ROWS ? cells[bottomIndex] : undefined;

  if (top && bottom) {
    return mixSamples(
      sampleCell(top, baseHues[topIndex] ?? 0),
      sampleCell(bottom, baseHues[bottomIndex] ?? 0),
    );
  }

  if (top) {
    return sampleCell(top, baseHues[topIndex] ?? 0);
  }

  if (bottom) {
    return sampleCell(bottom, baseHues[bottomIndex] ?? 0);
  }

  return undefined;
};

/**
 * Paints the seams between cells with the blend of the two cell body colours.
 * Vertical seams blend left/right neighbours, horizontal seams blend
 * top/bottom neighbours; the grid's outer boundary uses its single neighbour.
 */
const paintGutters = (
  context: CanvasRenderingContext2D,
  cells: readonly Cell[],
  baseHues: readonly number[],
) => {
  const cellWidth = STAGE_WIDTH / GRID_COLUMNS;
  const cellHeight = STAGE_HEIGHT / GRID_ROWS;

  for (let boundary = 0; boundary <= GRID_ROWS; boundary += 1) {
    for (let column = 0; column < GRID_COLUMNS; column += 1) {
      const sample = horizontalGutterSample(cells, baseHues, boundary, column);

      if (!sample) {
        continue;
      }

      context.fillStyle = sampleColor(sample);
      context.fillRect(
        column * cellWidth,
        boundary * cellHeight - SEAM / 2,
        cellWidth,
        SEAM,
      );
    }
  }

  // Drawn after the horizontal bands so crossings take the vertical colour.
  for (let boundary = 0; boundary <= GRID_COLUMNS; boundary += 1) {
    for (let row = 0; row < GRID_ROWS; row += 1) {
      const sample = verticalGutterSample(cells, baseHues, boundary, row);

      if (!sample) {
        continue;
      }

      context.fillStyle = sampleColor(sample);
      context.fillRect(
        boundary * cellWidth - SEAM / 2,
        row * cellHeight,
        SEAM,
        cellHeight,
      );
    }
  }
};

const paintCell = (
  context: CanvasRenderingContext2D,
  cell: Cell,
  lines: EdgeLines,
  elapsed: number,
) => {
  const { x, y, width, height, offsets } = cell;
  const baseHue = cellHue(cell, elapsed);
  const alongRow = (cell.column + 0.5) / GRID_COLUMNS;
  const alongColumn = (cell.row + 0.5) / GRID_ROWS;

  context.fillStyle = `hsla(${normaliseHue(baseHue)}, ${cell.saturation}%, ${cell.lightness}%, 1)`;
  context.fillRect(x, y, width, height);

  const edges: readonly [EdgeSide, EdgeLine, number, number][] = [
    ['top', lines.horizontal[cell.row] ?? FALLBACK_EDGE, alongRow, offsets[0]],
    [
      'right',
      lines.vertical[cell.column + 1] ?? FALLBACK_EDGE,
      alongColumn,
      offsets[1],
    ],
    [
      'bottom',
      lines.horizontal[cell.row + 1] ?? FALLBACK_EDGE,
      alongRow,
      offsets[2],
    ],
    [
      'left',
      lines.vertical[cell.column] ?? FALLBACK_EDGE,
      alongColumn,
      offsets[3],
    ],
  ];

  for (const [side, line, position, hueOffset] of edges) {
    paintCellEdge({
      context,
      cell,
      side,
      line,
      position,
      hueOffset,
      baseHue,
      elapsed,
    });
  }
};

const paintArrow = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: ArrowDirection,
) => {
  context.save();
  context.translate(x, y);
  context.rotate(EDGE_ARROW_ANGLES[direction]);
  context.beginPath();
  context.moveTo(EDGE_ARROW_LENGTH, 0);
  context.lineTo(-EDGE_ARROW_LENGTH * 0.6, -EDGE_ARROW_WIDTH);
  context.lineTo(-EDGE_ARROW_LENGTH * 0.6, EDGE_ARROW_WIDTH);
  context.closePath();
  context.fillStyle = 'rgba(255, 255, 255, 0.92)';
  context.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  context.lineWidth = 0.75;
  context.fill();
  context.stroke();
  context.restore();
};

/**
 * Debug overlay: one arrow per internal line, riding the highlight at the same
 * position and pace, and pointing where the highlight is heading.
 */
const paintDirectionArrows = (
  context: CanvasRenderingContext2D,
  lines: EdgeLines,
  elapsed: number,
) => {
  for (let boundary = 1; boundary < GRID_ROWS; boundary += 1) {
    const line = lines.horizontal[boundary] ?? FALLBACK_EDGE;
    const { centre } = edgeMotion(line, elapsed);
    const direction: ArrowDirection = isEdgeForward(line, elapsed)
      ? 'right'
      : 'left';
    const y = (boundary * STAGE_HEIGHT) / GRID_ROWS;

    paintArrow(context, STAGE_WIDTH * centre, y, direction);
  }

  for (let boundary = 1; boundary < GRID_COLUMNS; boundary += 1) {
    const line = lines.vertical[boundary] ?? FALLBACK_EDGE;
    const { centre } = edgeMotion(line, elapsed);
    const direction: ArrowDirection = isEdgeForward(line, elapsed)
      ? 'down'
      : 'up';
    const x = (boundary * STAGE_WIDTH) / GRID_COLUMNS;

    paintArrow(context, x, STAGE_HEIGHT * centre, direction);
  }
};

const paintFrame = (
  context: CanvasRenderingContext2D,
  scene: Scene,
  elapsed: number,
  showDebug: boolean,
) => {
  context.fillStyle = '#0b0f19';
  context.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

  const baseHues = scene.cells.map((cell) => cellHue(cell, elapsed));

  paintGutters(context, scene.cells, baseHues);

  for (const cell of scene.cells) {
    paintCell(context, cell, scene.lines, elapsed);
  }

  if (showDebug) {
    paintDirectionArrows(context, scene.lines, elapsed);
  }
};

/**
 * Dev-only 23×10 grid of mini hue swatches.
 *
 * Each cell copies the 45×85 demo: a solid colour with gradient overlays on all
 * four edges. Every cell has its own phase and speed, so the colours cycle
 * independently instead of hue-rotating as one image.
 *
 * Edges are shared grid lines rather than per-cell decorations: horizontal and
 * vertical lines are indexed across the whole grid and each line is randomly
 * assigned an animation direction. The line's fade pulses while a highlight
 * travels along it, backwards and forwards, and every cell on that line sees
 * the same motion.
 */
export function HueSwatchGridPoc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const [showDebug, setShowDebug] = useState(true);
  const showDebugRef = useRef(showDebug);

  useEffect(() => {
    showDebugRef.current = showDebug;
  }, [showDebug]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = STAGE_WIDTH * dpr;
    canvas.height = STAGE_HEIGHT * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scene = buildScene(createRandom(20261109));
    const startedAt = performance.now();
    let lastPaint = 0;
    let paintedFrames = 0;
    let fpsWindowStart = startedAt;
    let frame = 0;

    const draw = (now: number) => {
      if (now - lastPaint >= FRAME_INTERVAL_MS) {
        lastPaint = now;
        paintFrame(context, scene, now - startedAt, showDebugRef.current);
        paintedFrames += 1;

        const windowMs = now - fpsWindowStart;

        if (windowMs >= 1000) {
          if (fpsRef.current) {
            fpsRef.current.textContent = `${((paintedFrames * 1000) / windowMs).toFixed(1)} fps`;
          }

          paintedFrames = 0;
          fpsWindowStart = now;
        }
      }

      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <section
      className="w-full bg-[#0b0f19] py-8"
      data-testid="hue-swatch-grid-poc"
    >
      <div className="flex flex-col items-center gap-4 px-4">
        <div className="flex w-full items-center justify-center gap-3">
          <p className="text-xs font-semibold text-white/70">
            Hue swatch grid — {GRID_COLUMNS}×{GRID_ROWS}
          </p>
          <button
            type="button"
            onClick={() => setShowDebug((current) => !current)}
            aria-pressed={showDebug}
            className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80 transition-colors hover:bg-white/20"
          >
            {showDebug ? 'Hide debug' : 'Show debug'}
          </button>
        </div>
        <div className="relative aspect-[45/20] w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
          <canvas
            ref={canvasRef}
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            className="absolute inset-0 block h-full w-full"
          />
          <span
            ref={fpsRef}
            data-testid="hue-swatch-grid-fps"
            className={`pointer-events-none absolute left-2 top-2 z-10 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-white/80 ${showDebug ? '' : 'hidden'}`}
          >
            — fps
          </span>
        </div>
      </div>
    </section>
  );
}
