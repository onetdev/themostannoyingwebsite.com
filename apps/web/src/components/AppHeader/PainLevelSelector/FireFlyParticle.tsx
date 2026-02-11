'use client';

import { motion } from 'framer-motion';

export const FIREFLY_PARTICLE_COLORS = [
  '#3b82f6',
  '#22c55e',
  '#eab308',
  '#f97316',
  '#ef4444',
];

export interface FireflyParticleProps {
  createdAt: number;
  x: number;
  size: number;
  duration: number;
  color: string;
}

export function FireflyParticle(particle: FireflyParticleProps) {
  return (
    <motion.div
      initial={{
        y: 0,
        left: `${particle.x}%`,
        opacity: 0,
        scale: 0,
        x: 0,
      }}
      animate={{
        y: -40,
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5],
        x: [0, 4, -4, 4, 0],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: particle.duration,
        ease: 'linear',
        x: {
          duration: particle.duration,
          ease: 'easeInOut',
        },
      }}
      className="absolute rounded-full"
      style={{
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
      }}
    />
  );
}
