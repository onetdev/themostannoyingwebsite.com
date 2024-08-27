import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, PropsWithoutRef, useState } from 'react';
import Confetti from 'react-confetti';

import { getWeightedRandom } from '@/utils/math';

import AnimatedWheel, { AnimatedWheelState } from './AnimatedWheel';
import { Item } from './Wheel';

const prizeWithWeight = [
  { value: 'Free lifetime beer*', prob: 10 },
  { value: 'World peace*', prob: 1 },
  { value: 'Absolutelly nothing', prob: 100 },
  { value: 'Complimentary otter*', prob: 2 },
  { value: 'Fake 70% discount', prob: 50 },
];

const getItems = (hueStart: number, hueEnd: number, numItems: number) => {
  const items: Item[] = [];
  const range = [hueStart, hueEnd].sort();
  const step = (range[1] - range[0]) / numItems;
  for (let i = 0; i < numItems; i++) {
    items.push({
      color: `hsl(${range[0] + i * step}, 100%, 50%)`,
      text: getWeightedRandom(prizeWithWeight)!,
    });
  }

  return items;
};

type Props = PropsWithoutRef<JSX.IntrinsicElements['div']> & {
  onClose?: () => void;
};

const ModalContent: FunctionComponent<Props> = ({
  className,
  onClose,
  ...rest
}) => {
  const hueStart = 300; // random(0,360);
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [prize, setPrize] = useState<Item | undefined>();
  const [items] = useState(getItems(hueStart, hueStart + 120, 10));

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-lg bg-surface ${className}`}
      {...rest}>
      <div className="grow">
        <button
          aria-label="Close"
          className="absolute right-0 top-0 z-10 cursor-pointer p-3"
          onClick={() => onClose?.()}>
          <FontAwesomeIcon icon={['fas', 'times']} />
        </button>
        {state === 'completed' && (
          <Confetti
            className="absolute size-full"
            numberOfPieces={100}
            width={600}
            height={600}
          />
        )}

        <AnimatedWheel
          items={items}
          onStateChange={(newState) => setState(newState)}
          onSpinCompleted={(newPrize) => setPrize(newPrize)}
        />
      </div>
      <span className="w-full bg-secondary p-5 text-center text-xl font-bold text-on-secondary">
        {state !== 'completed' && `Let's spin the wheel!!`}
        {state === 'completed' && prize && `You won! ${prize.text}`}
      </span>
    </div>
  );
};

export default ModalContent;
