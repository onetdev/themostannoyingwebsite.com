import { arrayShuffle, mergeIntervals } from './array';

describe('arrayShuffle', () => {
  test('should return an empty array if an empty array is provided', () => {
    const result = arrayShuffle([]);
    expect(result).toStrictEqual([]);
  });

  test('should return the same array if only one element is provided', () => {
    const result = arrayShuffle([1]);
    expect(result).toStrictEqual([1]);
  });

  test('should return a new array with the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = arrayShuffle(input);
    expect(result).not.toBe(input);
    expect(result).toHaveLength(input.length);
    expect(result.sort()).toStrictEqual(input.sort());
  });

  test('should shuffle elements (mocked random)', () => {
    const input = [1, 2, 3];
    // Force a specific shuffle pattern by mocking Math.random
    // for i=2, j=Math.floor(0.9 * 3) = 2 (swap 2 with 2)
    // for i=1, j=Math.floor(0.1 * 2) = 0 (swap 1 with 0) -> [2, 1, 3] (original was [1, 2, 3])
    const mockMath = Object.create(global.Math);
    mockMath.random = jest
      .fn()
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.1);
    global.Math = mockMath;

    const result = arrayShuffle(input);
    expect(result).toStrictEqual([2, 1, 3]);

    // Restore Math
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});

describe('mergeIntervals', () => {
  test('should return an empty array if no intervals are provided', () => {
    const result = mergeIntervals([]);
    expect(result).toStrictEqual([]);
  });

  test('should return an empty array if all intervals are empty', () => {
    const result = mergeIntervals([
      [0, 0],
      [0, 0],
    ]);
    expect(result).toStrictEqual([[0, 0]]);
  });

  test('should merge overlapping intervals', () => {
    const result = mergeIntervals([
      [0, 1],
      [2, 3],
      [3, 4],
      [5, 6],
    ]);
    expect(result).toStrictEqual([
      [0, 1],
      [2, 4],
      [5, 6],
    ]);
  });

  test('should merge non-overlapping intervals', () => {
    const result = mergeIntervals([
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ]);
    expect(result).toStrictEqual([
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ]);
  });
});
