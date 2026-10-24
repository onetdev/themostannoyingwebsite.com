import { emit } from '@/core/events/event-bus';
import type { InteractionEvent, TelemetrySink } from '../types';

/**
 * Mirrors events onto the global app event bus as `telemetry:event`.
 *
 * This is what makes the existing `/debug` event history (and any future
 * listener) show the interaction stream without subscribing to tracker
 * internals.
 */
export function createBusSink(): TelemetrySink {
  return {
    name: 'bus',
    handle(event: InteractionEvent) {
      // Emittery returns a promise; a rejecting listener must not surface as an
      // unhandled rejection (which the tracker would then report back into the
      // bus).
      void Promise.resolve(emit('telemetry:event', event)).catch(() => {});
    },
  };
}
