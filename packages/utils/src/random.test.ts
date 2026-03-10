import {
  getWeightedRandom,
  idFromRand,
  mulberry32,
  randomArrayEntry,
  randomBool,
  randomInt,
  randomNumber,
  stringToSeed,
} from './random';

describe('seed utils', () => {
  describe('stringToSeed', () => {
    test('should return a deterministic seed for a string', () => {
      const str = 'hello world';
      const seed1 = stringToSeed(str);
      const seed2 = stringToSeed(str);
      expect(seed1).toBe(seed2);
      expect(typeof seed1).toBe('number');
    });

    test('should return different seeds for different strings', () => {
      const seed1 = stringToSeed('hello world');
      const seed2 = stringToSeed('hello world!');
      expect(seed1).not.toBe(seed2);
    });
  });

  describe('mulberry32', () => {
    test('should return a deterministic sequence of random numbers', () => {
      const seed = 123456789;
      const gen1 = mulberry32(seed);
      const gen2 = mulberry32(seed);

      const val1_1 = gen1();
      const val1_2 = gen1();
      const val2_1 = gen2();
      const val2_2 = gen2();

      expect(val1_1).toBe(val2_1);
      expect(val1_2).toBe(val2_2);
      expect(val1_1).not.toBe(val1_2);
    });
  });

  describe('idFromRand', () => {
    test('should generate a string ID from a generator', () => {
      const gen = mulberry32(123);
      const id1 = idFromRand(gen);
      const id2 = idFromRand(gen);

      expect(typeof id1).toBe('string');
      expect(id1).not.toBe(id2);
      expect(id1.length).toBeGreaterThan(0);
    });

    test('should be deterministic if generator is deterministic', () => {
      const id1 = idFromRand(mulberry32(123));
      const id2 = idFromRand(mulberry32(123));
      expect(id1).toBe(id2);
    });
  });
});

describe('Math getWeightedRandom', () => {
  test('should return a weighted random value', () => {
    const result = getWeightedRandom([
      { value: 'a', weight: 0 },
      { value: 'b', weight: 0.5 },
      { value: 'c', weight: 1 },
    ]);

    expect(['b', 'c']).toContain(result);
  });

  test('should return undefined if pool is empty after filtering', () => {
    const result = getWeightedRandom([{ value: 'a', weight: 0 }]);
    expect(result).toBeUndefined();
  });

  test('should return correct item based on weight', () => {
    // Total weight = 1 + 2 = 3
    // We mock random to return something that targets the second item
    // randomNumber(0, 3) with Math.random() = 0.5 returns 1.5
    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const result = getWeightedRandom([
      { value: 'a', weight: 1 },
      { value: 'b', weight: 2 },
    ]);
    // rand = 1.5. sum = 1 (a), sum = 3 (b). 1.5 <= 3 is true.
    expect(result).toBe('b');
    mockRandom.mockRestore();
  });

  test('should handle items with missing weight safely', () => {
    // Testing lines 48-49: items[i]?.weight ?? 0
    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.99);
    const result = getWeightedRandom([
      { value: 'a', weight: 1 },
      { value: 'b' } as any, // Missing weight
    ]);
    expect(result).toBe('a');
    mockRandom.mockRestore();
  });
});

describe('Math random', () => {
  test('should return a random number between min and max', () => {
    const result = randomNumber(1, 10);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test('should return a random float between min and max', () => {
    const result = randomNumber(0.1, 1);

    expect(result).toBeGreaterThanOrEqual(0.1);
    expect(result).toBeLessThanOrEqual(1);
  });

  test('should return an integer if requested', () => {
    const result = randomNumber(1, 10, true);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe('Math randomInt', () => {
  test('should return a random integer between min and max', () => {
    const result = randomInt(1, 10);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });
});

describe('randomBool', () => {
  test('should return a boolean', () => {
    expect(typeof randomBool()).toBe('boolean');
  });

  test('should return true when Math.random is >= 0.5', () => {
    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(randomBool()).toBe(true);
    mockRandom.mockRestore();
  });

  test('should return false when Math.random is < 0.5', () => {
    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.49);
    expect(randomBool()).toBe(false);
    mockRandom.mockRestore();
  });
});

describe('randomArrayEntry', () => {
  test('should return an entry from the array', () => {
    const arr = ['a', 'b', 'c'];
    const result = randomArrayEntry(arr);
    expect(arr).toContain(result);
  });

  test('should return undefined for empty array', () => {
    expect(randomArrayEntry([])).toBeUndefined();
  });
});
