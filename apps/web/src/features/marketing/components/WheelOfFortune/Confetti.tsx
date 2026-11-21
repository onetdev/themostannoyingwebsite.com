'use client';

import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

type ConfettiOptions = NonNullable<Parameters<typeof confetti>[0]>;

const EXPLOSION_OPTIONS: ConfettiOptions = {
  origin: { x: 0.5, y: 0.5 },
  particleCount: 100,
  spread: 360,
};

// Keeps the top-to-bottom rain the previous `react-confetti` implementation
// provided: batches of pieces entering above the top edge and falling down
// for as long as the celebration is mounted.
const RAIN_INTERVAL_MS = 120;
const RAIN_PARTICLES_PER_BATCH = 6;
const RAIN_TICKS = 400;
const RAIN_START_OFFSET_Y = -0.1;

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const fire = confetti.create(canvas, { resize: true, useWorker: true });

    fire(EXPLOSION_OPTIONS);

    const rainTimer = window.setInterval(() => {
      fire({
        angle: 270,
        spread: 120,
        startVelocity: 12,
        gravity: 1,
        drift: Math.random() * 2 - 1,
        ticks: RAIN_TICKS,
        particleCount: RAIN_PARTICLES_PER_BATCH,
        origin: { x: Math.random(), y: RAIN_START_OFFSET_Y },
      });
    }, RAIN_INTERVAL_MS);

    return () => {
      window.clearInterval(rainTimer);
      fire.reset();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 size-full"
    />
  );
}
