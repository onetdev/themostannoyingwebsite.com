export type ArticleCore = {
  slug: string;
  url: string;
  title: string;
  intro: string;
  isHighlighted?: boolean;
  isOnCover?: boolean;
  coverImage?: string;
};

export type Article = ArticleCore & {
  date: Date;
  body: React.ReactNode;
};

export type ArticleStatic = ArticleCore & {
  date: string;
  body: string;
};
