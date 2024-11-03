/**
 * @jest-environment jsdom
 */
import { mergeIntervals } from '@/lib/utils/array';

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
