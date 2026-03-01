export type { ArticleDatum, ArticleService } from '@maw/content-api';

export const DI = {
  AppArticleService: Symbol.for('AppArticleService'),
};

declare global {
  interface AppEvents {
    'global-search:query': {
      query: string;
    };
  }
}
