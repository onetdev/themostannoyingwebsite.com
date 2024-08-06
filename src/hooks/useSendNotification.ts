import { useCallback } from 'react';

import config from '@/config';

type Props = {
  autoRequest?: boolean;
};
const useSendNotification = ({ autoRequest = false }: Props = {}) => {
  const send = useCallback(
    async (data: { title: string; body?: string; data?: unknown }) => {
      const permission = Notification.permission;
      if (!config.isBrowser) {
        return false;
      }

      if (permission === 'default' && autoRequest) {
        await Notification.requestPermission();
      }

      const result = new Notification(data.title, {
        body: data.body,
        icon: '/manifest/android-chrome-256x256.png',
        data: data.data,
      });

      console.log('YO', result);
    },
    [autoRequest],
  );

  return { send };
};

export default useSendNotification;
