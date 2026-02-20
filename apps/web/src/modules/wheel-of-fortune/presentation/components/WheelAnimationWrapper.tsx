import { Icon } from '@maw/ui-lib';
import { randomInt } from '@maw/utils/math';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

import DynamicWheelSvg, { Item } from './DynamicWheelSvg';
import { AnimatedWheelState } from '../../application/hooks/useWheelOfFortune';

type AnimatedWheelProps = {
  highlightIndex?: number;
  items: Item[];
  onAnimationComplete: () => void;
  revDuration?: number;
  revRange?: [number, number];
  state: AnimatedWheelState;
};

export function AnimatedWheel({
  highlightIndex,
  items,
  onAnimationComplete,
  revDuration = 4,
  revRange = [2, 6],
  state,
}: AnimatedWheelProps) {
  const [anim, setAnim] = useState({ rotation: 0, duration: 0 });
  const degPerItem = 360 / items.length;

  useEffect(() => {
    if (state !== 'spinning' || !highlightIndex) return;

    const dir = anim.rotation < 0 ? -1 : 1;
    const revs = randomInt(revRange[0], revRange[1]);
    const revDeg = 360 * revs * dir;
    const winDeg =
      (dir > 0 ? 270 : -90) - degPerItem / 2 - degPerItem * highlightIndex;

    setAnim({
      duration: revDuration,
      rotation: revDeg + winDeg,
    });

    const interval = setTimeout(() => {
      onAnimationComplete();
    }, revDuration * 1000);

    return () => clearInterval(interval);
  }, [highlightIndex, state]);

  const animStyles = useMemo(() => {
    if (!anim.duration || !anim.rotation) return undefined;
    return {
      transform: `rotate(${anim.rotation}deg)`,
      transition: `transform ${anim.duration}s cubic-bezier(0.33, 1, 0.68, 1)`,
    } satisfies CSSProperties;
  }, [anim]);

  return (
    <div className="relative m-auto max-h-[500px] max-w-[500px] p-8">
      <div
        className="text-primary data-[wiggle=true]:animate-wiggle-15deg absolute inset-x-0 top-3 z-10 flex justify-center text-xl drop-shadow-md md:top-2 md:-ml-4 md:text-3xl"
        data-wiggle={(state === 'spinning').toString()}>
        <Icon icon="mapMarker" />
      </div>
      <div className="bg-tertiary absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 text-2xl shadow-md md:rounded-full md:p-5" />
      <div
        className="border-primary rounded-full border shadow-md"
        style={{ lineHeight: 0 }}>
        <div className="select-none" style={animStyles}>
          <DynamicWheelSvg
            width={500}
            height={500}
            items={items}
            highlightIndex={state === 'completed' ? highlightIndex : undefined}
          />
        </div>
      </div>
    </div>
  );
}
