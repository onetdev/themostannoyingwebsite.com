import type {
  Article,
  ArticleListItem,
  Author,
  AuthorListItem,
  GetArticleListQueryParams,
  GetArticleListResponse,
  GetAuthorListQueryParams,
  LanguageCode,
  NewsletterStep,
  PoolType,
  PrizeWheelSegment,
  SpamSample,
  SurveyQuestion,
} from '@maw/content-sdk';
import type contentEnLocale from './i18n/en';

export interface ArticleService {
  getBySlug(slug: string, lang?: LanguageCode): Promise<Article | undefined>;
  list(params?: GetArticleListQueryParams): Promise<GetArticleListResponse>;
  listAll(
    params?: Omit<GetArticleListQueryParams, 'limit' | 'offset'>,
  ): Promise<ArticleListItem[]>;
}

export interface AuthorService {
  getBySlug(slug: string, lang?: LanguageCode): Promise<Author | undefined>;
  listAll(
    params?: Omit<GetAuthorListQueryParams, 'limit' | 'offset'>,
  ): Promise<AuthorListItem[]>;
}

export const DI = {
  ArticleService: Symbol.for('ArticleService'),
  AuthorService: Symbol.for('AuthorService'),
  ContentApiClient: Symbol.for('ContentApiClient'),
};

export type ContentI18nShape = typeof contentEnLocale;

/**
 * Content API resources consumed as pools.
 *
 * Covers every generic string pool plus the dedicated structured resources.
 * Generic pools yield plain strings; dedicated resources yield structured
 * items (with stable IDs and API-supplied behavior).
 */
export type ContentPoolType =
  | PoolType
  | 'survey'
  | 'prize-wheel'
  | 'newsletter'
  | 'spam-sample';

export interface ContentPoolItemMap {
  names: string;
  comments: string;
  'chat-bubble-messages': string;
  'top-searches': string;
  'marquee-titles': string;
  'paged-titles': string;
  'cancellation-reasons': string;
  'social-proof-names': string;
  'social-proof-locations': string;
  testimonials: string;
  survey: SurveyQuestion;
  'prize-wheel': PrizeWheelSegment;
  newsletter: NewsletterStep;
  'spam-sample': SpamSample;
}

/** Item type of a given Content API pool. */
export type ContentPoolItem<T extends ContentPoolType> = ContentPoolItemMap[T];

declare global {
  interface AppEvents {
    'global-search:query': {
      query: string;
    };
  }
}
