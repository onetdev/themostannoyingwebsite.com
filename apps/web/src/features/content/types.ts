import type {
  Article,
  ArticleListItem,
  GetArticleListQueryParams,
  GetArticleListResponse,
  LanguageCode,
  VariantPoolType,
} from '@maw/content-sdk';
import type contentEnLocale from './i18n/en';

export interface ArticleService {
  getBySlug(slug: string, lang?: LanguageCode): Promise<Article | undefined>;
  list(params?: GetArticleListQueryParams): Promise<GetArticleListResponse>;
  listAll(
    params?: Omit<GetArticleListQueryParams, 'limit' | 'offset'>,
  ): Promise<ArticleListItem[]>;
}

export const DI = {
  ArticleService: Symbol.for('ArticleService'),
  ContentApiClient: Symbol.for('ContentApiClient'),
};

export type ContentI18nShape = typeof contentEnLocale;

/**
 * Item shape for each Content API variant pool type.
 *
 * Must cover every value of `VariantPoolType`; pools that carry no structured
 * payload are plain strings. Keep it in sync with the API's pool enum.
 */
export interface VariantPoolItemMap {
  names: string;
  comments: string;
  'chat-bubble-messages': string;
  'top-searches': string;
  'marquee-titles': string;
  'paged-titles': string;
  'cancellation-reasons': string;
  'social-proof-names': string;
  'social-proof-locations': string;
  'social-proof': unknown;
  testimonials: { comment: string };
  'spam-samples': { subject: string; body: string };
  'newsletter-confirmations': {
    text?: string;
    confirm: string;
    cancel: string;
  };
  'quiz-questions': {
    text: string;
    options: Record<string, string> | string[];
    solution?: string;
  };
}

/** Item type of a given Content API variant pool. */
export type VariantPoolItem<T extends VariantPoolType> = VariantPoolItemMap[T];

declare global {
  interface AppEvents {
    'global-search:query': {
      query: string;
    };
  }
}
