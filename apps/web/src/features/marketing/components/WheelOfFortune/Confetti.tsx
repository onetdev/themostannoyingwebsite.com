'use client';

import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const fire = confetti.create(canvas, { resize: true, useWorker: true });

    fire({ origin: { x: 0.5, y: 0.5 }, particleCount: 100, spread: 360 });

    return () => {
      fire.reset();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute z-0 size-full" />;
}
