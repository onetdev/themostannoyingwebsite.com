'use client';

import { useMonitoringStore } from '@/features/monitoring/stores';
import { useAllEvents } from '@/hooks';

export function useEventHistoryListener() {
  const isHistoryEnabled = useMonitoringStore(
    (state) => state.isEventHistoryEnabled,
  );
  const pushEventToHistory = useMonitoringStore(
    (state) => state.pushEventToHistory,
  );

  useAllEvents(({ name, data }) => {
    if (!isHistoryEnabled) {
      return;
    }
    pushEventToHistory(name, data as AppEvents[keyof AppEvents]);
  });
}
