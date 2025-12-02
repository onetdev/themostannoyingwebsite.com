'use client';

import { useRef, useState } from 'react';

import { ManualModal } from './components';

import useScrollDistanceTrigger from '@/hooks/useScrollDistanceTrigger';
import { useExperienceFlagsStore, useUserGrantsStore } from '@/kernel';
import {
  getNotificationPermissionState,
  requestNotificationPermission,
} from '@/utils/permission';

export type NotificationPermissionExperienceHostProps = {
  scrollDistanceTrigger?: number;
};
export function NotificationPermissionExperienceHost({
  scrollDistanceTrigger = 400,
}: NotificationPermissionExperienceHostProps) {
  const initialState = useRef(getNotificationPermissionState()).current;
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const enabled = useExperienceFlagsStore((state) => state.notifications);
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
