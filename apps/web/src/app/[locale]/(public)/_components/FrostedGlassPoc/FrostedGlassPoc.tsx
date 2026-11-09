'use client';

import { useEffect, useRef, useState } from 'react';

const STAGE_WIDTH = 900;
const STAGE_HEIGHT = 400;
const GRID_COLUMNS = 45;
const GRID_ROWS = 20;
const HUE_DURATION_MS = 12_000;
const DEFAULT_BLUR = 5;

const GLASS_NOISE =
  'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.5%27/%3E%3C/svg%3E")';

const GRID_LINES = `repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px calc(100% / ${GRID_COLUMNS})), repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px calc(100% / ${GRID_ROWS}))`;

const CAUSTIC_DOTS =
  'radial-gradient(circle at 1px 1px, rgba(255,250,235,0.8) 0 1px, rgba(255,250,235,0.2) 2.2px, transparent 5px)';

/** Warm-dominant palette borrowed from the reference wall. */
const CELL_PALETTE = [
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
] as const;

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

const paintCells = (
  context: CanvasRenderingContext2D,
  random: () => number,
  cellWidth: number,
  cellHeight: number,
) => {
  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let column = 0; column < GRID_COLUMNS; column += 1) {
      const x = column * cellWidth;
      const y = row * cellHeight;
      const from =
        CELL_PALETTE[Math.floor(random() * CELL_PALETTE.length)] ??
        CELL_PALETTE[0];
      const to =
        CELL_PALETTE[Math.floor(random() * CELL_PALETTE.length)] ??
        CELL_PALETTE[0];
      const angle = random() * Math.PI * 2;
      const dx = Math.cos(angle) * cellWidth * 0.7;
      const dy = Math.sin(angle) * cellHeight * 0.7;
      const gradient = context.createLinearGradient(
        x - dx,
        y - dy,
        x + cellWidth + dx,
        y + cellHeight + dy,
      );

      gradient.addColorStop(0, `hsl(${from[0]}, ${from[1]}%, ${from[2]}%)`);
      gradient.addColorStop(1, `hsl(${to[0]}, ${to[1]}%, ${to[2]}%)`);
      context.fillStyle = gradient;
      context.fillRect(x, y, cellWidth, cellHeight);

      const highlightX = x + (0.25 + random() * 0.5) * cellWidth;
      const highlightY = y + (0.25 + random() * 0.5) * cellHeight;
      const highlight = context.createRadialGradient(
        highlightX,
        highlightY,
        0,
        highlightX,
        highlightY,
        cellWidth * 0.6,
      );

      highlight.addColorStop(0, 'hsla(38, 85%, 93%, 0.28)');
      highlight.addColorStop(1, 'hsla(38, 85%, 93%, 0)');
      context.fillStyle = highlight;
      context.fillRect(x, y, cellWidth, cellHeight);
    }
  }
};

const paintCausticGlows = (
  context: CanvasRenderingContext2D,
  cellWidth: number,
  cellHeight: number,
) => {
  context.globalCompositeOperation = 'lighter';
  const glowRadius = Math.max(cellWidth, cellHeight) * 0.6;

  for (let row = 0; row <= GRID_ROWS; row += 1) {
    for (let column = 0; column <= GRID_COLUMNS; column += 1) {
      const x = column * cellWidth;
      const y = row * cellHeight;
      const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius);

      glow.addColorStop(0, 'rgba(255, 247, 232, 0.22)');
      glow.addColorStop(0.35, 'rgba(255, 240, 215, 0.08)');
      glow.addColorStop(1, 'rgba(255, 240, 215, 0)');
      context.fillStyle = glow;
      context.fillRect(
        x - glowRadius,
        y - glowRadius,
        glowRadius * 2,
        glowRadius * 2,
      );
    }
  }

  context.globalCompositeOperation = 'source-over';
};

const paintCellField = (context: CanvasRenderingContext2D) => {
  context.fillStyle = '#0b0f19';
  context.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

  const random = createRandom(20261109);
  const cellWidth = STAGE_WIDTH / GRID_COLUMNS;
  const cellHeight = STAGE_HEIGHT / GRID_ROWS;

  paintCells(context, random, cellWidth, cellHeight);
  paintCausticGlows(context, cellWidth, cellHeight);
};

/**
 * Dev-only frosted glass example.
 *
 * The 900×400 backdrop is painted once as a 45×20 grid of coloured cells with
 * soft highlights. A frosted layer blurs the cells into each other, and the
 * crisp mullion grid plus caustic dots sit on top. A slow hue-rotate keeps the
 * whole wall moving.
 */
export function FrostedGlassPoc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [blur, setBlur] = useState(DEFAULT_BLUR);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const stage = stageRef.current;

    if (!canvas || !context) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = STAGE_WIDTH * dpr;
    canvas.height = STAGE_HEIGHT * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintCellField(context);

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const hue =
        Math.sin(((now - startedAt) / HUE_DURATION_MS) * Math.PI * 2) * 15;

      stage?.style.setProperty('--grid-hue', `${hue}deg`);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const glassStyle = {
    backdropFilter: `blur(${blur}px) saturate(1.35)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(1.35)`,
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    boxShadow:
      'inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
  };

  return (
    <section
      className="w-full bg-[#0b0f19] py-8"
      data-testid="frosted-glass-poc"
    >
      <div className="flex flex-col items-center gap-4 px-4">
        <p className="text-xs font-semibold text-white/70">
          Frosted glass grid — 45×20 caustics
        </p>
        <div
          ref={stageRef}
          className="relative aspect-[45/20] w-full max-w-[900px] overflow-hidden rounded-2xl ring-1 ring-white/10"
        >
          <canvas
            ref={canvasRef}
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            className="absolute inset-0 block h-full w-full"
            style={{ filter: 'hue-rotate(var(--grid-hue, 0deg))' }}
          />
          <div
            className="absolute inset-0"
            style={glassStyle}
            data-testid="frosted-glass-panel"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: GLASS_NOISE }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.28]"
              style={{ backgroundImage: GRID_LINES }}
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{
                backgroundImage: CAUSTIC_DOTS,
                backgroundSize: `calc(100% / ${GRID_COLUMNS}) calc(100% / ${GRID_ROWS})`,
                backgroundRepeat: 'repeat',
              }}
            />
          </div>
        </div>
        <label className="flex items-center gap-3 text-xs text-white/70">
          <span className="font-medium text-white">Blur</span>
          <input
            type="range"
            min={0}
            max={24}
            step={1}
            value={blur}
            onChange={(event) => setBlur(Number(event.target.value))}
            className="w-40 accent-white"
            aria-label="Glass blur"
          />
          <span className="w-10 tabular-nums text-white">{blur}px</span>
        </label>
      </div>
    </section>
  );
}
