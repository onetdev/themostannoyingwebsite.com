/**
 * @jest-environment jsdom
 */
import { clamp } from '@/utils/math';

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
