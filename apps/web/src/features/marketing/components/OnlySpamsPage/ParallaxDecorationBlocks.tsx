'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface DecorationBlockProps {
  top: string;
  left: string;
  size: number;
  emoji: string;
  speed: number;
  rotate?: number;
  opacity?: number;
}

function DecorationBlock({
  top,
  left,
  size,
  emoji,
  speed,
  rotate = 0,
  opacity = 0.2,
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
      className="flex items-center justify-center select-none"
      style={{
        position: 'absolute',
        top,
        left,
        fontSize: size,
        rotate,
        opacity,
        y,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {emoji}
    </motion.div>
  );
}

const BLOCKS: DecorationBlockProps[] = [
  {
    top: '5%',
    left: '8%',
    size: 60,
    emoji: '✉️',
    speed: -0.4,
    rotate: -15,
    opacity: 0.15,
  },
  {
    top: '15%',
    left: '82%',
    size: 80,
    emoji: '💰',
    speed: 0.3,
    rotate: 15,
    opacity: 0.12,
  },
  {
    top: '30%',
    left: '12%',
    size: 70,
    emoji: '👑',
    speed: -0.6,
    rotate: -10,
    opacity: 0.15,
  },
  {
    top: '45%',
    left: '88%',
    size: 90,
    emoji: '💎',
    speed: 0.5,
    rotate: 20,
    opacity: 0.1,
  },
  {
    top: '60%',
    left: '5%',
    size: 100,
    emoji: '🤑',
    speed: -0.3,
    rotate: -25,
    opacity: 0.08,
  },
  {
    top: '75%',
    left: '85%',
    size: 65,
    emoji: '📧',
    speed: 0.8,
    rotate: 10,
    opacity: 0.18,
  },
  {
    top: '85%',
    left: '15%',
    size: 110,
    emoji: '💸',
    speed: -0.5,
    rotate: -30,
    opacity: 0.07,
  },
  {
    top: '20%',
    left: '70%',
    size: 50,
    emoji: '📬',
    speed: 1.1,
    rotate: 5,
    opacity: 0.2,
  },
  {
    top: '50%',
    left: '10%',
    size: 40,
    emoji: '✨',
    speed: -1.2,
    rotate: 45,
    opacity: 0.25,
  },
  {
    top: '70%',
    left: '75%',
    size: 55,
    emoji: '💵',
    speed: 0.9,
    rotate: -15,
    opacity: 0.15,
  },
  {
    top: '35%',
    left: '75%',
    size: 65,
    emoji: '💦',
    speed: 0.7,
    rotate: -20,
    opacity: 0.12,
  },
  {
    top: '65%',
    left: '20%',
    size: 75,
    emoji: '🍆',
    speed: -0.8,
    rotate: 35,
    opacity: 0.1,
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
