import { useLogger } from '@maw/logger';
import { isBrowser } from '@maw/ui-lib/utils';
import { useCallback } from 'react';

import {
  getNotificationPermissionState,
  requestNotificationPermission,
} from '@/utils/permission';

type UseSendNotificationProps = {
  autoRequest?: boolean;
};

const useSendNotification = ({
  autoRequest = false,
}: UseSendNotificationProps = {}) => {
  const logger = useLogger().child({
    hook: 'useSendNotification',
  });

  const send = useCallback(
    async (data: { title: string; body?: string; data?: unknown }) => {
      const permission = getNotificationPermissionState();
      if (!isBrowser()) {
        return false;
      }

      if (permission === 'default' && autoRequest) {
        await requestNotificationPermission();
      } else if (permission === 'denied') {
        logger.warn(
          `[useSendNotification] Can't send notification because permission is "${permission}"`,
        );
        return false;
      }

      if (getNotificationPermissionState() !== 'granted') {
        logger.warn(
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
