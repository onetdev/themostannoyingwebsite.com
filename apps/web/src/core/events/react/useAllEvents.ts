'use client';

import { useEffect } from 'react';
import { eventBus } from '@/core/events/event-bus';

// Derived from the emitter itself because `emittery` no longer exports the
// `EventDataPair` helper that previously described this listener payload.
type AppEventListener = Parameters<typeof eventBus.onAny>[0];

export function useAllEvents(handler: AppEventListener) {
  useEffect(() => eventBus.onAny(handler), [handler]);
}
