import {
  type GetArticleBySlugResponse,
  type GetArticleListResponse,
  type GetPageBySlugResponse,
  type GetPageListResponse,
  type GetSearchResultsResponse,
  ImageAsset,
  ImageAssetVariant,
} from './generated/endpoints';

export type Article = GetArticleBySlugResponse;
export type ArticleListItem = GetArticleListResponse['items'][number];
export type Page = GetPageBySlugResponse;
export type PageListItem = GetPageListResponse['items'][number];
export type SearchResultItem = GetSearchResultsResponse['items'][number];

// Backwards-compatible aliases
export const ApiImageWrapper = ImageAsset;
export type ApiImageWrapper = ImageAsset;
export const ImageVariantInfo = ImageAssetVariant;
export type ImageVariantInfo = ImageAssetVariant;

export * from './client/index';
export * from './generated/endpoints';
export * from './helpers/index';
