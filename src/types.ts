import type { JSX, PropsWithoutRef } from 'react';

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

declare global {
  type JSXProxyProps<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<
    JSX.IntrinsicElements[T]
  >;

  type AppTheme = 'light' | 'dark';
}
