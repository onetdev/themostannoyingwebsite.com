import {
  type GetArticleBySlugResponse,
  type GetArticleListResponse,
  type GetNewsletterStepListResponse,
  type GetPageBySlugResponse,
  type GetPageListResponse,
  type GetPrizeWheelSegmentListResponse,
  type GetSearchResultListResponse,
  type GetSpamSampleListResponse,
  type GetSurveyQuestionListResponse,
  ImageAsset,
  ImageAssetVariant,
} from './generated/endpoints';

export type Article = GetArticleBySlugResponse;
export type ArticleListItem = GetArticleListResponse['items'][number];
export type Page = GetPageBySlugResponse;
export type PageListItem = GetPageListResponse['items'][number];
export type SearchResultItem = GetSearchResultListResponse['items'][number];

// Dedicated content resource item shapes
export type SurveyQuestion = GetSurveyQuestionListResponse['questions'][number];
export type PrizeWheelSegment =
  GetPrizeWheelSegmentListResponse['segments'][number];
export type NewsletterStep = GetNewsletterStepListResponse['steps'][number];
export type SpamSample = GetSpamSampleListResponse['samples'][number];

// Backwards-compatible aliases
export const ApiImageWrapper = ImageAsset;
export type ApiImageWrapper = ImageAsset;
export const ImageVariantInfo = ImageAssetVariant;
export type ImageVariantInfo = ImageAssetVariant;

export * from './client/index';
export * from './generated/endpoints';
export * from './helpers/index';
