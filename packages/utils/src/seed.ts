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
