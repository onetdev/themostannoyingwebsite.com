'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { syncLocationPermission } from '@/redux/slices/consent';
import { getNotificationPermissionState } from '@/utils/permission';

import ManualModal from './ManualModal';

export type NotificationPermissionExperienceProps = {
  // the number of scroll events triggered on a page until notification
  // permission is requested. 0 makes it instant on pageload.
  scrollCountTriggerThreshold?: number;
};
const NotificationPermissionExperience: FunctionComponent<
  NotificationPermissionExperienceProps
> = ({ scrollCountTriggerThreshold = 0 }) => {
  const initialState = useRef(getNotificationPermissionState()).current;
  const [scrollCount, setScrollCount] = useState(0);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const shouldEnterFlow =
    initialState === 'default' && scrollCount >= scrollCountTriggerThreshold;

  const onScroll = () => setScrollCount((prev) => prev + 1);
  const onManualModalDismiss = () => {
    setManualModalVisible(false);
    dispatch(syncLocationPermission());
  };
  const enterFlow = async () => {
    const result = await Notification.requestPermission();
    if (result === 'denied') {
      setManualModalVisible(true);
    }
  };

  useEffect(() => {
    if (shouldEnterFlow) {
      enterFlow();
      return;
    }

    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [shouldEnterFlow]);

  return (
    <ManualModal
      visible={manualModalVisible}
      onDismiss={onManualModalDismiss}
    />
  );
};

export default NotificationPermissionExperience;
