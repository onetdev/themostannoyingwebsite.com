import type { ArticleListItem } from '@maw/content-sdk';
import { getTranslations } from 'next-intl/server';
import {
  buildSimpleItemList,
  buildWebPage,
  getSeoContext,
  type JsonLdNode,
} from '@/core/seo';
import { articlesPagination } from './articles-pagination';

export interface BuildArticlesJsonLdInput {
  locale: AppLocale;
  page: number;
  articles: ArticleListItem[];
  offset: number;
}

/**
 * Describes the archive as a `CollectionPage` with an `ItemList` covering the
 * articles on the current page. `startPosition` keeps `ListItem.position`
 * absolute across pages instead of restarting at 1.
 */
export async function buildArticlesJsonLd({
  locale,
  page,
  articles,
  offset,
}: BuildArticlesJsonLdInput): Promise<JsonLdNode[]> {
  const [seoContext, t, navigation] = await Promise.all([
    getSeoContext(locale),
    getTranslations({ locale, namespace: 'metadata.articles' }),
    getTranslations({ locale, namespace: 'common.navigation' }),
  ]);

  const path = articlesPagination.getPath(page).replace(/^\//, '');
  const isFirstPage = page === 1;
  const pageTitle = isFirstPage ? t('title') : t('pageTitle', { page });

  const webPage = buildWebPage({
    ...seoContext,
    path,
    name: pageTitle,
    description: t('description'),
    type: 'CollectionPage',
    breadcrumbs: [
      { name: navigation('home'), path: '' },
      { name: t('title'), path: 'articles' },
      ...(isFirstPage ? [] : [{ name: pageTitle, path }]),
    ],
  });

  const itemList = buildSimpleItemList({
    ...seoContext,
    path,
    name: pageTitle,
    description: t('description'),
    items: articles.map((article) => ({
      name: article.title,
      path: `articles/${article.slug}`,
    })),
    startPosition: offset,
  });

  return [webPage, itemList];
}
