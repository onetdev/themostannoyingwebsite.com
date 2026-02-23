'use client';

import { useRef, useState } from 'react';

import { ManualModal } from './components';

import { useScrollDistanceTrigger } from '@/core';
import {
  getNotificationPermissionState,
  requestNotificationPermission,
} from '@/core/infrastructure/utils/permission';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';

export type NotificationPermissionHostProps = {
  scrollDistanceTrigger?: number;
};
export function NotificationPermissionHost({
  scrollDistanceTrigger = 400,
}: NotificationPermissionHostProps) {
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
    <ManualModal
      visible={manualModalVisible}
      onDismiss={onManualModalDismiss}
    />
  );
}
