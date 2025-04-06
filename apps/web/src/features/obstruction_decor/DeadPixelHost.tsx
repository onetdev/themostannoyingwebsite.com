'use client';

import { FunctionComponent, useEffect, useState } from 'react';

import { Point2d, random } from '@/root/apps/web/src/lib/utils/math';

// TODO: Maybe we could do a horror version like this:
// https://www.tiktok.com/@jackandaxter/video/7421659495606144262
const DeadPixelHost: FunctionComponent = () => {
  const [points, setPosition] = useState<Point2d[]>();

  useEffect(() => {
    const newPoints = [];
    const pixels = random(1, 3, true);

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
        <div
          key={`${point.x}-${point.y}`}
          style={{ top: point.y, left: point.x }}
          className="fixed size-px select-none bg-black dark:bg-white"
        />
      ))}
    </>
  );
};

export default DeadPixelHost;
