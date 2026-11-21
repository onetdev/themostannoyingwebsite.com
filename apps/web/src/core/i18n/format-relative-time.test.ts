import {
  formatRelativeTime,
  getRelativeTimeRefreshIntervalMs,
} from './format-relative-time';

const NOW = new Date('2026-10-20T12:00:00.000Z').getTime();
const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

describe('formatRelativeTime', () => {
  it('formats recent timestamps in seconds', () => {
    expect(formatRelativeTime(NOW - 30 * SECOND, NOW, 'en')).toBe(
      '30 seconds ago',
    );
    expect(formatRelativeTime(NOW + 30 * SECOND, NOW, 'en')).toBe(
      'in 30 seconds',
    );
  });

  it('formats timestamps in minutes and hours', () => {
    expect(formatRelativeTime(NOW - 5 * MINUTE, NOW, 'en')).toBe(
      '5 minutes ago',
    );
    expect(formatRelativeTime(NOW - 3 * HOUR, NOW, 'en')).toBe('3 hours ago');
  });

  it('uses auto wording for day-based units', () => {
    expect(formatRelativeTime(NOW - DAY, NOW, 'en')).toBe('yesterday');
    expect(formatRelativeTime(NOW + 2 * DAY, NOW, 'en')).toBe('in 2 days');
  });

  it('formats weeks, months and years', () => {
    expect(formatRelativeTime(NOW - 2 * WEEK, NOW, 'en')).toBe('2 weeks ago');
    expect(formatRelativeTime(NOW - 2 * MONTH, NOW, 'en')).toBe('2 months ago');
    expect(formatRelativeTime(NOW - 2 * YEAR, NOW, 'en')).toBe('2 years ago');
  });

  it('supports non-English locales', () => {
    expect(formatRelativeTime(NOW - DAY, NOW, 'de')).toBe('gestern');
  });

  it('returns an empty string for invalid dates', () => {
    expect(formatRelativeTime('not-a-date', NOW, 'en')).toBe('');
  });
});

describe('getRelativeTimeRefreshIntervalMs', () => {
  it('refreshes on the scale of the displayed unit', () => {
    expect(getRelativeTimeRefreshIntervalMs(NOW - 30 * SECOND, NOW)).toBe(
      SECOND,
    );
    expect(getRelativeTimeRefreshIntervalMs(NOW - 5 * MINUTE, NOW)).toBe(
      MINUTE,
    );
    expect(getRelativeTimeRefreshIntervalMs(NOW - 3 * HOUR, NOW)).toBe(HOUR);
    expect(getRelativeTimeRefreshIntervalMs(NOW - 2 * DAY, NOW)).toBe(DAY);
    expect(getRelativeTimeRefreshIntervalMs(NOW - 2 * WEEK, NOW)).toBe(WEEK);
    expect(getRelativeTimeRefreshIntervalMs(NOW - 2 * MONTH, NOW)).toBe(MONTH);
    expect(getRelativeTimeRefreshIntervalMs(NOW - 2 * YEAR, NOW)).toBe(YEAR);
  });

  it('switches cadence at the unit boundaries', () => {
    expect(getRelativeTimeRefreshIntervalMs(NOW - MINUTE + 1, NOW)).toBe(
      SECOND,
    );
    expect(getRelativeTimeRefreshIntervalMs(NOW - MINUTE, NOW)).toBe(MINUTE);
    expect(getRelativeTimeRefreshIntervalMs(NOW - HOUR + 1, NOW)).toBe(MINUTE);
    expect(getRelativeTimeRefreshIntervalMs(NOW - HOUR, NOW)).toBe(HOUR);
  });

  it('handles future timestamps', () => {
    expect(getRelativeTimeRefreshIntervalMs(NOW + 30 * SECOND, NOW)).toBe(
      SECOND,
    );
    expect(getRelativeTimeRefreshIntervalMs(NOW + 2 * DAY, NOW)).toBe(DAY);
  });

  it('falls back to a rare refresh for invalid dates', () => {
    expect(getRelativeTimeRefreshIntervalMs('not-a-date', NOW)).toBe(YEAR);
  });
});
