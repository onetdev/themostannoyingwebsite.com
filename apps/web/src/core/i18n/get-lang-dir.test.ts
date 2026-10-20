import { getLangDir } from './get-lang-dir';

describe('getLangDir', () => {
  it('returns rtl for right-to-left languages', () => {
    expect(getLangDir('ar')).toBe('rtl');
    expect(getLangDir('ar-EG')).toBe('rtl');
    expect(getLangDir('fa')).toBe('rtl');
    expect(getLangDir('he')).toBe('rtl');
    expect(getLangDir('ur-PK')).toBe('rtl');
  });

  it('returns ltr for left-to-right languages', () => {
    expect(getLangDir('en')).toBe('ltr');
    expect(getLangDir('de-DE')).toBe('ltr');
    expect(getLangDir('zh')).toBe('ltr');
  });

  it('is case insensitive', () => {
    expect(getLangDir('AR')).toBe('rtl');
    expect(getLangDir('En-US')).toBe('ltr');
  });

  it('falls back to ltr for empty or unknown locales', () => {
    expect(getLangDir('')).toBe('ltr');
    expect(getLangDir('xx')).toBe('ltr');
  });
});
