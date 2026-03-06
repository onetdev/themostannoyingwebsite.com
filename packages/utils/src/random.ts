/**
 * FNV-1a hash variant: turns our string into a 32-bit integer hash.
 * And it's is deterministic.
 */
export function stringToSeed(str: string): number {
  let h = 2166136261;

  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  return h >>> 0;
}

/**
 * Deterministic PRNG
 * This generator will spit out the same number sequence on each new run for
 * the same seed.
 */
export function mulberry32(seed: number) {
  return () => {
    // biome-ignore lint: Biome might say confusing but it is an INTENTIONAL logic of the algo.
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates stable ID from mulberry32 number sequence generator.
 */
export function idFromRand(rand: () => number) {
  return Math.floor(rand() * 1e12).toString(36);
}

export type WeightedRandomPoolItem<T> = { value: T; weight: number };
export const getWeightedRandom = <T>(
  itemsRaw: WeightedRandomPoolItem<T>[],
): T | undefined => {
  const items = itemsRaw.filter((item) => item.weight > 0);
  const total = items.reduce((carry, curent) => carry + curent.weight, 0);
  const rand = randomNumber(0, total);
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i]?.weight ?? 0;
    if (rand <= sum) {
      return items[i]?.value;
    }
  }
};

export const randomNumber = (
  min: number,
  max: number,
  integerResult = false,
): number => {
  const result = Math.random() * (max - min) + min;
  return integerResult ? Math.round(result) : result;
};

export const randomInt = (min: number, max: number): number => {
  return randomNumber(min, max, true);
};

export const randomBool = (): boolean => {
  return Math.random() >= 0.5;
};

export const randomArrayEntry = <T>(array: T[]): T => {
  return array[randomInt(0, array.length)];
};
