import type {
  Article,
  ArticleListItem,
  LanguageCode,
  ListArticlesQueryParams,
  ListArticlesResponse,
} from '@maw/content-sdk';
import type contentEnLocale from './i18n/en';

export type {
  Article,
  ArticleListItem,
  LanguageCode,
  ListArticlesQueryParams,
  ListArticlesResponse,
};

export interface ArticleService {
  getBySlug(slug: string, lang?: LanguageCode): Promise<Article | undefined>;
  list(params?: ListArticlesQueryParams): Promise<ListArticlesResponse>;
  listAll(
    params?: Omit<ListArticlesQueryParams, 'limit' | 'offset'>,
  ): Promise<ArticleListItem[]>;
}

export const DI = {
  ArticleService: Symbol.for('ArticleService'),
  ContentApiClient: Symbol.for('ContentApiClient'),
};

export type ContentI18nShape = typeof contentEnLocale;

declare global {
  interface AppEvents {
    'global-search:query': {
      query: string;
    };
  }
}
