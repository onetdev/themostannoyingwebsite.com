import 'i18next';

import chatBubble from '@/public/locales/en/chat_bubble.json';
import common from '@/public/locales/en/common.json';
import gifts from '@/public/locales/en/gifts.json';
import notifications from '@/public/locales/en/notifications.json';
import settings from '@/public/locales/en/settings.json';
import wheelOfFortune from '@/public/locales/en/wheel_of_fortune.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      chat_bubble: typeof chatBubble;
      common: typeof common;
      gifts: typeof gifts;
      notifications: typeof notifications;
      settings: typeof settings;
      wheel_of_fortune: typeof wheelOfFortune;
    };
  }
}
