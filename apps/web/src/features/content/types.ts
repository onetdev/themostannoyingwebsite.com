import type {
  Article,
  ArticleListItem,
  GetArticleListQueryParams,
  GetArticleListResponse,
  LanguageCode,
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

declare global {
  interface AppEvents {
    'global-search:query': {
      query: string;
    };
  }
}
