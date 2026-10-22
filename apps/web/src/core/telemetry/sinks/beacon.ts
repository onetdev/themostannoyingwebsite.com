import { BEACON_CATEGORIES } from '../catalog';
import type { InteractionEvent, TelemetrySink } from '../types';

const MAX_BUFFER = 20;
const BEACON_VERSION = 1;

type BeaconEvent = Pick<
  InteractionEvent,
  | 'name'
  | 'category'
  | 'timestamp'
  | 'route'
  | 'locale'
  | 'props'
  | 'durationMs'
>;

interface BeaconEnvelope {
  v: number;
  sessionId: string;
  events: BeaconEvent[];
}

function toBeaconEvent(event: InteractionEvent): BeaconEvent {
  return {
    name: event.name,
    category: event.category,
    timestamp: event.timestamp,
    route: event.route,
    locale: event.locale,
    props: event.props,
    ...(event.durationMs === undefined ? {} : { durationMs: event.durationMs }),
  };
}

/**
 * First-party transport placeholder for real-user monitoring.
 *
 * Disabled unless `NEXT_PUBLIC_TELEMETRY_BEACON_URL` is configured. Sends a
 * JSON body with `text/plain` so `sendBeacon` stays a CORS-simple request;
 * the collector is expected to parse the body as JSON.
 *
 * Only aggregate/fault categories are forwarded (no impressions, no inputs).
 */
export function createBeaconSink(url?: string): TelemetrySink | null {
  if (!url || typeof window === 'undefined') {
    return null;
  }

  let buffer: InteractionEvent[] = [];

  const send = () => {
    if (buffer.length === 0) {
      return;
    }

    const envelope: BeaconEnvelope = {
      v: BEACON_VERSION,
      sessionId: buffer[0]?.sessionId ?? 'unknown',
      events: buffer.map(toBeaconEvent),
    };
    buffer = [];

    try {
      const body = JSON.stringify(envelope);
      if (typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
        navigator.sendBeacon(url, blob);
        return;
      }
      void fetch(url, {
        method: 'POST',
        body,
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });
    } catch {
      // Telemetry transport failures stay silent by design.
    }
  };

  window.addEventListener('pagehide', send);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      send();
    }
  });

  return {
    name: 'beacon',
    handle(event: InteractionEvent) {
      if (!BEACON_CATEGORIES.has(event.category)) {
        return;
      }
      buffer.push(event);
      if (buffer.length >= MAX_BUFFER) {
        send();
      }
    },
    flush: send,
  };
}
