import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import i18nConfig from '@/root/i18n.config';
import { articlesPagination } from './articles-pagination';

export interface BuildArticlesMetadataInput {
  locale: AppLocale;
  page: number;
}

const buildLocalizedPath = (locale: string, page: number) =>
  `/${locale}${articlesPagination.getPath(page)}/`;

/**
 * Builds metadata for one archive page.
 *
 * Page 1 advertises every locale because it always exists. Deeper pages only
 * declare a self-canonical: archives can have different lengths per locale, so
 * emitting `hreflang` for a page that does not exist elsewhere would point
 * crawlers at 404s.
 */
export async function buildArticlesMetadata({
  locale,
  page,
}: BuildArticlesMetadataInput): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'metadata.articles',
  });
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
    },
  };
}
