'use client';

import { ReactNode, useState } from 'react';
import MarqueePlugin from 'react-fast-marquee';

type SpeedMinMax = {
  base: number;
  hover: number;
};

export type MarqueeTextProps<T> = {
  className?: string;
  ItemComponent: (item: T, index?: number) => ReactNode;
  items: T[];
  speed?: SpeedMinMax | number;
};

export const MarqueeText = <T,>({
  className,
  items,
  speed = { base: 100, hover: 2000 },
  ItemComponent,
}: MarqueeTextProps<T>) => {
  const normalizedSpeed =
    typeof speed === 'number' ? { base: speed, hover: speed } : speed;

  const [internalSpeed, setSpeed] = useState(normalizedSpeed.base);
  const onEnter = () => setSpeed(normalizedSpeed.hover);
  const onLeave = () => setSpeed(normalizedSpeed.base);

  return (
    <div
      className={`${className} z-10 overflow-hidden`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}>
      <MarqueePlugin gradient={false} speed={internalSpeed}>
        {items.map((item, index) => ItemComponent(item, index))}
      </MarqueePlugin>
    </div>
  );
};
