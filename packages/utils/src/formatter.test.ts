import { formatCurrency, formatSecondsToHHMMSS } from './formatter';

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

describe('time utils', () => {
  describe('formatSecondsToHHMMSS', () => {
    it('should format 0 seconds correctly', () => {
      expect(formatSecondsToHHMMSS(0)).toBe('00:00:00');
    });

    it('should format seconds correctly', () => {
      expect(formatSecondsToHHMMSS(45)).toBe('00:00:45');
    });

    it('should format minutes and seconds correctly', () => {
      expect(formatSecondsToHHMMSS(75)).toBe('00:01:15');
    });

    it('should format hours, minutes, and seconds correctly', () => {
      expect(formatSecondsToHHMMSS(3661)).toBe('01:01:01');
    });

    it('should format large hours correctly', () => {
      expect(formatSecondsToHHMMSS(360000)).toBe('100:00:00');
    });
  });
});
