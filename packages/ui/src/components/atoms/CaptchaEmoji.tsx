'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { Point2d, random } from '@maw/utils/math';

export type CaptchaEmojiProps = {
  className?: string;
  count?: number;
  height?: number;
  itemRenderSize?: number;
  pool?: string[];
  width?: number;
};

type RandomItem = {
  content: string;
  coords: Point2d;
};

export const CaptchaEmoji: FunctionComponent<CaptchaEmojiProps> = ({
  className,
  count = 100,
  height = 100,
  itemRenderSize = 50,
  pool = defaultEmojiPool,
  width = 300,
}) => {
  const $canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<RandomItem[]>([]);

  useEffect(() => {
    const items: RandomItem[] = [];
    for (let i = 0; i < count; i++) {
      const x = random(0, 1);
      const y = random(0, 1);
      const content = pool[Math.floor(Math.random() * pool.length)];
      items.push({ content, coords: { x, y } });
    }

    setItems(items);
  }, [count, pool]);

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
  }, [pool, itemRenderSize, items]);

  return (
    <canvas
      className={className}
      ref={$canvasRef}
      width={width}
      height={height}
    />
  );
};

const defaultEmojiPool = [
  '✨',
  '🌈',
  '🍆',
  '🍑',
  '🍕',
  '🎀',
  '🎁',
  '🎈',
  '🎉',
  '🎊',
  '🐶',
  '💀',
  '💕',
  '💪',
  '💫',
  '📸',
  '🔥',
  '🤔',
  '🤣',
  '🤩',
  '🤯',
  '🥰',
  '🥳',
  '🥺',
  '🧠',
  '🫶',
  '😂',
  '😍',
  '😎',
  '😭',
  '🙌',
  '🙏',
];
