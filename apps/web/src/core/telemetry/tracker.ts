import {
  CATEGORY_DEDUPE_WINDOW_MS,
  CATEGORY_SAMPLING,
  getCategory,
} from './catalog';
import { safePath, sanitizeProps } from './redact';
import type {
  InteractionEvent,
  TelemetryCategory,
  TelemetryEventName,
  TelemetryEventPropsMap,
  TelemetryProps,
  TelemetrySink,
  TelemetrySource,
  TelemetryTrackerOptions,
} from './types';

const DEFAULT_HISTORY_SIZE = 200;

export interface TrackOptions {
  source?: TelemetrySource;
  durationMs?: number;
  /** Explicit key for `trackOnce`; defaults to the event name. */
  onceKey?: string;
  skipSampling?: boolean;
  skipDedupe?: boolean;
}

let fallbackSequence = 0;

/**
 * Ids never carry meaning and are not security tokens, but they must not use
 * `Math.random` either (CodeQL flags it as insecure randomness). Prefer a
 * UUID and fall back to a monotonic counter when Web Crypto is unavailable.
 */
function createDefaultId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID();
  }
  fallbackSequence += 1;
  return `${Date.now().toString(36)}-${fallbackSequence.toString(36)}`;
}

/**
 * Cryptographic RNG for sampling. Without Web Crypto the tracker keeps every
 * event instead of falling back to a predictable source.
 */
function readRandom(): number {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.getRandomValues === 'function') {
    const buffer = new Uint32Array(1);
    cryptoApi.getRandomValues(buffer);
    return (buffer[0] ?? 0) / 0x1_0000_0000;
  }
  return 0;
}

function readRoute(): string {
  if (typeof window === 'undefined') {
    return 'server';
  }
  return safePath(window.location.pathname);
}

function readLocale(): string {
  if (typeof document === 'undefined') {
    return 'unknown';
  }
  return document.documentElement.lang || 'unknown';
}

/**
 * Central, sink-agnostic interaction tracker.
 *
 * `track()` is the only write API. It builds a complete envelope, applies
 * redaction/sampling/dedupe, keeps a bounded in-memory history, and fans the
 * event out to every sink.
 */
export class TelemetryTracker {
  private readonly sinks: TelemetrySink[];
  private readonly history: InteractionEvent[];
  private readonly historySize: number;
  private readonly sampling: Partial<Record<TelemetryCategory, number>>;
  private readonly dedupeWindows: Partial<Record<TelemetryCategory, number>>;
  private readonly now: () => number;
  private readonly random: () => number;
  private readonly createId: () => string;
  private readonly sessionId: string;
  private readonly onceKeys = new Set<string>();
  private readonly dedupeTimestamps = new Map<string, number>();

  private enabled: boolean;
  private interactionCount = 0;

  constructor(options: TelemetryTrackerOptions) {
    this.sinks = options.sinks;
    this.enabled = options.enabled ?? true;
    this.historySize = options.historySize ?? DEFAULT_HISTORY_SIZE;
    this.sampling = options.sampling ?? CATEGORY_SAMPLING;
    this.dedupeWindows = options.dedupeWindowMs ?? CATEGORY_DEDUPE_WINDOW_MS;
    this.now = options.now ?? Date.now;
    this.random = options.random ?? readRandom;
    this.createId = options.createId ?? createDefaultId;
    this.sessionId = (options.createSessionId ?? createDefaultId)();
    this.history = [];
  }

  /** Typed emit for direct call sites. */
  public track = <TName extends TelemetryEventName>(
    name: TName,
    props: TelemetryEventPropsMap[TName],
    options: TrackOptions = {},
  ): InteractionEvent | undefined =>
    this.emitEvent(name, props as TelemetryProps, options);

  /**
   * Untyped emit for bridges that already validate their mapping. Props are
   * still sanitised and truncated before reaching any sink.
   */
  public trackDynamic = (
    name: TelemetryEventName,
    props: Record<string, unknown>,
    options: TrackOptions = {},
  ): InteractionEvent | undefined => this.emitEvent(name, props, options);

