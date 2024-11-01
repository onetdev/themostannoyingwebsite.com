import 'i18next';

import chatBubble from '@/public/locales/en/chat_bubble.json';
import common from '@/public/locales/en/common.json';
import contentLimiter from '@/public/locales/en/content_limiter.json';
import notifications from '@/public/locales/en/notifications.json';
import settings from '@/public/locales/en/settings.json';
import wheelOfFortune from '@/public/locales/en/wheel_of_fortune.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      chat_bubble: typeof chatBubble;
      common: typeof common;
      content_limiter: typeof contentLimiter;
      notifications: typeof notifications;
      settings: typeof settings;
      wheel_of_fortune: typeof wheelOfFortune;
    };
  }
}
