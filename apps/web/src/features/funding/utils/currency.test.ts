import {
  charmRound,
  formatMoney,
  getCurrencySymbol,
  resolveDisplayCurrency,
  toDisplayAmount,
} from './currency';

describe('resolveDisplayCurrency', () => {
  it('maps a locale region to its currency', () => {
    expect(resolveDisplayCurrency('en-US')).toBe('USD');
    expect(resolveDisplayCurrency('en-GB')).toBe('GBP');
    expect(resolveDisplayCurrency('hu-HU')).toBe('HUF');
    expect(resolveDisplayCurrency('de-DE')).toBe('EUR');
  });

  it('falls back to the base currency for unmapped regions', () => {
    expect(resolveDisplayCurrency('en-AQ')).toBe('EUR');
    expect(resolveDisplayCurrency('not-a-locale')).toBe('EUR');
  });

  it('honours a custom base currency', () => {
    expect(resolveDisplayCurrency('en-AQ', undefined, 'USD')).toBe('USD');
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
  it('converts via the fallback rate table', () => {
    expect(
      toDisplayAmount(100, { locale: 'en-US', currency: 'USD' }),
    ).toBeCloseTo(108);
  });

  it('prefers API-supplied rates', () => {
    const rates = [{ code: 'USD', rate: 2 }];
    expect(
      toDisplayAmount(100, { locale: 'en-US', currency: 'USD', rates }),
    ).toBeCloseTo(200);
  });
});

describe('formatMoney', () => {
  it('formats a negative balance with the locale currency symbol', () => {
    const formatted = formatMoney(-44856, {
      locale: 'en-US',
      currency: 'USD',
    });
    expect(formatted).toContain('$');
    expect(formatted).toContain('-');
  });

  it('applies charm rounding when requested', () => {
    expect(
      formatMoney(5, { locale: 'en-US', currency: 'USD' }, { charm: true }),
    ).toBe('$4.99');
  });
});

describe('getCurrencySymbol', () => {
  it('returns the localized currency token', () => {
    expect(getCurrencySymbol('en-US', 'USD')).toBe('$');
    expect(getCurrencySymbol('hu-HU', 'HUF')).toBe('Ft');
    expect(getCurrencySymbol('de-DE', 'EUR')).toBe('€');
  });
});
