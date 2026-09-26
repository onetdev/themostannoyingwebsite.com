import {
  type GetArticleBySlugQueryParams,
  GetArticleBySlugResponse,
  type GetArticleBySlugResponse as GetArticleBySlugResponseType,
  type GetArticleListQueryParams,
  GetArticleListResponse,
  type GetArticleListResponse as GetArticleListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class ArticlesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of localized articles with optional search, tag, and featured filters.
   */
  public async list(
    params?: GetArticleListQueryParams,
    options?: RequestOptions,
  ): Promise<GetArticleListResponseType> {
    return this.transport.get(
      'api/v1/articles',
      params as Record<string, unknown> | undefined,
      GetArticleListResponse,
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

  /**
   * Retrieves all localized articles matching the filters by automatically paginating through all available pages.
   */
  public async listAll(
    params?: Omit<GetArticleListQueryParams, 'limit' | 'offset'>,
    options?: RequestOptions,
  ): Promise<GetArticleListResponseType['items']> {
    const pageSize = 100;
    let offset = 0;
    const allItems: GetArticleListResponseType['items'] = [];

    while (true) {
      const response = await this.list(
        {
          ...(params as GetArticleListQueryParams),
          limit: pageSize,
          offset,
        },
        options,
      );

      allItems.push(...response.items);

      if (allItems.length >= response.total || response.items.length === 0) {
        break;
      }

      offset += response.items.length;
    }

    return allItems;
  }
}
