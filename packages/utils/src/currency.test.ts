import { formatCurrency } from './currency';

describe('formatCurrency', () => {
  it('formats USD correctly by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats with different currency', () => {
    // Note: The exact output can vary by environment/Node version, but this is the standard for en-US.
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });

  it('formats with different locale', () => {
    // For German locale, the currency symbol is often at the end with a non-breaking space.
    // Using a regex to match the core elements might be safer, but let's try direct match first.
    const result = formatCurrency(1234.56, 'EUR', 'de-DE');
    expect(result.replace(/\u00a0/g, ' ')).toBe('1.234,56 €');
  });
});
