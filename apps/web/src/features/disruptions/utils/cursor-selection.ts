import type { CursorPreset } from '../schemas';

export type RandomSource = () => number;

const pickFromPool = (
  pool: CursorPreset[],
  rng: RandomSource,
): CursorPreset | null => {
  if (pool.length === 0) {
    return null;
  }

  const index = Math.min(pool.length - 1, Math.floor(rng() * pool.length));
  return pool[index] ?? null;
};

/**
 * The first cursor should always be an arrow so the prank starts subtly
 * instead of immediately turning the pointer into an hourglass.
 */
export const pickInitialCursor = (
  cursors: readonly CursorPreset[],
  rng: RandomSource = Math.random,
): CursorPreset | null => {
  const arrows = cursors.filter((cursor) => cursor.kind === 'arrow');
  return pickFromPool(arrows.length > 0 ? arrows : [...cursors], rng);
};

export const pickNextCursor = (
  cursors: readonly CursorPreset[],
  currentId: string,
  rng: RandomSource = Math.random,
): CursorPreset | null => {
  const pool = cursors.filter((cursor) => cursor.id !== currentId);
  return pickFromPool(pool, rng);
};

export const getCursorCssValue = (cursor: CursorPreset): string =>
  `url("${cursor.src}") ${cursor.hotspot.x} ${cursor.hotspot.y}, default`;
