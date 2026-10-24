import type { ArticleListItem } from '@maw/content-sdk';
import { cache } from 'react';
import { getDependencyContainer } from '@/core/di';
import { getArticleService } from '@/features/content/services';
import { articlesPagination } from './articles-pagination';

export interface LoadArticlesPageInput {
  locale: AppLocale;
  page: number;
}

export interface ArticlesPageData {
  items: ArticleListItem[];
  total: number;
  pageCount: number;
  offset: number;
}

/**
 * Loads one archive page plus the total needed to render pagination. Returns
 * `undefined` when the requested page is beyond the available range.
 *
 * Wrapped in React `cache()` so `generateMetadata` and the page share a single
 * Content API request per render.
 */
export const loadArticlesPage = cache(
  async ({
    locale,
    page,
  }: LoadArticlesPageInput): Promise<ArticlesPageData | undefined> => {
    const articleService = getArticleService(getDependencyContainer());
    const offset = articlesPagination.getOffset(page);
    const response = await articleService.list({
      lang: locale,
      limit: articlesPagination.pageSize,
      offset,
      order: 'desc',
    });
    const pageCount = articlesPagination.getPageCount(response.total);

    if (page > pageCount) {
      return undefined;
    }

    return {
      items: response.items,
      total: response.total,
      pageCount,
      offset,
    };
  },
);
