import { Icon } from '@maw/ui-lib';
import { randomInt } from '@maw/utils/math';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { DynamicWheelSvg, Item } from './DynamicWheelSvg';
import { AnimatedWheelState } from '../../hooks';

type WheelAnimationWrapperProps = {
  highlightIndex?: number;
  items: Item[];
  onAnimationComplete: () => void;
  revDuration?: number;
  revRange?: [number, number];
  state: AnimatedWheelState;
};

export function WheelAnimationWrapper({
  highlightIndex,
  items,
  onAnimationComplete,
  revDuration = 4,
  revRange = [2, 6],
  state,
}: WheelAnimationWrapperProps) {
  const [rotation, setRotation] = useState(0);
  const degPerItem = 360 / items.length;

  useEffect(() => {
    if (state !== 'spinning' || highlightIndex === undefined) return;

    const revs = randomInt(revRange[0], revRange[1]);
    const winDeg = 270 - degPerItem / 2 - degPerItem * highlightIndex;

    // Use current rotation as a base to always spin forward
    setRotation((prev) => {
      const currentFullRevs = Math.floor(prev / 360);
      return (currentFullRevs + revs + 1) * 360 + winDeg;
    });
  }, [highlightIndex, state, degPerItem, revRange[0], revRange[1]]);

  return (
    <div className="relative m-auto max-h-[500px] max-w-[500px] p-8">
      {/* Indicator */}
      <div
        className="text-primary data-[wiggle=true]:animate-wiggle-15deg absolute inset-x-0 top-3 z-10 flex justify-center text-xl drop-shadow-md md:top-2 md:-ml-4 md:text-3xl"
        data-wiggle={(state === 'spinning').toString()}
      >
        <Icon icon="mapMarker" />
      </div>

      {/* Center Cap */}
      <div className="bg-tertiary absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 text-2xl shadow-md md:p-5" />

      {/* Wheel Body */}
      <div
        className="border-primary overflow-hidden rounded-full border shadow-md"
        style={{ lineHeight: 0 }}
      >
        <motion.div
          className="select-none"
          animate={{ rotate: rotation }}
          transition={
            state === 'spinning'
              ? { duration: revDuration, ease: [0.33, 1, 0.68, 1] }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (state === 'spinning') onAnimationComplete();
          }}
        >
          <DynamicWheelSvg
            width={500}
            height={500}
            items={items}
            highlightIndex={state === 'completed' ? highlightIndex : undefined}
          />
        </motion.div>
      </div>
    </div>
  );
}
