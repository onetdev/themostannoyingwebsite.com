'use client';

import { useAllEvents } from '@/core/react';
import { useMonitoringStore } from '@/features/monitoring/stores';

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
