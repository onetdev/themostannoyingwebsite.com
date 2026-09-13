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

// Backwards-compatible alias for smooth migration
export type ArticleDatum = Article;

export interface ArticleSearchResult {
  lookup: {
    slug: string;
    locale?: string;
  };
  title: string;
  contextHighlight: string;
}

export interface ArticleSearchQuery {
  params: {
    query: string;
    locale?: string;
  };
  paginate?: {
    take?: number;
    skip?: number;
  };
}

export interface ArticleService {
  getBySlug(slug: string, lang?: LanguageCode): Promise<Article | undefined>;
  list(params?: ListArticlesQueryParams): Promise<ListArticlesResponse>;
  listAll(
    params?: Omit<ListArticlesQueryParams, 'limit' | 'offset'>,
  ): Promise<ArticleListItem[]>;
  search(query: ArticleSearchQuery): Promise<ArticleSearchResult[]>;
}

export const DI = {
  ArticleService: Symbol.for('ArticleService'),
  ContentApiClient: Symbol.for('ContentApiClient'),
};

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
