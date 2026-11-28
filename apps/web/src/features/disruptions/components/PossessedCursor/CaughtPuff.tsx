'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { NormalizedPoint } from '../../utils';

const PARTICLES = [
  { x: -28, y: -20 },
  { x: 26, y: -24 },
  { x: 34, y: 6 },
  { x: 18, y: 28 },
  { x: -20, y: 26 },
  { x: -36, y: 4 },
] as const;

export interface CaughtPuffProps {
  id: number;
  point: NormalizedPoint;
  onDone: (id: number) => void;
}

export function CaughtPuff({ id, point, onDone }: CaughtPuffProps) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current(id), 700);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div
      data-testid="possessed-cursor-puff"
      data-puff-id={id}
      aria-hidden
      style={{
        position: 'absolute',
        left: `${point.x * 100}%`,
        top: `${point.y * 100}%`,
        pointerEvents: 'none',
      }}
    >
      <motion.span
        className="absolute block size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/25 blur-[2px]"
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />
      <motion.span
        className="absolute block size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40"
        initial={{ scale: 0.4, opacity: 0.8 }}
        animate={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {PARTICLES.map((particle) => (
        <motion.span
          key={`${particle.x}-${particle.y}`}
          className="absolute block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/70"
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: 0.2,
            opacity: 0,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
