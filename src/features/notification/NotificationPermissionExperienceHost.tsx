'use client';

import { FunctionComponent, useRef, useState } from 'react';

import ManualModal from './components/ManualModal';

import useScrollDistanceTrigger from '@/hooks/useScrollDistanceTrigger';
import { useUserGrantsStore } from '@/state/user_grants';
import { getNotificationPermissionState } from '@/utils/permission';

export type NotificationPermissionExperienceHostProps = {
  scrollDistanceTrigger?: number;
};
const NotificationPermissionExperienceHost: FunctionComponent<
  NotificationPermissionExperienceHostProps
> = ({ scrollDistanceTrigger = 400 }) => {
  const initialState = useRef(getNotificationPermissionState()).current;
  useScrollDistanceTrigger({
    threshold: scrollDistanceTrigger,
    onTrigger: () => enterFlow(),
  });
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);

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

  return (
    <ManualModal
      visible={manualModalVisible}
      onDismiss={onManualModalDismiss}
    />
  );
};

export default NotificationPermissionExperienceHost;
