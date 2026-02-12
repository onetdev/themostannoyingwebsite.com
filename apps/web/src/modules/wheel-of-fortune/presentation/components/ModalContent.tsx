import { getWeightedRandom, WeightedRandomPoolItem } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { ComponentProps, useMemo, useState } from 'react';
import Confetti from 'react-confetti';

import { Item } from './DynamicWheelSvg';
import { AnimatedWheel, AnimatedWheelState } from './WheelAnimationWrapper';

type ModalContentProps = ComponentProps<'div'>;

export function ModalContent({ className, ...rest }: ModalContentProps) {
  const t = useTranslations();
  const hueStart = 300; // random(0,360);
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [_prize, setPrize] = useState<Item | undefined>();

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
      className={`relative flex flex-col overflow-hidden rounded-lg border ${className}`}
      {...rest}>
      <div className="grow">
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
