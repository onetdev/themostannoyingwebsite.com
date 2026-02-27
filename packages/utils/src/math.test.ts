import {
  angleRad,
  clamp,
  getInterpolatedPoint,
  getPointDistance,
  getWeightedRandom,
  isPoint2d,
  mapToLogScale,
  radToDeg,
  random,
  randomInt,
} from './math';

describe('Math isPoint2d', () => {
  test('should return true for valid Point2d object', () => {
    expect(isPoint2d({ x: 1, y: 2 })).toBe(true);
  });

  test('should return false for invalid object', () => {
    expect(isPoint2d({ x: 1 })).toBe(false);
    expect(isPoint2d({ y: 2 })).toBe(false);
    expect(isPoint2d(null)).toBe(false);
    expect(isPoint2d('point')).toBe(false);
    expect(isPoint2d({ x: '1', y: 2 })).toBe(false);
  });
});

describe('Math angleRad', () => {
  test('should return the angle between two points in radians', () => {
    const result = angleRad({ x: 0, y: 0 }, { x: 10, y: 10 });

    expect(result).toBe(0.7853981633974483);
  });
});

describe('Math clamp', () => {
  test('should return min value if value is less than min', () => {
    expect(clamp(0, 1, 10)).toBe(1);
  });

  test('should return max value if value is greater than max', () => {
    expect(clamp(100, 1, 10)).toBe(10);
  });

  test('should return value if value is between min and max', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });
});

describe('Math getInterpolatedPoint', () => {
  test('should interpolate between two points', () => {
    const result = getInterpolatedPoint({ x: 0, y: 0 }, { x: 10, y: 10 }, 0.5);

    expect(result).toEqual({
      x: 5,
      y: 5,
    });
  });
});

describe('Math getPointDistance', () => {
  test('should return the distance between two points', () => {
    const result = getPointDistance({ x: 0, y: 0 }, { x: 10, y: 10 });

    expect(result).toEqual({
      x: -10,
      y: -10,
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
});

describe('Math radToDeg', () => {
  test('should convert radians to degrees', () => {
    const result = radToDeg(Math.PI);

    expect(result).toBe(180);
  });
});

describe('Math random', () => {
  test('should return a random number between min and max', () => {
    const result = random(1, 10);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test('should return a random float between min and max', () => {
    const result = random(0.1, 1);

    expect(result).toBeGreaterThanOrEqual(0.1);
    expect(result).toBeLessThanOrEqual(1);
  });

  test('should return an integer if requested', () => {
    const result = random(1, 10, true);
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

describe('Math mapToLogScale', () => {
  test('should map a value to a log scale', () => {
    // log(10)/log(100) * 100 = 1/2 * 100 = 50
    expect(mapToLogScale(10, 100, 100)).toBeCloseTo(50);
    expect(mapToLogScale(1, 100, 100)).toBeCloseTo(0);
    expect(mapToLogScale(100, 100, 100)).toBeCloseTo(100);
  });

  test('should return 0 for non-positive score', () => {
    expect(mapToLogScale(0, 100, 100)).toBe(0);
    expect(mapToLogScale(-1, 100, 100)).toBe(0);
  });
});
