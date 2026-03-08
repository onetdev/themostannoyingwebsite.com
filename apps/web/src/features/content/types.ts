import type contentEnLocale from './i18n/en';

export type { ArticleDatum, ArticleService } from '@maw/content-api';

export const DI = {
  AppArticleService: Symbol.for('AppArticleService'),
};

export type ContentI18nShape = typeof contentEnLocale;

declare global {
  interface AppEvents {
    'global-search:query': {
      query: string;
    };
  }
}
