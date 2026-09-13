import type {
  GetArticleBySlugResponse,
  GetPageBySlugResponse,
  ListArticlesResponse,
  ListPagesResponse,
} from './generated/endpoints';

export type Article = GetArticleBySlugResponse;
export type ArticleListItem = ListArticlesResponse['items'][number];
export type Page = GetPageBySlugResponse;
export type PageListItem = ListPagesResponse['items'][number];

export * from './client/index';
export * from './generated/endpoints';
export * from './helpers/index';
