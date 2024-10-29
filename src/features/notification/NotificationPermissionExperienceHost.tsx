'use client';

import { FunctionComponent, useRef, useState } from 'react';

import ManualModal from './components/ManualModal';

import useScrollDistanceTrigger from '@/hooks/useScrollDistanceTrigger';
import { useExperienceFlagsStore } from '@/state/experience_flags';
import { useUserGrantsStore } from '@/state/user_grants';
import { getNotificationPermissionState } from '@/utils/permission';

export type NotificationPermissionExperienceHostProps = {
  scrollDistanceTrigger?: number;
};
const NotificationPermissionExperienceHost: FunctionComponent<
  NotificationPermissionExperienceHostProps
> = ({ scrollDistanceTrigger = 400 }) => {
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

    const result = await Notification.requestPermission();
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
};

export default NotificationPermissionExperienceHost;
