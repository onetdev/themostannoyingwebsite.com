import { useCallback } from 'react';

import { isBrowser } from '@maw/ui/utils';
import {
  getNotificationPermissionState,
  requestNotificationPermission,
} from '@/lib/utils/permission';

type UseSendNotificationProps = {
  autoRequest?: boolean;
};

const useSendNotification = ({
  autoRequest = false,
}: UseSendNotificationProps = {}) => {
  const send = useCallback(
    async (data: { title: string; body?: string; data?: unknown }) => {
      const permission = getNotificationPermissionState();
      if (!isBrowser()) {
        return false;
      }

      if (permission === 'default' && autoRequest) {
        await requestNotificationPermission();
      } else if (permission === 'denied') {
        console.warn(
          `[useSendNotification] Can't send notification because permission is "${permission}"`,
        );
        return false;
      }

      if (getNotificationPermissionState() !== 'granted') {
        console.warn(
          `[useSendNotification] Can't send notification because state is "${getNotificationPermissionState()}"`,
        );
        return false;
      }

      const registration = await navigator.serviceWorker.getRegistration();
      await registration?.showNotification(data.title, {
        body: data.body,
        icon: '/manifest/android-chrome-256x256.png',
        data: data.data,
        tag: 'push-notification',
      });
    },
    [autoRequest],
  );

  return { send };
};

export default useSendNotification;
