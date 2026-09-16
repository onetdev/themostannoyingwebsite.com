import {
  type ListTagsQueryParams,
  ListTagsResponse,
  type ListTagsResponse as ListTagsResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class TagsResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of distinct tags across articles, including usage counts.
   */
  public async list(
    params?: ListTagsQueryParams,
    options?: RequestOptions,
  ): Promise<ListTagsResponseType> {
    return this.transport.get(
      'api/v1/tags',
      params as Record<string, unknown> | undefined,
      ListTagsResponse,
      options,
    );
  }
}
