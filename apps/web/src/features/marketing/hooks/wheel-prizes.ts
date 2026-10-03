import type { WeightedRandomPoolItem } from '@maw/utils/random';
import type { ContentPoolItem } from '@/features/content/types';

/** A single localized wheel prize as served by the Content API. */
export type WheelPrize = ContentPoolItem<'prize-wheel'>;

/**
 * Maps the Content API prize-wheel segments onto the weighted pool consumed by
 * the wheel.
 *
 * The Content API owns both the localized labels and the `weight`/`starred`
 * behavior, so the client only decorates starred segments with the "special
 * prize" asterisk suffix.
 */
export function buildPrizePool(
  prizes: readonly WheelPrize[],
): WeightedRandomPoolItem<string>[] {
  return prizes.map((prize) => ({
    value: prize.starred ? `${prize.label}*` : prize.label,
    weight: prize.weight,
  }));
}
