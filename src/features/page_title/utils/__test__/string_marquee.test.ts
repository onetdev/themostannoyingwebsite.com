/**
 * @jest-environment jsdom
 */
import string_marquee from '@/features/page_title/utils/string_marquee';

describe('String Marquee', () => {
  const base = {
    width: 10,
    loopSpace: 5,
    separatorChar: ' ',
  };

  it('should return 10 character long output even without content', () => {
    expect(string_marquee('', 0, base)).toBe('          ');
  });

  it('should return 10 character no matter the lengt of the input', () => {
    expect(string_marquee('Hello', 0, base)).toBe('Hello     ');
    expect(string_marquee('Hello Bello Chello', 0, base)).toBe('Hello Bell');
  });

  it('should offset the text by t while keeping 10 character limit and 5 loop space', () => {
    expect(string_marquee('Hello', 0, base)).toBe('Hello     ');
    expect(string_marquee('Hello', 1, base)).toBe('ello     H');
    expect(string_marquee('Hello', 2, base)).toBe('llo     He');
    expect(string_marquee('Hello', 3, base)).toBe('lo     Hel');
    expect(string_marquee('Hello', 4, base)).toBe('o     Hell');
    expect(string_marquee('Hello', 5, base)).toBe('     Hello');
  });

  it('should respect multi-byte characters', () => {
    expect(string_marquee('🏃📣', 0, base)).toBe('🏃📣     🏃📣 ');
    expect(string_marquee('🏃📣', 1, base)).toBe('📣     🏃📣  ');
    expect(string_marquee('🏃📣', 2, base)).toBe('     🏃📣   ');
  });
});
