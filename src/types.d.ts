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

export type ThemeColors = {
  background: string;
  primary: string;
  primaryAlt: string;
  secondary: string;
  secondaryAlt: string;
  tertiary: string;
  tertiaryAlt: string;
  surface: string;
  error: string;
  onPrimary: string;
  onSecondary: string;
  onTertiary: string;
  onBackground: string;
  onSurface: string;
  onError: string;
  dimmer: string;
};
