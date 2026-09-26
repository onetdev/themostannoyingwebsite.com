import {
  type GetPageBySlugQueryParams,
  GetPageBySlugResponse,
  type GetPageBySlugResponse as GetPageBySlugResponseType,
  type GetPageListQueryParams,
  GetPageListResponse,
  type GetPageListResponse as GetPageListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class PagesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of static localized informational pages.
   */
  public async list(
    params?: GetPageListQueryParams,
    options?: RequestOptions,
  ): Promise<GetPageListResponseType> {
    return this.transport.get(
      'api/v1/pages',
      params as Record<string, unknown> | undefined,
      GetPageListResponse,
      options,
    );
  }

  /**
   * Retrieves a single localized informational page by its URL slug.
   */
  public async getBySlug(
    slug: string,
    params?: GetPageBySlugQueryParams,
    options?: RequestOptions,
  ): Promise<GetPageBySlugResponseType> {
    const encodedSlug = encodeURIComponent(slug);
    return this.transport.get(
      `api/v1/pages/${encodedSlug}`,
      params as Record<string, unknown> | undefined,
      GetPageBySlugResponse,
      options,
    );
  }

  /**
   * Retrieves all localized informational pages matching the filters by automatically paginating through all available pages.
   */
  public async listAll(
    params?: Omit<GetPageListQueryParams, 'limit' | 'offset'>,
    options?: RequestOptions,
  ): Promise<GetPageListResponseType['items']> {
    const pageSize = 100;
    let offset = 0;
    const allItems: GetPageListResponseType['items'] = [];

    while (true) {
      const response = await this.list(
        {
          ...(params as GetPageListQueryParams),
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
