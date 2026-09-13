import {
  type GetArticleBySlugResponse,
  type GetPageBySlugResponse,
  ImageAsset,
  ImageAssetVariant,
  type ListArticlesResponse,
  type ListPagesResponse,
  type SearchContentResponse,
} from './generated/endpoints';

export type Article = GetArticleBySlugResponse;
export type ArticleListItem = ListArticlesResponse['items'][number];
export type Page = GetPageBySlugResponse;
export type PageListItem = ListPagesResponse['items'][number];
export type SearchResultItem = SearchContentResponse['items'][number];

// Backwards-compatible aliases
export const ApiImageWrapper = ImageAsset;
export type ApiImageWrapper = ImageAsset;
export const ImageVariantInfo = ImageAssetVariant;
export type ImageVariantInfo = ImageAssetVariant;

export * from './client/index';
export * from './generated/endpoints';
export * from './helpers/index';
