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
 * Every telemetry surface in the app, as rendered by `data-track-section` and
 * the `section` props of shared actions. Keeping them in one union catches
 * typos at compile time; `telemetry-sections.test.ts` asserts that no markup
 * invents a surface that is missing here.
 */
export const TELEMETRY_SECTIONS = [
  'achievements:list',
  'achievements:reset',
  'achievements:toast',
  'auth:login',
  'auth:password-reminder',
  'auth:signup',
  'captcha:challenge',
  'captcha:trigger',
  'comments:form',
  'comments:item',
  'comments:login-required',
  'comments:section',
  'common:cookie-consent',
  'common:locale-suggestion',
  'common:share',
  'content:article',
  'content:author',
  'content:document',
  'content:home:cover',
  'content:home:latest',
  'content:home:more',
  'content:hot-things',
  'content:paywall',
  'content:search',
  'content:virgin',
  'disruptions:sticky-video',
  'error:fallback',
  'funding:before-after',
  'funding:beggar-banner',
  'funding:donation',
  'funding:faq',
  'funding:hero',
  'funding:providers',
  'marketing:adblocker',
  'marketing:dilf',
  'marketing:newsletter',
  'marketing:only-spams',
  'marketing:promotions',
  'marketing:survey',
  'marketing:wheel',
  'navigation:footer',
  'navigation:header',
  'navigation:legal',
  'navigation:logo',
  'navigation:main',
  'navigation:mobile-menu',
  'navigation:pain-level',
  'navigation:search',
  'navigation:social',
  'navigation:theme',
  'navigation:toc',
  'settings:grants',
  'settings:mandatory',
  'settings:pain-preferences',
  'settings:preferences',
  'settings:runtime',
  'share:modal',
  'subscription:cancellation',
  'subscription:plans',
  'subscription:special-deal',
  'support:chat',
  'support:contact',
  'support:rating',
  'user:notification-prompt',
] as const;

export type TelemetrySection = (typeof TELEMETRY_SECTIONS)[number];

const TELEMETRY_SECTION_SET: ReadonlySet<string> = new Set(TELEMETRY_SECTIONS);

/**
 * Runtime guard for values that reach the tracker from the DOM. Markup can
 * still render an unknown value (e.g. a stale attribute), so the capture layer
 * drops it instead of publishing an unregistered surface.
 */
export function isTelemetrySection(value: string): value is TelemetrySection {
  return TELEMETRY_SECTION_SET.has(value);
}

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

export function isTelemetryCategory(value: string): value is TelemetryCategory {
  return (TELEMETRY_CATEGORIES as readonly string[]).includes(value);
}

export function getCategory(name: TelemetryEventName): TelemetryCategory {
  const [prefix] = name.split('.');
  return isTelemetryCategory(prefix) ? prefix : 'ui';
}
