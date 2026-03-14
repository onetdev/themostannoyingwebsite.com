'use client';

import { type HTMLMotionProps, motion } from 'framer-motion';
import type React from 'react';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  y?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  y = 0,
  duration = 0.5,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y }}
      transition={{ duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
