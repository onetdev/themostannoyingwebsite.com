import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import i18nConfig from '@/root/i18n.config';

/**
 * Metadata for the shorts archive. The archive path is identical across
 * locales, so only the locale prefix differs.
 */
export async function buildShortsMetadata(
  locale: AppLocale,
): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'metadata.shorts',
  });
  const languages = Object.fromEntries(
    i18nConfig.locales.map((lang) => [lang, `/${lang}/shorts/`]),
  );

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/shorts/`,
      languages: {
        ...languages,
        'x-default': `/${i18nConfig.defaultLocale}/shorts/`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}
