'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createGradientCss,
  createGradientSteps,
  DEFAULT_GRADIENT_OPACITY,
} from '../GradientPoc/gradient-poc-colors';

const SEED_RANGE = 0xffffffff;
const SWATCH_WIDTH = 45;
const SWATCH_HEIGHT = 85;
const OVERLAY_STEPS = 16;
const HUE_DURATION_MS = 12_000;

const OVERLAY_MASK_STYLE = {
  maskMode: 'alpha' as const,
  maskRepeat: 'no-repeat' as const,
  maskSize: '100% 100%',
};

/**
 * Dev-only experiment: a 45×85 hue-cycling solid swatch with gradient
 * overlays on the bottom, left and right edges. The overlays sit on top of the
 * solid colour and fade inward, so the top edge stays pure.
 *
 * The overlays use only 16 palette steps because the swatch is small.
 */
export function HueEdgePoc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const swatchRef = useRef<HTMLDivElement>(null);
  const [seed, setSeed] = useState<number | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    setSeed(Math.floor(Math.random() * SEED_RANGE));
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SWATCH_WIDTH * dpr;
    canvas.height = SWATCH_HEIGHT * dpr;

    let frame = 0;
    const startedAt = performance.now();
    const swatch = swatchRef.current;

    const draw = (now: number) => {
      const hue = (((now - startedAt) / HUE_DURATION_MS) * 360) % 360;

      swatch?.style.setProperty('--edge-hue', `${hue}deg`);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = `hsl(${hue}, 85%, 55%)`;
      context.fillRect(0, 0, SWATCH_WIDTH, SWATCH_HEIGHT);
      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const colors = useMemo(
    () => (seed === null ? null : createGradientSteps(seed, OVERLAY_STEPS)),
    [seed],
  );

  const horizontalGradient = useMemo(
    () =>
      colors
        ? createGradientCss(colors, DEFAULT_GRADIENT_OPACITY, 'to right')
        : 'none',
    [colors],
  );

  const verticalGradient = useMemo(
    () =>
      colors
        ? createGradientCss(colors, DEFAULT_GRADIENT_OPACITY, 'to bottom')
        : 'none',
    [colors],
  );

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const bottomStyle = {
    backgroundImage: horizontalGradient,
    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
    filter: 'hue-rotate(var(--edge-hue, 0deg))',
    ...OVERLAY_MASK_STYLE,
  };

  const leftStyle = {
    backgroundImage: verticalGradient,
    maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
    filter: 'hue-rotate(var(--edge-hue, 0deg))',
    ...OVERLAY_MASK_STYLE,
  };

  const rightStyle = {
    backgroundImage: verticalGradient,
    maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
    filter: 'hue-rotate(var(--edge-hue, 0deg))',
    ...OVERLAY_MASK_STYLE,
  };

  return (
    <section className="w-full bg-[#0b0f19] py-8" data-testid="hue-edge-poc">
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs font-semibold text-white/70">
          Hue swatch + edge overlays — 45×85
        </p>
        <div
          ref={swatchRef}
          className="relative h-[85px] w-[45px] overflow-hidden ring-1 ring-white/10"
        >
          <canvas
            ref={canvasRef}
            width={SWATCH_WIDTH}
            height={SWATCH_HEIGHT}
            className="absolute inset-0 block h-full w-full"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
            style={bottomStyle}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[40%]"
            style={leftStyle}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[40%]"
            style={rightStyle}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
