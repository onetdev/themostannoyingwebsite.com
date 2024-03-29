/**
 * @jest-environment jsdom
 */
import { mb_string_to_char_array, mb_string_slice } from '@/utils/string';

describe('mb_string_to_char_array', () => {
  test('should properly make an array of characters', () => {
    expect(mb_string_to_char_array('aA1*🏃📣')).toStrictEqual([
      'a',
      'A',
      '1',
      '*',
      '🏃',
      '📣',
    ]);
  });
});

describe('mb_string_slice', () => {
  test('should not slice multi-byte chars into pieces', () => {
    expect(mb_string_slice('🏃📣123', 0, 1)).toBe('🏃');
    expect(mb_string_slice('🏃📣123', 1)).toBe('📣123');
  });
});
