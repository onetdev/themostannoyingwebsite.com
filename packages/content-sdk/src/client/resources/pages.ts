import {
  type GetPageBySlugQueryParams,
  GetPageBySlugResponse,
  type GetPageBySlugResponse as GetPageBySlugResponseType,
  type ListPagesQueryParams,
  ListPagesResponse,
  type ListPagesResponse as ListPagesResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class PagesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of static localized informational pages.
   */
  public async list(
    params?: ListPagesQueryParams,
    options?: RequestOptions,
  ): Promise<ListPagesResponseType> {
    return this.transport.get(
      'api/v1/pages',
      params as Record<string, unknown> | undefined,
      ListPagesResponse,
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
    params?: Omit<ListPagesQueryParams, 'limit' | 'offset'>,
    options?: RequestOptions,
  ): Promise<ListPagesResponseType['items']> {
    const pageSize = 100;
    let offset = 0;
    const allItems: ListPagesResponseType['items'] = [];

    while (true) {
      const response = await this.list(
        {
          ...(params as ListPagesQueryParams),
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
