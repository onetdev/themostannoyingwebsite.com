import { getLogger } from '@maw/logger';
import type { InteractionEvent, TelemetrySink } from '../types';

const logger = getLogger().getSubLogger({ name: 'interaction' });

/**
 * Human-readable sink for local development. Every event prints as a single
 * log line so the browser console stays filterable by `[interaction]`.
 */
export function createConsoleSink(): TelemetrySink {
  return {
    name: 'console',
    handle(event: InteractionEvent) {
      const duration =
        event.durationMs === undefined ? '' : ` ${event.durationMs}ms`;
      logger.info(`[interaction] ${event.name}${duration}`, event.props);
    },
  };
}
