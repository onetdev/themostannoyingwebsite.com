'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface DecorationBlockProps {
  top: string;
  left: string;
  size: number;
  color: string;
  speed: number;
  rotate?: number;
  borderRadius?: string;
  opacity?: number;
}

function DecorationBlock({
  top,
  left,
  size,
  color,
  speed,
  rotate = 0,
  borderRadius = '0px',
  opacity = 0.1,
}: DecorationBlockProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        backgroundColor: color,
        rotate,
        borderRadius,
        opacity,
        y,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

const BLOCKS: DecorationBlockProps[] = [
  {
    top: '10%',
    left: '5%',
    size: 80,
    color: 'var(--primary)',
    speed: -0.5,
    rotate: 45,
    opacity: 0.15,
  },
  {
    top: '25%',
    left: '85%',
    size: 120,
    color: 'var(--secondary)',
    speed: 0.3,
    rotate: -15,
    borderRadius: '20px',
    opacity: 0.1,
  },
  {
    top: '40%',
    left: '15%',
    size: 60,
    color: 'var(--tertiary)',
    speed: -0.8,
    borderRadius: '50%',
    opacity: 0.12,
  },
  {
    top: '60%',
    left: '80%',
    size: 100,
    color: 'var(--primary)',
    speed: 0.6,
    rotate: 30,
    opacity: 0.08,
  },
  {
    top: '80%',
    left: '10%',
    size: 150,
    color: 'var(--secondary)',
    speed: -0.4,
    rotate: -45,
    borderRadius: '40px',
    opacity: 0.05,
  },
  {
    top: '15%',
    left: '70%',
    size: 40,
    color: 'var(--tertiary)',
    speed: 1.2,
    borderRadius: '10px',
    opacity: 0.2,
  },
  {
    top: '75%',
    left: '45%',
    size: 30,
    color: 'var(--primary)',
    speed: -1.5,
    borderRadius: '50%',
    opacity: 0.15,
  },
  {
    top: '55%',
    left: '5%',
    size: 90,
    color: 'var(--secondary)',
    speed: 0.9,
    rotate: 60,
    opacity: 0.07,
  },
];

export function ParallaxDecorationBlocks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {BLOCKS.map((block, index) => (
        <DecorationBlock key={index} {...block} />
      ))}
    </div>
  );
}
