import type { WeightedRandomPoolItem } from '@maw/utils/random';
import type { VariantPoolItem } from '@/features/content/types';

/** A single localized wheel prize as served by the Content API. */
export type WheelPrize = VariantPoolItem<'wheel-prizes'>;

interface WheelPrizeSlot {
  id: string;
  weight: number;
  /** Appends the "special prize" asterisk suffix used by the wheel copy. */
  starred?: boolean;
}

/**
 * Fixed wheel weighting keyed by the Content API prize id.
 *
 * The Content API owns the localized labels, while the weights and the `*`
 * decoration stay in code. Keep the ids in sync with the `wheel-prizes` pool.
 */
export const WHEEL_PRIZE_SLOTS: readonly WheelPrizeSlot[] = [
  { id: 'freeLifetimeBeer', weight: 10, starred: true },
  { id: 'worldPeace', weight: 1, starred: true },
  { id: 'absolutelyNothing', weight: 100 },
  { id: 'complimentaryOtter', weight: 2, starred: true },
  { id: 'fake70Discount', weight: 50 },
];

/**
 * Maps the Content API `wheel-prizes` pool onto the weighted pool consumed by
 * the wheel.
 *
 * Missing labels fall back to the id so a partially translated or unavailable
 * pool never renders blank slices; unknown ids in the pool are ignored.
 */
export function buildPrizePool(
  prizes: readonly WheelPrize[],
): WeightedRandomPoolItem<string>[] {
  const labelById = new Map(prizes.map((prize) => [prize.id, prize.label]));

  return WHEEL_PRIZE_SLOTS.map(({ id, weight, starred }) => {
    const label = labelById.get(id) ?? id;
    return {
      value: starred ? `${label}*` : label,
      weight,
    };
  });
}
