import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import config from '@/core/config';
import i18nConfig from '@/root/i18n.config';
import { shortsPagination } from './shorts-pagination';

export interface BuildShortsMetadataInput {
  locale: AppLocale;
  page: number;
}

const buildLocalizedPath = (locale: string, page: number) =>
  `/${locale}${shortsPagination.getPath(page)}/`;

/**
 * Metadata for the shorts archive.
 *
 * Page 1 advertises every locale because it always exists. Deeper pages only
 * declare a self-canonical: archives can have different lengths per locale, so
 * emitting `hreflang` for a page that does not exist elsewhere would point
 * crawlers at 404s.
 */
export async function buildShortsMetadata({
  locale,
  page,
}: BuildShortsMetadataInput): Promise<Metadata> {
  const [t, tApp] = await Promise.all([
    getTranslations({
      locale,
      namespace: 'metadata.shorts',
    }),
    getTranslations({
      locale,
      namespace: 'metadata.app',
    }),
  ]);
  const isFirstPage = page === 1;
  const title = isFirstPage ? t('title') : t('pageTitle', { page });
  const canonical = buildLocalizedPath(locale, page);

  const languages = isFirstPage
    ? Object.fromEntries(
        i18nConfig.locales.map((lang) => [
          lang,
          buildLocalizedPath(lang, page),
        ]),
      )
    : undefined;

  return {
    title,
    description: t('description'),
    alternates: {
      canonical,
      ...(languages
        ? {
            languages: {
              ...languages,
              'x-default': buildLocalizedPath(i18nConfig.defaultLocale, page),
            },
          }
        : {}),
    },
    openGraph: {
      title,
      description: t('description'),
      type: 'website',
      siteName: tApp('title'),
      url: canonical,
      images: [config.common.assets.socialImage],
    },
  };
}
