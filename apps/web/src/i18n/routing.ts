import { defineRouting } from 'next-intl/routing';

import i18nConfig from '@/root/apps/web/i18n.config';

export const routing = defineRouting({
  ...i18nConfig,
});

export function generateStaticParams() {
  const locales = i18nConfig.locales;
  const paths: NextPageParams[] = locales.map((locale) => ({ locale }));
  return paths;
}
