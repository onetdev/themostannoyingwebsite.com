'use client';

import {
  getNotificationPermissionState,
  requestNotificationPermission,
} from '@maw/utils/browser';
import { useRef, useState } from 'react';

import { NotificationManualModal } from './NotificationManualModal';

import { useScrollDistanceTrigger } from '@/hooks';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';

export type NotificationRequestTriggerProps = {
  scrollDistanceTrigger?: number;
};
export function NotificationRequestTrigger({
  scrollDistanceTrigger = 400,
}: NotificationRequestTriggerProps) {
  const initialState = useRef(getNotificationPermissionState()).current;
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const enabled = usePainPreferencesStore((state) => state.flags.notifications);
  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);

  useScrollDistanceTrigger({
    threshold: scrollDistanceTrigger,
    onTrigger: () => enterFlow(),
  });

  const enterFlow = async () => {
    if (initialState !== 'default') {
      return;
    }

    const result = await requestNotificationPermission();
    syncPermissions();
    if (result === 'denied') {
      setManualModalVisible(true);
    }
  };

  const onManualModalDismiss = () => {
    setManualModalVisible(false);
    syncPermissions();
  };

  if (!enabled || !manualModalVisible) {
    return null;
  }

  return (
    <NotificationManualModal
      visible={manualModalVisible}
      onDismiss={onManualModalDismiss}
    />
  );
}
