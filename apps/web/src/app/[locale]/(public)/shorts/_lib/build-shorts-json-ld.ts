import type { ShortVideoListItem } from '@maw/content-sdk';
import { getTranslations } from 'next-intl/server';
import {
  buildSimpleItemList,
  buildWebPage,
  getSeoContext,
  type JsonLdNode,
} from '@/core/seo';
import { shortsPagination } from './shorts-pagination';

export interface BuildShortsJsonLdInput {
  locale: AppLocale;
  page: number;
  shorts: ShortVideoListItem[];
  offset: number;
}

/**
 * Describes the shorts archive as a CollectionPage with an ItemList covering
 * the clips on the current page.
 */
export async function buildShortsJsonLd({
  locale,
  page,
  shorts,
  offset,
}: BuildShortsJsonLdInput): Promise<JsonLdNode[]> {
  const [seoContext, t, navigation] = await Promise.all([
    getSeoContext(locale),
    getTranslations({ locale, namespace: 'metadata.shorts' }),
    getTranslations({ locale, namespace: 'common.navigation' }),
  ]);
  const isFirstPage = page === 1;
  const path = shortsPagination.getPath(page).replace(/^\//, '');
  const title = isFirstPage ? t('title') : t('pageTitle', { page });

  const webPage = buildWebPage({
    ...seoContext,
    path,
    name: title,
    description: t('description'),
    type: 'CollectionPage',
    breadcrumbs: [
      { name: navigation('home'), path: '' },
      { name: t('title'), path: 'shorts' },
      ...(isFirstPage ? [] : [{ name: title, path }]),
    ],
  });

  const itemList = buildSimpleItemList({
    ...seoContext,
    path,
    name: title,
    description: t('description'),
    items: shorts.map((short) => ({
      name: short.title,
      path: `shorts/${short.slug}`,
    })),
    startPosition: offset,
  });

  return [webPage, itemList];
}
