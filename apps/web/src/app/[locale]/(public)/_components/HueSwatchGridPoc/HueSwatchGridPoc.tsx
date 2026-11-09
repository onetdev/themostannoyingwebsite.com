'use client';

import { useEffect, useRef } from 'react';

const STAGE_WIDTH = 900;
const STAGE_HEIGHT = 200;
const GRID_COLUMNS = 45;
const GRID_ROWS = 10;
const HUE_DURATION_MS = 12_000;
const FRAME_INTERVAL_MS = 1000 / 20;
const OVERLAY_REACH = 0.4;
const SEAM = 1;

type Hsl = readonly [number, number, number];

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

interface Cell {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly anchorHue: number;
  readonly saturation: number;
  readonly lightness: number;
  readonly phase: number;
  readonly speed: number;
  readonly offsets: readonly [number, number, number];
}

const buildCells = (random: () => number): Cell[] => {
  const cellWidth = STAGE_WIDTH / GRID_COLUMNS;
  const cellHeight = STAGE_HEIGHT / GRID_ROWS;
  const cells: Cell[] = [];

  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let column = 0; column < GRID_COLUMNS; column += 1) {
      const palette =
        PALETTE[Math.floor(random() * PALETTE.length)] ?? PALETTE[0];

      cells.push({
        x: column * cellWidth + SEAM / 2,
        y: row * cellHeight + SEAM / 2,
        width: cellWidth - SEAM,
        height: cellHeight - SEAM,
        anchorHue: palette[0],
        saturation: palette[1],
        lightness: palette[2],
        phase: random() * 360,
        speed: 0.6 + random() * 0.8,
        offsets: [40 + random() * 20, 120 + random() * 30, 230 + random() * 30],
      });
    }
  }

  return cells;
};

const normaliseHue = (hue: number) => ((hue % 360) + 360) % 360;

const paintCell = (
  context: CanvasRenderingContext2D,
  cell: Cell,
  baseHue: number,
) => {
  const { x, y, width, height, saturation, lightness, offsets } = cell;
  const color = (hue: number, alpha: number) =>
    `hsla(${normaliseHue(hue)}, ${saturation}%, ${lightness}%, ${alpha})`;
  const reachX = width * OVERLAY_REACH;
  const reachY = height * OVERLAY_REACH;

  context.fillStyle = color(baseHue, 1);
  context.fillRect(x, y, width, height);

  const bottomGradient = context.createLinearGradient(
    x,
    y + height - reachY,
    x,
    y + height,
  );

  bottomGradient.addColorStop(0, color(baseHue + offsets[0], 0));
  bottomGradient.addColorStop(1, color(baseHue + offsets[0], 0.8));
  context.fillStyle = bottomGradient;
  context.fillRect(x, y + height - reachY, width, reachY);

  const leftGradient = context.createLinearGradient(x, y, x + reachX, y);

  leftGradient.addColorStop(0, color(baseHue + offsets[1], 0.8));
  leftGradient.addColorStop(1, color(baseHue + offsets[1], 0));
  context.fillStyle = leftGradient;
  context.fillRect(x, y, reachX, height);

  const rightGradient = context.createLinearGradient(
    x + width - reachX,
    y,
    x + width,
    y,
  );

  rightGradient.addColorStop(0, color(baseHue + offsets[2], 0));
  rightGradient.addColorStop(1, color(baseHue + offsets[2], 0.8));
  context.fillStyle = rightGradient;
  context.fillRect(x + width - reachX, y, reachX, height);
};

const paintFrame = (
  context: CanvasRenderingContext2D,
  cells: readonly Cell[],
  elapsed: number,
) => {
  context.fillStyle = '#0b0f19';
  context.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

  for (const cell of cells) {
    const baseHue =
      cell.anchorHue +
      (elapsed / HUE_DURATION_MS) * 360 * cell.speed +
      cell.phase;

    paintCell(context, cell, baseHue);
  }
};

/**
 * Dev-only 45×10 grid of mini hue swatches.
 *
 * Each cell copies the 45×85 demo: a solid colour with gradient overlays on
 * the bottom, left and right edges. Every cell has its own phase and speed, so
 * the colours cycle independently instead of hue-rotating as one image.
 */
export function HueSwatchGridPoc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const cells = buildCells(createRandom(20261109));
    const startedAt = performance.now();
    let lastPaint = 0;
    let frame = 0;

    const draw = (now: number) => {
      if (now - lastPaint >= FRAME_INTERVAL_MS) {
        lastPaint = now;
        paintFrame(context, cells, now - startedAt);
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
        <p className="text-xs font-semibold text-white/70">
          Hue swatch grid — 45×10
        </p>
        <div className="relative aspect-[45/10] w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
          <canvas
            ref={canvasRef}
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            className="absolute inset-0 block h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
