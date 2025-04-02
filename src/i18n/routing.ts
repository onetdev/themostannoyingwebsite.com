import { defineRouting } from 'next-intl/routing';

import i18nConfig from '@/root/i18n.config';

export const routing = defineRouting({
  ...i18nConfig,
});
