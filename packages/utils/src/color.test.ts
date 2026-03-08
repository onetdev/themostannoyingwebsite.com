import { getRelativeLuminance, useRelativeLuminance } from './color';

describe('color utils', () => {
  describe('getRelativeLuminance', () => {
    test('should return 0 for black', () => {
      expect(getRelativeLuminance('#000000')).toBe(0);
    });

    test('should return 1 for white', () => {
      expect(getRelativeLuminance('#ffffff')).toBe(1);
    });

    test('should return a value between 0 and 1 for colors', () => {
      const luminance = getRelativeLuminance('#ff0000'); // Red
      expect(luminance).toBeGreaterThan(0);
      expect(luminance).toBeLessThan(1);
      expect(luminance).toBeCloseTo(0.2126);
    });

    test('should return undefined for invalid hex', () => {
      expect(getRelativeLuminance('not-a-color')).toBeUndefined();
      expect(getRelativeLuminance('#123')).toBeUndefined();
    });
  });

  describe('useRelativeLuminance', () => {
    test('should return dark stop for dark colors', () => {
      const result = useRelativeLuminance('#000000', ['dark', 'light']);
      expect(result).toBe('dark');
    });

    test('should return light stop for light colors', () => {
      const result = useRelativeLuminance('#ffffff', ['dark', 'light']);
      expect(result).toBe('light');
    });

    test('should use fallback if primary is invalid', () => {
      const result = useRelativeLuminance(
        'invalid',
        ['dark', 'light'],
        '#000000',
      );
      expect(result).toBe('dark');
    });

    test('should return dark stop if both are invalid (value becomes -1)', () => {
      const result = useRelativeLuminance('invalid', ['dark', 'light']);
      expect(result).toBe('dark');
    });
  });
});
