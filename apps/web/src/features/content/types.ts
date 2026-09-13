import type contentEnLocale from './i18n/en';

export interface ArticleLookupQuery {
  id?: string;
  slug?: string;
  locale?: string;
  isOnCover?: boolean;
  includeFuture?: boolean;
}

export interface ArticleQuery {
  params?: ArticleLookupQuery;
  sort?: {
    date?: 'asc' | 'desc';
    title?: 'asc' | 'desc';
  };
  paginate?: {
    take?: number;
    skip?: number;
  };
}

export interface ArticleSearchQuery {
  params: {
    query: string;
    locale?: string;
    isOnCover?: boolean;
    id?: string;
    slug?: string;
  };
  paginate?: {
    take?: number;
    skip?: number;
  };
}

export interface ArticleSearchResult {
  lookup: {
    slug: string;
    locale?: string;
  };
  title: string;
  contextHighlight: string;
}

export interface ArticleTranslation {
  lang: string;
  slug: string;
  title: string;
}

export interface ArticleDatum {
  assetGroupId: string;
  content: string;
  coverImages?: {
    original: string;
    thumbnail: string;
  };
  intro?: string;
  isOnCover: boolean;
  id: string;
  locale: string;
  publishedAt: Date;
  updatedAt?: Date;
  slug: string;
  title: string;
  url: string;
  readingTimeMinutes?: number;
  tags?: string[];
  keywords?: string[];
  translations?: ArticleTranslation[];
}

export type ArticleData = {
  items: ArticleDatum[];
  total: number;
  take: number;
  skip: number;
};

export interface ArticleService {
  getByLookup(filter: ArticleLookupQuery): Promise<ArticleDatum | undefined>;
  getById(
    id: string | number,
    locale?: string,
  ): Promise<ArticleDatum | undefined>;
  getMany(query: ArticleQuery): Promise<ArticleData>;
  getFirst(query: ArticleQuery): Promise<ArticleDatum | undefined>;
  search(query: ArticleSearchQuery): Promise<ArticleSearchResult[]>;
  getAll(locale?: string): Promise<ArticleDatum[]>;
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
