import { idFromRand, mulberry32, stringToSeed } from './seed';

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
