import type { ArticleLookupQuery } from './schemas/article-lookup-query-schema';

export type { ArticleSearchQuery } from './schemas';

export type PagedList<T> = {
  items: T[];
  total: number;
  take: number;
  skip: number;
};

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
}

export type ArticleData = PagedList<ArticleDatum>;

export interface ArticleSearchResult {
  lookup: ArticleLookupQuery;
  title: string;
  contextHighlight: string;
}
