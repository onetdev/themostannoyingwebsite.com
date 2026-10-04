import {
  type GetAuthorBySlugQueryParams,
  GetAuthorBySlugResponse,
  type GetAuthorBySlugResponse as GetAuthorBySlugResponseType,
  type GetAuthorListQueryParams,
  GetAuthorListResponse,
  type GetAuthorListResponse as GetAuthorListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class AuthorsResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of article authors with their public byline,
   * persona label, and brief biography.
   */
  public async list(
    params?: GetAuthorListQueryParams,
    options?: RequestOptions,
  ): Promise<GetAuthorListResponseType> {
    return this.transport.get(
      'api/v1/authors',
      params as Record<string, unknown> | undefined,
      GetAuthorListResponse,
      options,
    );
  }

  /**
   * Retrieves a single author by their stable slug.
   */
  public async getBySlug(
    slug: string,
    params?: GetAuthorBySlugQueryParams,
    options?: RequestOptions,
  ): Promise<GetAuthorBySlugResponseType> {
    const encodedSlug = encodeURIComponent(slug);
    return this.transport.get(
      `api/v1/authors/${encodedSlug}`,
      params as Record<string, unknown> | undefined,
      GetAuthorBySlugResponse,
      options,
    );
  }

  /**
   * Retrieves all authors matching the filters by automatically paginating
   * through all available pages.
   */
  public async listAll(
    params?: Omit<GetAuthorListQueryParams, 'limit' | 'offset'>,
    options?: RequestOptions,
  ): Promise<GetAuthorListResponseType['items']> {
    const pageSize = 100;
    let offset = 0;
    const allItems: GetAuthorListResponseType['items'] = [];

    while (true) {
      const response = await this.list(
        {
          ...(params as GetAuthorListQueryParams),
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
