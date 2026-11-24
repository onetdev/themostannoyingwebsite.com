import type { ShortVideoListItem } from '@maw/content-sdk';
import { cache } from 'react';
import { getDependencyContainer } from '@/core/di';
import { getShortVideoService } from '@/features/content/services';
import { shortsPagination } from './shorts-pagination';

export interface ShortsPageData {
  items: ShortVideoListItem[];
  total: number;
  pageCount: number;
  offset: number;
}

/**
 * Loads one archive page plus the total needed to render pagination. Returns
 * `undefined` when the requested page is beyond the available range.
 *
 * Wrapped in React `cache()` so `generateMetadata` and the page share a single
 * Content API request per render. Arguments stay primitive because `cache()`
 * keys by identity and object literals would not dedupe.
 */
export const loadShortsPage = cache(
  async (
    locale: AppLocale,
    page: number,
  ): Promise<ShortsPageData | undefined> => {
    const shortVideoService = getShortVideoService(getDependencyContainer());
    const offset = shortsPagination.getOffset(page);
    const response = await shortVideoService.list({
      lang: locale,
      limit: shortsPagination.pageSize,
      offset,
      order: 'desc',
    });
    const pageCount = shortsPagination.getPageCount(response.total);

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
