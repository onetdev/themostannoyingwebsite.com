export interface ArticleData {
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

export interface ArticleLookupFilter {
  slug: string;
  locale: string;
}

export interface ArticlePropFilter {
  isHighlighted?: boolean;
  isOnCover?: boolean;
}

export interface ArticleSort {
  date?: 'asc' | 'desc';
  title?: 'asc' | 'desc';
}

export interface ArticleFilter {
  props: ArticlePropFilter;
  sort?: ArticleSort;
  paginate?: { take?: number; skip?: number };
}
