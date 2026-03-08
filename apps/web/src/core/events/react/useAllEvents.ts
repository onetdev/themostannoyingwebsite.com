import type { EventDataPair } from 'emittery';
import { useEffect } from 'react';
import { eventBus } from '@/core/events/event-bus';

export function useAllEvents(
  handler: (event: EventDataPair<AppEvents, keyof AppEvents>) => void,
) {
  useEffect(() => eventBus.onAny(handler), [handler]);
}
