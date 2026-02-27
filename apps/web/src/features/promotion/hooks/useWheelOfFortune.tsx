'use client';

import {
  getWeightedRandom,
  randomInt,
  type WeightedRandomPoolItem,
} from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { useEventBus } from '@/contexts/EventBusContext';
import type { Item } from '../components/WheelOfFortune/DynamicWheelSvg';
import type { PromotionEvent } from '../types';

export type AnimatedWheelState = 'ready' | 'spinning' | 'completed';

export function useWheelOfFortune() {
  const t = useTranslations();
  const { dispatch } = useEventBus();
  const hueStart = 300; // random(0,360);
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [prize, setPrize] = useState<(Item & { index: number }) | undefined>();

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

  const items = useMemo(
    () => getSlicesItems(prizeWithWeight, hueStart, hueStart + 120, 10),
    [prizeWithWeight],
  );

  const spin = useCallback(() => {
    if (state !== 'ready') return;

    const resultIndex = randomInt(0, items.length - 1);
    setState('spinning');
    setPrize({ index: resultIndex, ...items[resultIndex] });
  }, [items, state]);

  const complete = useCallback(() => {
    if (state !== 'spinning') return;
    setState('completed');

    if (prize) {
      dispatch<PromotionEvent['payload']>('WHEEL_OF_FORTUNE_SPIN_COMPLETE', {
        prize: prize.text,
      });
    }
  }, [setState, state, prize, dispatch]);

  return {
    items,
    state,
    prize,
    setState,
    spin,
    complete,
  };
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
