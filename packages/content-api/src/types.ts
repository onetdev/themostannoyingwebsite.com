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
  lookup: ArticleLookupFilter;
  title: string;
  contextHighlight: string;
}

export interface ArticleLookupFilter {
  id?: string;
  isOnCover?: boolean;
  locale?: string;
  slug?: string;
}

export interface ArticleSort {
  date?: 'asc' | 'desc';
  title?: 'asc' | 'desc';
}

export interface ArticleFilter {
  params: ArticleLookupFilter;
  sort?: ArticleSort;
  paginate?: { take?: number; skip?: number };
}

export interface ArticleSearchFilter extends Omit<ArticleFilter, 'sort'> {
  query: string;
}
