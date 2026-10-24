/**
 * User-interaction telemetry contract.
 *
 * The map below is the single source of truth for every event the tracker may
 * emit. Adding an event means adding a name + prop shape here, which keeps the
 * emit sites type-safe and the `/debug` stream readable.
 *
 * Rules:
 * - Only primitives, and only what an operator needs to understand a session.
 * - Never input values, query strings, cookies, or anything identifying.
 * - Names are dot-namespaced and stable; the first segment is the category.
 */

import type { RouteAlias } from '@/schemas/route-alias';
import type { TelemetrySection } from './catalog';

export type TelemetryCategory =
  | 'nav'
  | 'impression'
  | 'ui'
  | 'form'
  | 'input'
  | 'error'
  | 'session'
  | 'perf'
  | 'disruption'
  | 'commerce'
  | 'marketing'
  | 'achievement'
  | 'support'
  | 'admin';

export type TelemetrySource = 'auto' | 'bridge' | 'explicit' | 'system';

export type TelemetryPrimitive = string | number | boolean;

export type TelemetryProps = Record<string, TelemetryPrimitive>;

export type LinkKind =
  | 'internal'
  | 'external'
  | 'hash'
  | 'mailto'
  | 'tel'
  | 'other';

export type WebVitalName = 'TTFB' | 'FCP' | 'LCP' | 'INP' | 'CLS';

export type WebVitalRating = 'good' | 'needs-improvement' | 'poor';

export interface TelemetryEventPropsMap {
  // Navigation
  'nav.route-view': {
    /** Locale-relative pathname (the envelope carries the localized path). */
    route: string;
  };
  'nav.link-click': {
    kind: LinkKind;
    /** Omitted for `mailto:`/`tel:`, whose path would carry the address. */
    path?: string;
    section?: TelemetrySection;
    slot?: string;
    /** Semantic label from `data-track` (e.g. `navigation:toc`). */
    trackKey?: string;
    /** Stable identity from `data-track-key`. */
    key?: string;
    /** Accessible label (`data-track-label` > `aria-label` > `title`). */
    label?: string;
  };
  'nav.locale-change': {
    /** Locale the user switched to. */
    locale: string;
    /** Locale that was active before the switch. */
    from?: string;
    section?: TelemetrySection;
  };
  'nav.search-submit': { queryLength: number };

  // Impressions
  /** Emitted once an annotated element has been visible for 500 ms. */
  'impression.element': {
    key: string;
    section?: TelemetrySection;
    index?: number;
    ratio: number;
  };

  // UI interactions
  'ui.click': {
    slot: string;
    tag: string;
    section?: TelemetrySection;
    variant?: string;
    role?: string;
    /** Semantic label from `data-track` (e.g. `donation:tier`). */
    trackKey?: string;
    /** Stable identity from `data-track-key`. */
    key?: string;
    /**
     * Stable option value from `data-value` (e.g. a tier id). Named
     * `optionValue` so it cannot be confused with — or leak as — free-form
     * user input, which redaction strips.
     */
    optionValue?: string;
    /** Accessible label (`data-track-label` > `aria-label` > `title`). */
    label?: string;
  };
  'ui.dialog-open': { name: string; section?: TelemetrySection };
  'ui.dialog-close': { name: string; section?: TelemetrySection };
  'ui.toggle': {
    control: string;
    /** Omitted on sensitive sections, where the choice value is redacted. */
    checked?: boolean;
    section?: TelemetrySection;
    source?: string;
  };
  'ui.select': {
    control: string;
    /** Omitted on sensitive sections, where the choice value is redacted. */
    optionIndex?: number;
    /** Omitted on sensitive sections, where the choice value is redacted. */
    optionCount?: number;
    /** Stable option value (e.g. `yearly`), never free-form user input. */
    optionValue?: string;
    /** Post-update pressed/checked state for multi-select controls. */
    checked?: boolean;
    section?: TelemetrySection;
  };
  /** A select popup was opened, e.g. the language menu. */
  'ui.select-open': { control: string; section?: TelemetrySection };
  /** A range input changed. `valueBucket` is the filled range in 10 % steps. */
  'ui.slider': {
    control: string;
    /** Omitted on sensitive sections, where the choice value is redacted. */
    valueBucket?: number;
    section?: TelemetrySection;
  };
  'ui.modal-dismiss': Record<string, never>;
  'ui.copy': Record<string, never>;
  'ui.share': { channel: 'native' | 'modal'; surface?: TelemetrySection };

