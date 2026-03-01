export type { ArticleDatum, ArticleService } from '@maw/content-api';

export const DI = {
  AppArticleService: Symbol.for('AppArticleService'),
};

export type ContentEvent = {
  'global-search:query': {
    query: string;
  };
};
