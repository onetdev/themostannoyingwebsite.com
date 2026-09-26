import { getTranslations } from 'next-intl/server';
import config from '@/core/config';

export interface SeoContext {
  baseUrl: string;
  locale: AppLocale;
  siteName: string;
  description: string;
}

/**
 * Resolves the site-wide values (base URL and app-level name/description) used
 * to build structured data for a given locale.
 */
export async function getSeoContext(locale: AppLocale): Promise<SeoContext> {
  const t = await getTranslations({ locale, namespace: 'metadata.app' });

  return {
    baseUrl: config.deploymentMeta.publicUrl,
    locale,
    siteName: t('title'),
    description: t('description'),
  };
}