  // Forms & inputs
  'form.start': { form: string; fieldCount: number };
  'form.submit': { form: string; fieldCount: number };
  'form.submit-failed': {
    form: string;
    /** Comma-joined field names, capped by the capture layer. */
    invalidFields?: string;
  };
  'form.abandoned': { form: string; fieldCount: number; filledFields: number };
  'input.change': {
    field: string;
    kind: string;
    hasValue: boolean;
    lengthBucket: string;
    form?: string;
    section?: TelemetrySection;
  };
  'input.validation-failed': { field: string; form?: string };

  // Errors
  'error.unhandled': {
    message: string;
    source: string;
    line?: number;
    column?: number;
  };
  'error.promise-rejection': { message: string };
  'error.boundary': { boundary: string; message: string };
  'error.http': {
    resource: string;
    status: number;
    code: string;
    method: string;
  };
  'error.query': { queryKey: string; code: string; message: string };
  'error.media': { kind: string; path: string };

  // Session
  'session.start': {
    entryRoute: string;
    referrerKind: 'direct' | 'internal' | 'external';
    viewport: string;
  };
  'session.visibility': {
    state: 'visible' | 'hidden';
    visibleMs: number;
  };
  'session.scroll-depth': { pct: number };
  'session.end': {
    interactionCount: number;
    routeCount: number;
  };

  // Performance
  'perf.web-vital': {
    metric: WebVitalName;
    value: number;
    rating: WebVitalRating;
    navigationType: string;
    metricId: string;
    route: string;
  };

  // Disruptions (bridged from the app event bus)
  'disruption.context-menu': Record<string, never>;
  'disruption.dead-pixel': { isRainbow: boolean };
  'disruption.screensaver-maze': { passedSpecialCell: boolean };
  'disruption.screensaver-bounce': { isPerfectCorner: boolean };
  'disruption.exit-prompt': Record<string, never>;

  // Domain
  'commerce.plan-selected': { packageId: string };
  'marketing.wheel-spin': { prize: string };
  'marketing.newsletter-modal': Record<string, never>;
  'achievement.unlocked': { achievementId: string };
  'achievement.progress': { achievementId: string; progress: number };
  'support.bot-message': Record<string, never>;
  'admin.login': { usernameLength: number };
}

export type TelemetryEventName = keyof TelemetryEventPropsMap;

export interface InteractionEvent<
  TName extends TelemetryEventName = TelemetryEventName,
> {
  /** Unique id of this emission, useful for correlating console + bus copies. */
  id: string;
  name: TName;
  category: TelemetryCategory;
  timestamp: number;
  /** Ephemeral, per-tab identifier. Never persisted. */
  sessionId: string;
  /** Locale-prefixed pathname without query string or hash. */
  route: string;
  /**
   * Stable page identity declared by `PageLayout` (`home`, `article.single`,
   * …). Omitted on pages that do not declare a route alias.
   */
  routeAlias?: RouteAlias;
  locale: string;
  source: TelemetrySource;
  props: TelemetryEventPropsMap[TName];
  /**
   * Canonical place for a measured duration (form round trip, HTTP latency).
   * Prefer this over a per-event `*Ms` prop so sinks and collectors can treat
   * timings uniformly.
   */
  durationMs?: number;
}

export interface TelemetrySink {
  readonly name: string;
  handle(event: InteractionEvent): void;
  flush?(): void;
}

export interface TelemetryTrackerOptions {
  sinks: TelemetrySink[];
  enabled?: boolean;
  sampling?: Partial<Record<TelemetryCategory, number>>;
  dedupeWindowMs?: Partial<Record<TelemetryCategory, number>>;
  historySize?: number;
  now?: () => number;
  random?: () => number;
  createId?: () => string;
  createSessionId?: () => string;
}
