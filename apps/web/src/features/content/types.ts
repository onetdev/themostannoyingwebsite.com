import type { ArticleApiService } from '@maw/content-api';
import type { ArticleSearchQuery } from '@maw/content-api/schemas';
import type contentEnLocale from './i18n/en';

export type { ArticleApiService, ArticleDatum } from '@maw/content-api';

export const DI = {
  ArticleService: Symbol.for('ArticleService'),
};

export type ArticleService = ArticleApiService;
export type SearchFilter = ArticleSearchQuery;

export interface SearchResult<T = unknown> {
  item: T;
  title: string;
  contextHighlight: string;
}

export type ContentI18nShape = typeof contentEnLocale;

declare global {
  interface AppEvents {
    'global-search:query': {
      query: string;
    };
  }
}
