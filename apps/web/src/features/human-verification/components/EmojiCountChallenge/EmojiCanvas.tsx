'use client';

import { useEffect, useRef } from 'react';
import type { EmojiCountChallengeEntryMeta } from '../../types';

export interface EmojiCanvasProps {
  className?: string;
  height?: number;
  itemRenderSize?: number;
  items: EmojiCountChallengeEntryMeta[];
  width?: number;
}

export function EmojiCanvas({
  className,
  height = 100,
  itemRenderSize = 50,
  items,
  width = 250,
}: EmojiCanvasProps) {
  const $canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = $canvasRef.current?.getContext('2d');
    if (!$canvasRef.current || !ctx || !items) {
      return;
    }

    const width = $canvasRef.current.clientWidth;
    const height = $canvasRef.current.clientHeight;
    const offsetCorrection = itemRenderSize / 2;

    items.forEach(({ coords, content }) => {
      const x = coords.x * width;
      const y = coords.y * height + offsetCorrection;
      ctx.font = `${itemRenderSize}px Arial`;
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(content, x, y);
    });
  }, [itemRenderSize, items]);

  return (
    <canvas
      className={className}
      ref={$canvasRef}
      width={width}
      height={height}
    />
  );
}
