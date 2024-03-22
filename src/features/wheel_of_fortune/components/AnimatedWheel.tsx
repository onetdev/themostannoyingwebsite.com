import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { styled, css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useDragTracker from '@/hooks/useDragTracker';
import { distance, random } from '@/utils/math';
import { cssRule, cssVars } from '@/styles/theme';
import Button from '@/components/atoms/Button';

import Wheel, { Item } from './Wheel';

type Props = {
  items: Item[];
  onSpinCompleted: (result: Item) => void;
  onStateChange: (state: AnimatedWheelState) => void;
  flashing?: boolean;
  revDuration?: number;
  revRange?: [number, number];
};

const SliceFlashing = keyframes`
  0% { filter: invert(0); }
  50% { filter: invert(0.5); }
  100% { filter: invert(0); }
`;
// TODO: this animation should be getting slower as the wheel itself spins
// slower and slower, it looks silly now, but at least it moves.
const PointerWiggle = keyframes`
  0% { transform: rotate(0deg); }
  30% { transform: rotate(-15deg); }
  40% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;
const Wrap = styled.div`
  position: relative;
  max-width: 500px;
  max-height: 500px;
  padding: 2rem;
`;
const PointerWrap = styled.div<{ $wiggle: boolean }>`
  position: absolute;
  top: 0;
  right: calc(50% - 15px);
  color: ${cssVars.color.secondary};
  font-size: 50px;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.4));
  z-index: 1;
  ${cssRule.mdDown} {
    font-size: 30px;
    top: 13px;
    right: calc(50% - 9px);
  }
  ${({ $wiggle: wiggle }) =>
    wiggle &&
    css`
      animation: ${PointerWiggle} 0.2s linear infinite;
    `}
`;
const CtaButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10%;
  height: 10%;
  z-index: 1;
  transform: translate(-50%, -50%);
  border: 1px solid ${cssVars.color.secondary};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  ${cssRule.mdDown} {
    width: 30%;
    border-radius: 5px;
  }
`;
const WheelAnimationWrap = styled.div`
  border: 1px solid ${cssVars.color.secondary};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
  line-height: 0%;
  border-radius: 50%;
`;
const WheelAnimation = styled.div<{
  $duration: number;
  $rotation: number;
  $allowFlashing: boolean;
}>`
  transform: rotate(${(props) => `${props.$rotation}deg`});
  transition: transform ${(props) => `${props.$duration}s`}
    cubic-bezier(0.33, 1, 0.68, 1);
  user-select: none;
  .slice-winner {
    animation: ${SliceFlashing} 500ms infinite;
    ${(props) =>
      !props.$allowFlashing &&
      css`
        animation: none;
      `}
  }
`;

export type AnimatedWheelState = 'ready' | 'spinning' | 'completed';
const AnimatedWheel: FunctionComponent<Props> = ({
  items,
  onSpinCompleted,
  onStateChange,
  flashing = false,
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
    <Wrap>
      <PointerWrap $wiggle={state === 'spinning'}>
        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
      </PointerWrap>
      <CtaButton
        variant="tertiary"
        onClick={() => startSpin()}
        disabled={state !== 'ready'}>
        {state === 'ready' ? '🎲' : '🎉'}
      </CtaButton>
      <WheelAnimationWrap ref={rotatorRef}>
        <WheelAnimation
          $duration={anim.duration}
          $rotation={anim.rotation}
          $allowFlashing={flashing}>
          <Wheel
            items={items}
            highlightIndex={state === 'completed' ? winIndex : undefined}
          />
        </WheelAnimation>
      </WheelAnimationWrap>
    </Wrap>
  );
};

export default AnimatedWheel;
