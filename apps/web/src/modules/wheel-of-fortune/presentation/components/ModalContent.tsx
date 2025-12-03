import { Icon } from '@maw/ui-lib';
import { getWeightedRandom, WeightedRandomPoolItem } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import Confetti from 'react-confetti';

import { Item } from './DynamicWheelSvg';
import { AnimatedWheel, AnimatedWheelState } from './WheelAnimationWrapper';

type ModalContentProps = JSXProxyProps<'div'> & {
  onClose?: () => void;
};

export function ModalContent({
  className,
  onClose,
  ...rest
}: ModalContentProps) {
  const t = useTranslations();
  const hueStart = 300; // random(0,360);
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [prize, setPrize] = useState<Item | undefined>();

  const prizeWithWeight = useMemo(
    () => [
      {
        value: `${t('wheelOfFortune.prizeVariants.freeLifetimeBeer')}*`,
        weight: 10,
      },
      { value: `${t('wheelOfFortune.prizeVariants.worldPeace')}*`, weight: 1 },
      {
        value: t('wheelOfFortune.prizeVariants.absolutellyNothing'),
        weight: 100,
      },
      {
        value: `${t('wheelOfFortune.prizeVariants.complimentaryOtter')}*`,
        weight: 2,
      },
      { value: t('wheelOfFortune.prizeVariants.fake70Discount'), weight: 50 },
    ],
    [t],
  );

  const [items] = useState(
    getSlicesItems(prizeWithWeight, hueStart, hueStart + 120, 10),
  );

  return (
    <div
      className={`bg-surface relative flex flex-col overflow-hidden rounded-lg ${className}`}
      {...rest}>
      <div className="grow">
        <button
          aria-label={t('common.close')}
          className="absolute top-0 right-0 z-10 cursor-pointer p-3"
          onClick={() => onClose?.()}>
          <Icon icon="close" size="lg" />
        </button>
        {state === 'completed' && (
          <Confetti
            className="absolute z-0 size-full"
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
      <span className="bg-primary text-on-primary w-full p-5 text-center text-xl font-bold">
        {state !== 'completed' && t('wheelOfFortune.spinStart')}
        {state === 'completed' &&
          prize &&
          t('wheelOfFortune.spinWin', { prize: prize.text })}
      </span>
    </div>
  );
}

const getSlicesItems = (
  pool: WeightedRandomPoolItem<string>[],
  hueStart: number,
  hueEnd: number,
  numItems: number,
) => {
  const items: Item[] = [];
  const range = [hueStart, hueEnd].sort();
  const step = (range[1] - range[0]) / numItems;
  for (let i = 0; i < numItems; i++) {
    items.push({
      color: `hsl(${range[0] + i * step}, 100%, 50%)`,
      text: getWeightedRandom(pool)!,
    });
  }

  return items;
};
