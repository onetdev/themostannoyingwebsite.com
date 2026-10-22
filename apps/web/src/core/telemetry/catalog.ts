import type { TelemetryCategory, TelemetryEventName } from './types';

export const TELEMETRY_CATEGORIES: readonly TelemetryCategory[] = [
  'nav',
  'impression',
  'ui',
  'form',
  'input',
  'error',
  'session',
  'perf',
  'disruption',
  'commerce',
  'marketing',
  'achievement',
  'support',
  'admin',
];

/**
 * Fraction of events kept per category. Web vitals are sampled in production
 * because they are high-volume and only meaningful in aggregate; faults and
 * funnel events are always kept.
 */
export const CATEGORY_SAMPLING: Partial<Record<TelemetryCategory, number>> = {
  perf: 0.25,
};

/**
 * Repeated identical events inside this window are dropped. Keeps double
 * clicks, React re-renders, and Base UI synthetic events from inflating the
 * stream. `undefined` means no dedupe.
 */
export const CATEGORY_DEDUPE_WINDOW_MS: Partial<
  Record<TelemetryCategory, number>
> = {
  ui: 300,
  input: 500,
  nav: 300,
};

/**
 * Categories that are safe and useful to attach to Sentry error reports.
 * High-volume/aggregate data (impressions, inputs, vitals) is intentionally
 * excluded so the 100-breadcrumb buffer keeps the interesting trail.
 */
export const SENTRY_BREADCRUMB_CATEGORIES: ReadonlySet<TelemetryCategory> =
  new Set<TelemetryCategory>([
    'nav',
    'ui',
    'form',
    'error',
    'disruption',
    'commerce',
    'marketing',
    'achievement',
    'support',
    'admin',
  ]);

/** Categories forwarded to the optional first-party beacon. */
export const BEACON_CATEGORIES: ReadonlySet<TelemetryCategory> =
  new Set<TelemetryCategory>(['nav', 'session', 'form', 'error', 'perf']);

export function isTelemetryCategory(value: string): value is TelemetryCategory {
  return (TELEMETRY_CATEGORIES as readonly string[]).includes(value);
}

export function getCategory(name: TelemetryEventName): TelemetryCategory {
  const [prefix] = name.split('.');
  return isTelemetryCategory(prefix) ? prefix : 'ui';
}
