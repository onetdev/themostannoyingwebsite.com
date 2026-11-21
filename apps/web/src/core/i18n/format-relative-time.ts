const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

type RelativeTimeUnit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';

const UNIT_DURATION_MS: Record<RelativeTimeUnit, number> = {
  second: SECOND,
  minute: MINUTE,
  hour: HOUR,
  day: DAY,
  week: WEEK,
  month: MONTH,
  year: YEAR,
};

type RelativeTimeValue = {
  unit: RelativeTimeUnit;
  value: number;
};

function pickRelativeTimeUnit(diffMs: number): RelativeTimeValue {
  const absolute = Math.abs(diffMs);

  if (absolute < MINUTE) {
    return { unit: 'second', value: Math.round(diffMs / SECOND) };
  }
  if (absolute < HOUR) {
    return { unit: 'minute', value: Math.round(diffMs / MINUTE) };
  }
  if (absolute < DAY) {
    return { unit: 'hour', value: Math.round(diffMs / HOUR) };
  }
  if (absolute < WEEK) {
    return { unit: 'day', value: Math.round(diffMs / DAY) };
  }
  if (absolute < MONTH) {
    return { unit: 'week', value: Math.round(diffMs / WEEK) };
  }
  if (absolute < YEAR) {
    return { unit: 'month', value: Math.round(diffMs / MONTH) };
  }
  return { unit: 'year', value: Math.round(diffMs / YEAR) };
}

/**
 * Formats a timestamp relative to `now` using the platform's
 * `Intl.RelativeTimeFormat` (e.g. "yesterday", "in 2 days", "5 minutes ago").
 */
export function formatRelativeTime(
  date: Date | number | string,
  now: number,
  locale: string,
): string {
  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return '';
  }

  const { unit, value } = pickRelativeTimeUnit(timestamp - now);

  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
    value,
    unit,
  );
}

/**
 * Picks how often a relative timestamp must be re-rendered so its label stays
 * accurate. The cadence follows the unit currently displayed: seconds tick
 * every second, minutes every minute, and so on.
 */
export function getRelativeTimeRefreshIntervalMs(
  date: Date | number | string,
  now: number,
): number {
  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return YEAR;
  }

  return UNIT_DURATION_MS[pickRelativeTimeUnit(timestamp - now).unit];
}
