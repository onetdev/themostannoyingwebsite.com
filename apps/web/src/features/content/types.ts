export type { ArticleDatum, ArticleService } from '@maw/content-api';

export const DI = {
  AppArticleService: Symbol.for('AppArticleService'),
};

export type SearchEvent = {
  type: 'SEARCH';
  payload: {
    query: string;
  };
};
