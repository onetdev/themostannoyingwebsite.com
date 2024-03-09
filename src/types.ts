import React from 'react';

export interface ArticleCore {
  slug: string;
  url: string;
  title: string;
  intro: string;
  isHighlighted?: boolean;
  isOnCover?: boolean;
  coverImage?: string;
}

export interface Article extends ArticleCore {
  date: Date;
  body: React.ReactNode;
}

export interface ArticleStatic extends ArticleCore {
  date: string;
  body: string;
}
