import {
  charmRound,
  convertAmount,
  formatMoney,
  getCurrencyDecimals,
  getCurrencySymbol,
  getDisplayCurrencies,
  getRate,
  toBaseAmount,
  toDisplayAmount,
} from './currency';
import type { CurrencyRate } from './types';

const rates: CurrencyRate[] = [
  { code: 'USD', rate: 2 },
  { code: 'HUF', rate: 400 },
  { code: 'BTC', rate: 0.00001 },
];

describe('getCurrencyDecimals', () => {
  it('uses the currency minor units', () => {
    expect(getCurrencyDecimals('en-US', 'USD')).toBe(2);
    expect(getCurrencyDecimals('en-US', 'HUF')).toBe(0);
  });
});

describe('getCurrencySymbol', () => {
  it('returns the localized currency token', () => {
    expect(getCurrencySymbol('en-US', 'USD')).toBe('$');
    expect(getCurrencySymbol('hu-HU', 'HUF')).toBe('Ft');
    expect(getCurrencySymbol('de-DE', 'EUR')).toBe('€');
  });
});

describe('getRate', () => {
  it('is 1 for the base currency even when it is not listed', () => {
    expect(getRate('EUR', { base: 'EUR', rates })).toBe(1);
  });

  it('reads the rate table', () => {
    expect(getRate('USD', { base: 'EUR', rates })).toBe(2);
  });

  it('leaves unknown currencies unconverted', () => {
    expect(getRate('GBP', { base: 'EUR', rates })).toBe(1);
    expect(getRate('USD', { base: 'EUR' })).toBe(1);
  });
});

describe('convertAmount', () => {
  it('multiplies by the rate', () => {
    expect(convertAmount(100, 'USD', { base: 'EUR', rates })).toBe(200);
  });

  it('keeps base amounts unchanged', () => {
    expect(convertAmount(100, 'EUR', { base: 'EUR', rates })).toBe(100);
  });
});

describe('getDisplayCurrencies', () => {
  it('puts the base first, preserves rate order and excludes codes', () => {
    expect(
      getDisplayCurrencies(rates, { base: 'EUR', exclude: ['BTC'] }),
    ).toEqual(['EUR', 'USD', 'HUF']);
  });

  it('falls back to the base currency alone when rates are unavailable', () => {
    expect(getDisplayCurrencies(undefined, { base: 'EUR' })).toEqual(['EUR']);
  });

  it('honours a custom base currency', () => {
    expect(getDisplayCurrencies(rates, { base: 'USD' })).toEqual([
      'USD',
      'HUF',
      'BTC',
    ]);
  });
});

describe('charmRound', () => {
  it('snaps zero-decimal currencies to an integer charm price', () => {
    expect(charmRound(1975, 0)).toBe(1999);
    expect(charmRound(5925, 0)).toBe(5999);
  });

  it('snaps decimal currencies to a .99 charm price', () => {
    expect(charmRound(5.4, 2)).toBe(4.99);
    expect(charmRound(32.4, 2)).toBe(29.99);
    expect(charmRound(108, 2)).toBe(99.99);
  });

  it('treats non-positive values as zero', () => {
    expect(charmRound(0, 2)).toBe(0);
    expect(charmRound(-5, 2)).toBe(0);
  });
});

describe('toDisplayAmount', () => {
  it('converts via the rate table', () => {
    expect(
      toDisplayAmount(100, {
        locale: 'en-US',
        currency: 'USD',
        base: 'EUR',
        rates,
      }),
    ).toBe(200);
  });

  it('returns the base amount unchanged for the base currency', () => {
    expect(
      toDisplayAmount(100, {
        locale: 'en-US',
        currency: 'EUR',
        base: 'EUR',
        rates,
      }),
    ).toBe(100);
  });

  it('applies charm rounding when requested', () => {
    expect(
      toDisplayAmount(
        5,
        { locale: 'en-US', currency: 'EUR', base: 'EUR' },
        { charm: true },
      ),
    ).toBe(4.99);
  });
});

describe('toBaseAmount', () => {
  it('inverts the rate', () => {
    expect(toBaseAmount(200, { currency: 'USD', base: 'EUR', rates })).toBe(
      100,
    );
  });

  it('keeps base-currency amounts unchanged', () => {
    expect(toBaseAmount(42, { currency: 'EUR', base: 'EUR' })).toBe(42);
  });
});

describe('formatMoney', () => {
  it('formats a negative balance with the locale currency symbol', () => {
    const formatted = formatMoney(-44856, {
      locale: 'en-US',
      currency: 'USD',
      base: 'EUR',
      rates,
    });

    expect(formatted).toContain('$');
    expect(formatted).toContain('-');
  });

  it('applies charm rounding when requested', () => {
    expect(
      formatMoney(
        5,
        { locale: 'en-US', currency: 'EUR', base: 'EUR' },
        { charm: true },
      ),
    ).toBe('€4.99');
  });
});
