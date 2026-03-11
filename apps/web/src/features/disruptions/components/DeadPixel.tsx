'use client';

import { clsx } from '@maw/ui-lib/utils';
import type { Point2d } from '@maw/utils/math';
import { randomInt, randomNumber } from '@maw/utils/random';
import { useCallback, useEffect, useState } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { emit } from '@/core/events/event-bus';

interface DeadPixelPoint extends Point2d {
  isRainbow: boolean;
}

// TODO: Maybe we could do a horror version like this:
// https://www.tiktok.com/@jackandaxter/video/7421659495606144262
export function DeadPixel() {
  const [points, setPoints] = useState<DeadPixelPoint[]>();
  const { rainbowChance } = useAppConfigContext().disruptions.deadPixel;

  const seed = useCallback(() => {
    const newPoints = [];
    const pixels = randomInt(1, 3);

    for (let i = 0; i < pixels; i++) {
      const isRainbow = Math.random() < rainbowChance;

      newPoints.push({
        x: randomNumber(0, window.innerWidth),
        y: randomNumber(0, window.innerHeight),
        isRainbow,
      });
    }
    setPoints(newPoints);
  }, [rainbowChance]);

  useEffect(() => seed(), [seed]);

  const onClick = (isRainbow: boolean) => {
    emit('dead-pixel:clicked', { isRainbow });
    seed();
  };

  return (
    <>
      {points?.map((point) => (
        <button
          type="button"
          aria-hidden
          data-testid="dead-pixel"
          key={`${point.x}-${point.y}`}
          onClick={() => onClick(point.isRainbow)}
          style={{
            top: point.y,
            left: point.x,
            backgroundColor: point.isRainbow ? 'red' : undefined,
          }}
          className={clsx(
            'fixed z-9999 h-[2px] w-px select-none',
            point.isRainbow
              ? 'animate-hue-full-rotate'
              : 'bg-black dark:bg-white',
          )}
        />
      ))}
    </>
  );
}
