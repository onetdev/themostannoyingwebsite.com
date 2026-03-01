import { useEffect } from 'react';
import { eventBus } from '@/eventBus';

export function useAllEvents(
  handler: <K extends keyof AppEvents>(type: K, payload: AppEvents[K]) => void,
) {
  useEffect(() => eventBus.onAny(handler), [handler]);
}
