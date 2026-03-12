import { useEffect, useRef } from 'react';
import { eventBus } from './event-bus';

export function useEvent<K extends keyof AppEvents>(
  type: K,
  handler: (payload: AppEvents[K]) => void,
  enabled = true,
) {
  const ref = useRef(handler);

  useEffect(() => {
    ref.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;
    return eventBus.on(type, (v) => ref.current(v.data as AppEvents[K]));
  }, [type, enabled]);
}
