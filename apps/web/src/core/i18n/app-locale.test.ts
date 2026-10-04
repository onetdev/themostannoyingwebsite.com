import { assertAppLocale } from './app-locale';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

jest.mock('next-intl', () => ({
  hasLocale: (locales: readonly string[], candidate: unknown) =>
    typeof candidate === 'string' && locales.includes(candidate),
}));

jest.mock('./routing', () => ({
  routing: {
    locales: [
      'ar',
      'de',
      'en',
      'es',
      'fr',
      'hi',
      'hu',
      'it',
      'ja',
      'ko',
      'pl',
      'pt',
      'ru',
      'tr',
      'zh',
    ],
  },
}));

describe('assertAppLocale', () => {
  it('returns the value for supported locales', () => {
    expect(assertAppLocale('en')).toBe('en');
    expect(assertAppLocale('pl')).toBe('pl');
    expect(assertAppLocale('zh')).toBe('zh');
  });

  it('calls notFound for unsupported or missing values', () => {
    expect(() => assertAppLocale('.env')).toThrow('NEXT_NOT_FOUND');
    expect(() => assertAppLocale('not-a-locale')).toThrow('NEXT_NOT_FOUND');
    expect(() => assertAppLocale('')).toThrow('NEXT_NOT_FOUND');
    expect(() => assertAppLocale(undefined)).toThrow('NEXT_NOT_FOUND');
  });
});
