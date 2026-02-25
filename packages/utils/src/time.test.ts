import { formatSecondsToHHMMSS } from './time';

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
