/**
 * @jest-environment jsdom
 */
import { TelemetryTracker } from './tracker';
import type { InteractionEvent, TelemetrySink } from './types';

function createMemorySink(): TelemetrySink & { events: InteractionEvent[] } {
  const events: InteractionEvent[] = [];
  return {
    name: 'memory',
    events,
    handle(event) {
      events.push(event);
    },
  };
}

function createTracker(options?: {
  sinks?: TelemetrySink[];
  enabled?: boolean;
  random?: () => number;
}) {
  let sequence = 0;
  return new TelemetryTracker({
    sinks: options?.sinks ?? [],
    enabled: options?.enabled,
    now: () => 1_000,
    random: options?.random,
    createId: () => `id-${++sequence}`,
    createSessionId: () => 'session-1',
  });
}

describe('TelemetryTracker', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/en/articles/test/');
    document.documentElement.lang = 'en';
  });

  it('builds a complete envelope and sanitises props', () => {
    const sink = createMemorySink();
    const tracker = createTracker({ sinks: [sink] });

    tracker.track('ui.click', {
      slot: 'button',
      tag: 'button',
      section: 'article',
      variant: 'default',
    });

    expect(sink.events).toHaveLength(1);
    expect(sink.events[0]).toEqual({
      id: 'id-1',
      name: 'ui.click',
      category: 'ui',
      timestamp: 1_000,
      sessionId: 'session-1',
      route: '/en/articles/test/',
      locale: 'en',
      source: 'auto',
      props: {
        slot: 'button',
        tag: 'button',
        section: 'article',
        variant: 'default',
      },
    });
  });

  it('strips sensitive props and scrubs free-form values', () => {
    const sink = createMemorySink();
    const tracker = createTracker({ sinks: [sink] });

    tracker.trackDynamic('error.unhandled', {
      message: 'Failed for user@example.com from https://x.test/?t=1',
      source: '/app.js',
      route: '/en/',
      password: 'hunter2',
      nested: { secret: true },
    });

    expect(sink.events[0]?.props).toEqual({
      message: 'Failed for [email] from [url]',
      source: '/app.js',
      route: '/en/',
    });
  });

  it('drops duplicate ui clicks inside the dedupe window', () => {
    const sink = createMemorySink();
    const tracker = createTracker({ sinks: [sink] });

    tracker.track('ui.click', { slot: 'button', tag: 'button' });
    tracker.track('ui.click', { slot: 'button', tag: 'button' });

    expect(sink.events).toHaveLength(1);
  });

  it('emits at most once per key until the route changes', () => {
    const sink = createMemorySink();
    const tracker = createTracker({ sinks: [sink] });

    tracker.trackOnce('hero', 'impression.element', {
      key: 'hero',
      ratio: 1,
      visibleMs: 500,
    });
    tracker.trackOnce('hero', 'impression.element', {
      key: 'hero',
      ratio: 1,
      visibleMs: 500,
    });

    expect(sink.events).toHaveLength(1);

    tracker.notifyRouteChange();
    tracker.trackOnce('hero', 'impression.element', {
      key: 'hero',
      ratio: 1,
      visibleMs: 500,
    });

    expect(sink.events).toHaveLength(2);
  });

  it('applies category sampling', () => {
    const sink = createMemorySink();
    const tracker = createTracker({ sinks: [sink], random: () => 0.9 });

    tracker.track('perf.web-vital', {
      metric: 'LCP',
      value: 1200,
      rating: 'good',
      navigationType: 'navigate',
      metricId: 'v1',
      route: '/en/',
    });
    tracker.track('error.unhandled', {
      message: 'boom',
      source: '/app.js',
      route: '/en/',
    });

    expect(sink.events.map((event) => event.name)).toEqual(['error.unhandled']);
  });

  it('does nothing while disabled', () => {
    const sink = createMemorySink();
    const tracker = createTracker({ sinks: [sink], enabled: false });

    tracker.track('ui.copy', {});

    expect(sink.events).toHaveLength(0);
    expect(tracker.getHistory()).toHaveLength(0);
  });

  it('keeps a bounded history and survives throwing sinks', () => {
    const tracker = new TelemetryTracker({
      sinks: [
        {
          name: 'broken',
          handle() {
            throw new Error('sink exploded');
          },
        },
        createMemorySink(),
      ],
      historySize: 2,
    });
    // The broken sink must not prevent dispatch or history.
    expect(() => tracker.track('ui.copy', {})).not.toThrow();
    tracker.track('ui.share', { channel: 'native' });
    tracker.track('ui.share', { channel: 'email' });

    expect(tracker.getHistory()).toHaveLength(2);
    expect(tracker.getHistory()[0]?.props).toEqual({ channel: 'email' });
  });
});
