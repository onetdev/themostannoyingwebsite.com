'use client';

import {
  getWeightedRandom,
  randomInt,
  type WeightedRandomPoolItem,
} from '@maw/utils/random';
import { useCallback, useMemo, useState } from 'react';
import { emit } from '@/core/events/event-bus';
import { useVariantPool } from '@/features/content/hooks';
import type { Item } from '../components/WheelOfFortune/DynamicWheelSvg';
import { buildPrizePool } from './wheel-prizes';

export type AnimatedWheelState = 'ready' | 'spinning' | 'completed';

export function useWheelOfFortune() {
  const prizes = useVariantPool('wheel-prizes');
  const hueStart = 300; // random(0,360);
  const [state, setState] = useState<AnimatedWheelState>('ready');
  const [prize, setPrize] = useState<(Item & { index: number }) | undefined>();

  const prizeWithWeight = useMemo(() => buildPrizePool(prizes), [prizes]);

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
