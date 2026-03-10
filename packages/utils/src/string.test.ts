import {
  first_letter_capitalize,
  flattenSameTagNesting,
  fuzzy_search,
  mb_string_slice,
  mb_string_to_char_array,
  string_closeness,
} from './string';

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

describe('first_letter_capitalize', () => {
  test('should capitalize the first letter of a string', () => {
    expect(first_letter_capitalize('hello')).toBe('Hello');
  });

  test('should return an empty string for an empty string', () => {
    expect(first_letter_capitalize('')).toBe('');
  });

  test('should capitalize multi-byte characters if possible', () => {
    // lowercase 'a' with accent to uppercase 'A' with accent
    expect(first_letter_capitalize('árvíztűrőtükörfúrógép')).toBe(
      'Árvíztűrőtükörfúrógép',
    );
  });

  test('should return the same string if the first character cannot be capitalized', () => {
    expect(first_letter_capitalize('🏃📣')).toBe('🏃📣');
  });
});

describe('mb_string_slice', () => {
  test('should not slice multi-byte chars into pieces', () => {
    expect(mb_string_slice('🏃📣123', 0, 1)).toBe('🏃');
    expect(mb_string_slice('🏃📣123', 1)).toBe('📣123');
  });
});

describe('string_closeness', () => {
  test('should return 1 if the strings are the same', () => {
    const result = string_closeness('a', 'a');
    expect(result).toEqual(1);
  });

  test('should return 0 if the strings are not the same', () => {
    const result = string_closeness('a', 'b');
    expect(result).toEqual(0);
  });

  test('should return 0 if one string is empty', () => {
    expect(string_closeness('', 'a')).toBe(0);
    expect(string_closeness('a', '')).toBe(0);
  });

  test('should return 0.83333 if only one char is different in a len 4 string', () => {
    const result = string_closeness('alma', 'elma');
    expect(result).toEqual(5 / 6);
  });

  test('should return 0.75 if a 4 char word is in the middle of an 8 char length string', () => {
    const result = string_closeness('alma', 'llalmall');
    expect(result).toEqual(0.75);
  });
});

describe('fuzzy_search', () => {
  test('should return an empty array if the query is empty', () => {
    const result = fuzzy_search({ text: 'hello', query: '' });
    expect(result).toStrictEqual(null);
  });

  test('should return an empty array if the query is not in the string', () => {
    const result = fuzzy_search({ text: 'hello', query: 'world' });
    expect(result).toStrictEqual(null);
  });

  test('should return an empty array if the string is empty', () => {
    const result = fuzzy_search({ text: '', query: 'hello' });
    expect(result).toStrictEqual(null);
  });

  test('should return an array of results if the query is in the string', () => {
    const result = fuzzy_search({ text: 'hello world', query: 'hello' });

    expect(result).toBeInstanceOf(Object);
    expect(result?.result).toStrictEqual('<mark>hello</mark> world');
  });

  test('should return an array of results if the query is in the string', () => {
    const result = fuzzy_search({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in justo a ipsum sollicitudin faucibus. Donec in lacinia tortor. Vivamus.',
      query: 'Pollentesque',
      threshold: 0.5,
    });

    expect(result).toBeInstanceOf(Object);
    expect(result?.result).toStrictEqual(
      'Lorem ipsum dolor sit amet, <mark>consectetur</mark> adipiscing elit. <mark>Pellentesque</mark> in justo a ipsum <mark>sollicitudin</mark> faucibus. Donec in la',
    );
  });
});

describe('flattenSameTagNesting', () => {
  test('should flatten nested tags', () => {
    const input = '<mark>hello <mark>world</mark></mark>';
    expect(flattenSameTagNesting(input, 'mark')).toBe(
      '<mark>hello world</mark>',
    );
  });

  test('should handle non-nested tags', () => {
    const input = '<mark>hello</mark> <mark>world</mark>';
    expect(flattenSameTagNesting(input, 'mark')).toBe(
      '<mark>hello</mark> <mark>world</mark>',
    );
  });

  test('should handle deep nesting', () => {
    const input = '<mark><mark><mark>deep</mark></mark></mark>';
    expect(flattenSameTagNesting(input, 'mark')).toBe('<mark>deep</mark>');
  });

  test('should return the same string if no tags are present', () => {
    const input = 'hello world';
    expect(flattenSameTagNesting(input, 'mark')).toBe('hello world');
  });

  test('should handle edge cases for the matcher', () => {
    // This is to try and trigger the return '' branch if somehow it matches something else (unlikely with this regex)
    // Actually, line 243 `return '';` is a fallback that might be hard to reach if the regex only matches `<tag>` or `</tag>`.
    // But we can try to pass something that might confuse it if the regex was broader.
    // Given the current regex `(<${tag}>|</${tag}>)`, it really should only match those two.
    expect(flattenSameTagNesting('<other>tag</other>', 'mark')).toBe(
      '<other>tag</other>',
    );
  });
});
