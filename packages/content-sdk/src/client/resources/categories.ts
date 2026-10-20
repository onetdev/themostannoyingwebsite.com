import {
  type GetCategoryListQueryParams,
  GetCategoryListResponse,
  type GetCategoryListResponse as GetCategoryListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class CategoriesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of localized article categories, including usage counts.
   */
  public async list(
    params?: GetCategoryListQueryParams,
    options?: RequestOptions,
  ): Promise<GetCategoryListResponseType> {
    return this.transport.get(
      'api/v1/categories',
      params as Record<string, unknown> | undefined,
      GetCategoryListResponse,
      options,
    );
  }
}
