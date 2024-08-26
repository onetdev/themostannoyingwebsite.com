import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useDragTracker from '@/hooks/useDragTracker';
import { distance, random } from '@/utils/math';
import Button from '@/components/atoms/Button';

import Wheel, { Item } from './Wheel';

type Props = {
  items: Item[];
  onSpinCompleted: (result: Item) => void;
  onStateChange: (state: AnimatedWheelState) => void;
  revDuration?: number;
  revRange?: [number, number];
};

export type AnimatedWheelState = 'ready' | 'spinning' | 'completed';
const AnimatedWheel: FunctionComponent<Props> = ({
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
    const revs = random(revRange[0], revRange[1]);
    const revDeg = 360 * revs * dir;
    const winIndex = random(0, items.length - 1);
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

    const dir = distance(
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

  return (
    <div className="relative max-h-[500px] max-w-[500px] p-8">
      <div
        className="absolute right-1/2 top-3 z-10 -mr-2 text-2xl text-secondary drop-shadow-md data-[wiggle=true]:animate-wiggle-15deg md:top-0 md:-ml-4 md:text-5xl"
        data-wiggle={(state === 'spinning').toString()}>
        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
      </div>
      <Button
        className="absolute left-1/2 top-1/2 z-10 h-1/6 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md border border-secondary shadow-md md:w-1/12 md:rounded-full"
        variant="tertiary"
        onClick={() => startSpin()}
        disabled={state !== 'ready'}>
        {state === 'ready' ? '🎲' : '🎉'}
      </Button>
      <div
        className="rounded-full border border-secondary shadow-md"
        style={{ lineHeight: 0 }}
        ref={rotatorRef}>
        <div
          className="select-none"
          style={{
            transform: `${anim.rotation}deg`,
            transition: `transform ${anim.duration}s cubic-bezier(0.33, 1, 0.68, 1)`,
          }}>
          <Wheel
            items={items}
            highlightIndex={state === 'completed' ? winIndex : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedWheel;
