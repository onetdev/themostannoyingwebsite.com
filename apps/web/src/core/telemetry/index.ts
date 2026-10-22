import { CATEGORY_SAMPLING } from './catalog';
import { createDefaultSinks } from './sinks';
import { TelemetryTracker } from './tracker';

const isProduction = process.env.NODE_ENV === 'production';
const isDisabled = process.env.NEXT_PUBLIC_TELEMETRY_DISABLED === 'true';

/**
 * Application-wide tracker. Sinks are keyed by environment:
 * development prints every event to the console, production keeps Sentry
 * breadcrumbs (and an opt-in first-party beacon).
 */
export const telemetry = new TelemetryTracker({
  sinks: createDefaultSinks(),
  enabled: !isDisabled,
  sampling: isProduction ? CATEGORY_SAMPLING : {},
});

export const { track, trackDynamic, trackOnce } = telemetry;

export { bucketLength, safePath, scrubMessage } from './redact';
export type { TrackOptions } from './tracker';
export { TelemetryTracker } from './tracker';
export type {
  InteractionEvent,
  LinkKind,
  TelemetryCategory,
  TelemetryEventName,
  TelemetryEventPropsMap,
  TelemetryProps,
  TelemetrySink,
  TelemetrySource,
} from './types';
