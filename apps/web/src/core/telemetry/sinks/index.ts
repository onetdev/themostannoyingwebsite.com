import type { TelemetrySink } from '../types';
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
 *
 * A first-party collector is deliberately out of scope for ADR 37: shipping a
 * transport without an ingest endpoint, consent grant, and retention policy
 * would be a privacy liability. See the ADR's "Transport" section.
 */
export function createDefaultSinks(): TelemetrySink[] {
  const sinks: TelemetrySink[] = [createBusSink(), createSentrySink()];

  if (isConsoleEnabled()) {
    sinks.push(createConsoleSink());
  }

  return sinks;
}
