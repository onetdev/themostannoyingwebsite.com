// Coming from generated article index through `pnpm run gen-article-index`
export interface ArticleMetaIndex {
  dateTime: string;
  directory: string;
  hasCover: boolean;
  intro: string;
  isHighlighted: boolean;
  isOnCover: boolean;
  locale: string;
  slug: string;
  title: string;
}

export interface ArticleMeta {
  coverImage?: string;
  date: Date;
  hasCover: boolean;
  id: string;
  intro: string;
  isHighlighted: boolean;
  isOnCover: boolean;
  slug: string;
  title: string;
  url: string;
}

export type ArticleContent = string;

export interface ArticleLookupFilter {
  slug: string;
  locale: string;
}

export interface ArticleFilter {
  isHighlighted?: boolean;
  isOnCover?: boolean;
}

export interface ArticleSort {
  date?: 'asc' | 'desc';
  title?: 'asc' | 'desc';
}
