import type { TelemetrySink } from '../types';
import { createBeaconSink } from './beacon';
import { createBusSink } from './bus';
import { createConsoleSink } from './console';
import { createSentrySink } from './sentry';

const isProduction = process.env.NODE_ENV === 'production';

function isConsoleEnabled(): boolean {
  if (!isProduction) {
    return true;
  }
  return process.env.NEXT_PUBLIC_TELEMETRY_CONSOLE === 'true';
}

/**
 * Default sink composition:
 * - bus: always (feeds `/debug` and any in-app listener)
 * - sentry: always (breadcrumbs, allowlisted categories only)
 * - console: development (or `NEXT_PUBLIC_TELEMETRY_CONSOLE=true`)
 * - beacon: only when `NEXT_PUBLIC_TELEMETRY_BEACON_URL` is configured
 */
export function createDefaultSinks(): TelemetrySink[] {
  const sinks: TelemetrySink[] = [createBusSink(), createSentrySink()];

  if (isConsoleEnabled()) {
    sinks.push(createConsoleSink());
  }

  const beacon = createBeaconSink(process.env.NEXT_PUBLIC_TELEMETRY_BEACON_URL);
  if (beacon) {
    sinks.push(beacon);
  }

  return sinks;
}
