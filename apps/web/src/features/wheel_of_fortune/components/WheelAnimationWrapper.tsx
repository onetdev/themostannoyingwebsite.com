import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import DynamicWheelSvg, { Item } from './DynamicWheelSvg';

import { Button, Icon } from '@maw/ui';
import useDragTracker from '@/lib/hooks/useDragTracker';
import { getPointDistance, random } from '@maw/utils/math';

type AnimatedWheelProps = {
  items: Item[];
  onSpinCompleted: (result: Item) => void;
  onStateChange: (state: AnimatedWheelState) => void;
  revDuration?: number;
  revRange?: [number, number];
};

export type AnimatedWheelState = 'ready' | 'spinning' | 'completed';
const AnimatedWheel: FunctionComponent<AnimatedWheelProps> = ({
  items,
  onSpinCompleted,
  onStateChange,
  revDuration = 4,
  revRange = [2, 6],
}) => {
  const [anim, setAnim] = useState({ rotation: 0, duration: 0 });
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [winIndex, setWinIndex] = useState<number | undefined>(undefined);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const dragMeta = useDragTracker(rotatorRef);
  const degPerItem = 360 / items.length;

  const startSpin = useCallback(() => {
    if (state != 'ready') return;

    const dir = anim.rotation < 0 ? -1 : 1;
    const revs = random(revRange[0], revRange[1], true);
    const revDeg = 360 * revs * dir;
    const winIndex = random(0, items.length - 1, true);
    const winDeg =
      (dir > 0 ? 270 : -90) - degPerItem / 2 - degPerItem * winIndex;

    setState('spinning');
    setWinIndex(winIndex);
    setAnim({
      duration: revDuration,
      rotation: revDeg + winDeg,
    });
  }, [anim.rotation, degPerItem, items.length, revDuration, revRange, state]);

  useEffect(() => {
    if (state !== 'spinning') return;
    const interval = setTimeout(() => {
      setState('completed');
      onSpinCompleted(items[winIndex!]);
    }, anim.duration * 1000);
    return () => clearInterval(interval);
  }, [anim.duration, items, onSpinCompleted, state, winIndex]);

  useEffect(() => {
    if (
      !dragMeta.isActive ||
      dragMeta.history.length < 1 ||
      state !== 'ready'
    ) {
      return;
    }

    if (dragMeta.velocity && dragMeta.velocity > 0.1) {
      startSpin();
      return;
    }

    const dir = getPointDistance(
      dragMeta.history[0],
      dragMeta.history[dragMeta.history.length - 1],
    );
    setAnim({
      duration: 0,
      rotation: anim.rotation + (dir.x + dir.y) * 0.1,
    });
  }, [anim.rotation, dragMeta, startSpin, state]);

  useEffect(() => {
    onStateChange(state);
  }, [state, onStateChange]);

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
        className="text-primary data-[wiggle=true]:animate-wiggle-15deg absolute inset-x-0 top-3 z-10 flex justify-center text-2xl drop-shadow-md md:top-0 md:-ml-4 md:text-5xl"
        data-wiggle={(state === 'spinning').toString()}>
        <Icon icon="mapMarker" size="5xl" />
      </div>
      <Button
        className="border-primary bg-primary absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border p-5 text-2xl shadow-md md:rounded-full"
        variant="tertiary"
        onClick={() => startSpin()}
        disabled={state !== 'ready'}>
        {state === 'ready' ? '🎲' : '🎉'}
      </Button>
      <div
        className="border-primary rounded-full border shadow-md"
        style={{ lineHeight: 0 }}
        ref={rotatorRef}>
        <div className="select-none" style={animStyles}>
          <DynamicWheelSvg
            width={500}
            height={500}
            items={items}
            highlightIndex={state === 'completed' ? winIndex : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedWheel;
