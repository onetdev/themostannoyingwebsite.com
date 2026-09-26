import { getTranslations } from 'next-intl/server';
import config from '@/core/config';
import i18nConfig from '@/root/i18n.config';

export interface SeoContext {
  baseUrl: string;
  locale: AppLocale;
  siteName: string;
  description: string;
  /**
   * Locale-independent brand name for the `Organization` node.
   *
   * `Organization` is identified by a single locale-independent `@id`, so its
   * `name` must stay stable across locales even when the surrounding page copy
   * is translated. Resolved from the default locale.
   */
  organizationName: string;
}

/**
 * Resolves the site-wide values (base URL and app-level name/description) used
 * to build structured data for a given locale.
 */
export async function getSeoContext(locale: AppLocale): Promise<SeoContext> {
  const [t, tBrand] = await Promise.all([
    getTranslations({ locale, namespace: 'metadata.app' }),
    getTranslations({
      locale: i18nConfig.defaultLocale,
      namespace: 'metadata.app',
    }),
  ]);

  return {
    baseUrl: config.deploymentMeta.publicUrl,
    locale,
    siteName: t('title'),
    description: t('description'),
    organizationName: tBrand('title'),
  };
}
