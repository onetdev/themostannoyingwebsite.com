export interface ArticleDatum {
  assetGroupId: string;
  content: string;
  coverImages?: {
    original: string;
    thumbnail: string;
  };
  intro?: string;
  isHighlighted: boolean;
  isOnCover: boolean;
  locale: string;
  publishedAt: Date;
  slug: string;
  title: string;
  url: string;
}

export type ArticleData = PagedList<ArticleDatum>;

export interface ArticleSearchResult {
  lookup: ArticleLookupIdentifier;
  title: string;
  contextHighlight: string;
}

export interface ArticleLookupIdentifier {
  slug: string;
  locale: string;
}

export interface ArticleFilterParams {
  isHighlighted?: boolean;
  isOnCover?: boolean;
  locale?: string;
}

export interface ArticleSort {
  date?: 'asc' | 'desc';
  title?: 'asc' | 'desc';
}

export interface ArticleFilter {
  params: ArticleFilterParams;
  sort?: ArticleSort;
  paginate?: { take?: number; skip?: number };
}

export interface ArticleSearchFilter extends Omit<ArticleFilter, 'sort'> {
  query: string;
}
