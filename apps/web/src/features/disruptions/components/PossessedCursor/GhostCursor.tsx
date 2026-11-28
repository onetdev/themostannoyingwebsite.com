'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { CursorPreset } from '../../schemas';
import type { NormalizedPoint } from '../../utils';

export interface GhostCursorProps {
  id: number;
  preset: CursorPreset;
  points: NormalizedPoint[];
  lifetimeSeconds: number;
  onExpire: (id: number) => void;
}

const toPercent = (value: number): string => `${value * 100}%`;

export function GhostCursor({
  id,
  preset,
  points,
  lifetimeSeconds,
  onExpire,
}: GhostCursorProps) {
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    const timer = setTimeout(
      () => onExpireRef.current(id),
      lifetimeSeconds * 1000,
    );
    return () => clearTimeout(timer);
  }, [id, lifetimeSeconds]);

  const firstPoint = points[0] ?? { x: 0.5, y: 0.5 };
  const duration = Math.max(6, lifetimeSeconds * 0.8);
  const times = points.map((_, index) =>
    points.length === 1 ? 0 : index / (points.length - 1),
  );
  const positionTransition = {
    duration,
    times,
    ease: 'linear' as const,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: 'mirror' as const,
  };

  return (
    // biome-ignore lint/performance/noImgElement: tiny fixed-size SVG cursor that must render at its natural size
    <motion.img
      src={preset.src}
      alt=""
      aria-hidden
      draggable={false}
      data-track-ignore
      data-testid="possessed-ghost-cursor"
      data-ghost-id={id}
      data-cursor-id={preset.id}
      initial={{
        left: toPercent(firstPoint.x),
        top: toPercent(firstPoint.y),
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        left: points.map((point) => toPercent(point.x)),
        top: points.map((point) => toPercent(point.y)),
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        left: positionTransition,
        top: positionTransition,
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      style={{
        position: 'absolute',
        width: 32,
        height: 32,
        marginLeft: -preset.hotspot.x,
        marginTop: -preset.hotspot.y,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}
