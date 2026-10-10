'use client';

import {
  getWeightedRandom,
  randomInt,
  type WeightedRandomPoolItem,
} from '@maw/utils/random';
import { useCallback, useMemo, useState } from 'react';
import { emit } from '@/core/events/event-bus';
import { usePool } from '@/features/content/hooks';
import type { Item } from '../components/WheelOfFortune/DynamicWheelSvg';
import { buildPrizePool } from './wheel-prizes';

export type AnimatedWheelState = 'ready' | 'spinning' | 'completed';

export function useWheelOfFortune() {
  const prizes = usePool('prize-wheel');
  const hueStart = 300; // random(0,360);
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [prize, setPrize] = useState<(Item & { index: number }) | undefined>();

  // The wheel can only offer real prizes when the Content API pool actually
  // returned usable segments. An empty (or malformed) pool would otherwise fill
  // every slice with the `'~'` sentinel and render a meaningless wheel, so
  // consumers should show an error view instead.
  const usablePrizes = useMemo(
    () =>
      prizes.filter(
        (prize) => prize.weight > 0 && prize.label.trim().length > 0,
      ),
    [prizes],
  );

  const hasPrizes = usablePrizes.length > 0;

  const prizeWithWeight = useMemo(
    () => buildPrizePool(usablePrizes),
    [usablePrizes],
  );

  const items = useMemo(
    () =>
      hasPrizes
        ? getSlicesItems(prizeWithWeight, hueStart, hueStart + 120, 10)
        : [],
    [hasPrizes, prizeWithWeight],
  );

  const spin = useCallback(() => {
    if (!hasPrizes || state !== 'ready' || items.length === 0) return;

    const resultIndex = randomInt(0, items.length - 1);
    setState('spinning');
    setPrize({ index: resultIndex, ...items[resultIndex] });
  }, [hasPrizes, items, state]);

  const complete = useCallback(() => {
    if (state !== 'spinning') return;
    setState('completed');

    if (prize) {
      emit('wof:spin-completed', {
        prize: prize.text,
      });
    }
  }, [state, prize]);

  return {
    items,
    state,
    prize,
    setState,
    spin,
    complete,
    isUnavailable: !hasPrizes,
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
      text: getWeightedRandom(pool) ?? '~',
    });
  }

  return items;
};
