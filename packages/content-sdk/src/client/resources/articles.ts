import {
  type GetArticleBySlugQueryParams,
  GetArticleBySlugResponse,
  type GetArticleBySlugResponse as GetArticleBySlugResponseType,
  type ListArticlesQueryParams,
  ListArticlesResponse,
  type ListArticlesResponse as ListArticlesResponseType,
} from '../../generated/endpoints.js';
import type { HttpTransport } from '../http.js';
import type { RequestOptions } from '../types.js';

export class ArticlesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of localized articles with optional search, tag, and featured filters.
   */
  public async list(
    params?: ListArticlesQueryParams,
    options?: RequestOptions,
  ): Promise<ListArticlesResponseType> {
    return this.transport.get(
      'api/v1/articles',
      params as Record<string, unknown> | undefined,
      ListArticlesResponse,
      options,
    );
  }

  /**
   * Retrieves a single localized article by its URL slug, including available translation alternates.
   */
  public async getBySlug(
    slug: string,
    params?: GetArticleBySlugQueryParams,
    options?: RequestOptions,
  ): Promise<GetArticleBySlugResponseType> {
    const encodedSlug = encodeURIComponent(slug);
    return this.transport.get(
      `api/v1/articles/${encodedSlug}`,
      params as Record<string, unknown> | undefined,
      GetArticleBySlugResponse,
      options,
    );
  }
}