  /** Emits at most once per key until the next route change. */
  public trackOnce = <TName extends TelemetryEventName>(
    onceKey: string,
    name: TName,
    props: TelemetryEventPropsMap[TName],
    options: TrackOptions = {},
  ): InteractionEvent | undefined => {
    if (this.onceKeys.has(onceKey)) {
      return undefined;
    }
    this.onceKeys.add(onceKey);
    return this.emitEvent(name, props as TelemetryProps, options);
  };

  public getHistory = (): readonly InteractionEvent[] => [...this.history];

  public getSessionId = (): string => this.sessionId;

  public getInteractionCount = (): number => this.interactionCount;

  public setEnabled = (enabled: boolean): void => {
    this.enabled = enabled;
  };

  public isEnabled = (): boolean => this.enabled;

  /** Clears per-route dedupe/once state (called on navigation). */
  public notifyRouteChange = (): void => {
    this.onceKeys.clear();
    this.dedupeTimestamps.clear();
  };

  public flush = (): void => {
    for (const sink of this.sinks) {
      sink.flush?.();
    }
  };

  public reset = (): void => {
    this.history.length = 0;
    this.interactionCount = 0;
    this.onceKeys.clear();
    this.dedupeTimestamps.clear();
  };

  private emitEvent = (
    name: TelemetryEventName,
    props: Record<string, unknown>,
    options: TrackOptions,
  ): InteractionEvent | undefined => {
    // The tracker is imported by shared modules (e.g. `HttpClient`) that also
    // run on the server. Server emissions have no session, no route and no
    // sinks worth writing to, so they are dropped instead of pretending.
    if (!this.enabled || typeof window === 'undefined') {
      return undefined;
    }

    const category = getCategory(name);
    const sanitized = sanitizeProps(props);

    if (!options.skipSampling && !this.passesSampling(category)) {
      return undefined;
    }

    const route = readRoute();
    const timestamp = this.now();

    if (
      !options.skipDedupe &&
      this.isDuplicate(category, name, sanitized, timestamp)
    ) {
      return undefined;
    }

    const event = {
      id: this.createId(),
      name,
      category,
      timestamp,
      sessionId: this.sessionId,
      route,
      locale: readLocale(),
      source: options.source ?? 'auto',
      props: sanitized,
      ...(options.durationMs === undefined
        ? {}
        : { durationMs: Math.round(options.durationMs) }),
    } as InteractionEvent;

    this.interactionCount += 1;
    this.pushHistory(event);
    this.dispatch(event);

    return event;
  };

  private passesSampling = (category: TelemetryCategory): boolean => {
    const ratio = this.sampling[category];
    if (ratio === undefined || ratio >= 1) {
      return true;
    }
    if (ratio <= 0) {
      return false;
    }
    return this.random() < ratio;
  };

  private isDuplicate = (
    category: TelemetryCategory,
    name: TelemetryEventName,
    sanitizedProps: TelemetryProps,
    timestamp: number,
  ): boolean => {
    const windowMs = this.dedupeWindows[category];
    if (!windowMs) {
      return false;
    }

    const key = `${name}|${readRoute()}|${JSON.stringify(sanitizedProps)}`;
    const previous = this.dedupeTimestamps.get(key);

    if (previous !== undefined && timestamp - previous < windowMs) {
      return true;
    }

    this.dedupeTimestamps.set(key, timestamp);
    return false;
  };

  private pushHistory = (event: InteractionEvent): void => {
    this.history.unshift(event);
    if (this.history.length > this.historySize) {
      this.history.length = this.historySize;
    }
  };

  private dispatch = (event: InteractionEvent): void => {
    for (const sink of this.sinks) {
      try {
        sink.handle(event);
      } catch {
        // A broken sink must never break the app (or the other sinks).
      }
    }
  };
}
