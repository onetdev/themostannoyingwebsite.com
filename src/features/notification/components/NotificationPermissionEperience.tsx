'use client';

import { FunctionComponent, useRef, useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { syncPermissions } from '@/redux/slices/consent';
import { getNotificationPermissionState } from '@/utils/permission';
import useScrollDistanceTrigger from '@/hooks/useScrollDistanceTrigger';

import ManualModal from './ManualModal';

export type NotificationPermissionExperienceProps = {
  scrollDistanceTrigger?: number;
};
const NotificationPermissionExperience: FunctionComponent<
  NotificationPermissionExperienceProps
> = ({ scrollDistanceTrigger = 200 }) => {
  const initialState = useRef(getNotificationPermissionState()).current;
  useScrollDistanceTrigger({
    threshold: scrollDistanceTrigger,
    onTrigger: () => enterFlow(),
  });
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const enterFlow = async () => {
    if (initialState !== 'default') {
      return;
    }

    const result = await Notification.requestPermission();
    dispatch(syncPermissions());
    if (result === 'denied') {
      setManualModalVisible(true);
    }
  };

  const onManualModalDismiss = () => {
    setManualModalVisible(false);
    dispatch(syncPermissions());
  };

  return (
    <ManualModal
      visible={manualModalVisible}
      onDismiss={onManualModalDismiss}
    />
  );
};

export default NotificationPermissionExperience;
