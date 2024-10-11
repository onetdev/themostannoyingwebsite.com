// Coming from generated article index through `pnpm run gen-article-index`
export interface ArticleIndexData {
  content: string;
  directory: string;
  hasCover: boolean;
  intro: string;
  isHighlighted: boolean;
  isOnCover: boolean;
  locale: string;
  publishedAt: string;
  slug: string;
  title: string;
}

export interface ArticleData {
  assetGroupId: string;
  content: string;
  coverImage?: string;
  hasCover: boolean;
  intro: string;
  isHighlighted: boolean;
  isOnCover: boolean;
  locale: string;
  publishedAt: Date;
  slug: string;
  title: string;
  url: string;
}

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
