'use client';

import { type Point2d, random, randomInt } from '@maw/utils/math';
import { useEffect, useState } from 'react';
import { emit } from '@/core/events/event-bus';

// TODO: Maybe we could do a horror version like this:
// https://www.tiktok.com/@jackandaxter/video/7421659495606144262
export function DeadPixel() {
  const [points, setPosition] = useState<Point2d[]>();

  useEffect(() => {
    const newPoints = [];
    const pixels = randomInt(1, 3);

    for (let i = 0; i < pixels; i++) {
      newPoints.push({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
      });
    }
    setPosition(newPoints);
  }, []);

  return (
    <>
      {points?.map((point) => (
        <button
          type="button"
          aria-hidden
          data-testid="dead-pixel"
          key={`${point.x}-${point.y}`}
          onClick={() => emit('dead-pixel:clicked')}
          style={{ top: point.y, left: point.x }}
          className="fixed z-9999 size-px bg-black select-none dark:bg-white"
        />
      ))}
    </>
  );
}
