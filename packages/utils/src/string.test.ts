import { mb_string_to_char_array } from './string';

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

  test('should return an empty array for an empty string', () => {
    expect(mb_string_to_char_array('')).toStrictEqual([]);
  });
});
