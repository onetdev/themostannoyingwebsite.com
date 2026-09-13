import {
  type SearchContentQueryParams as SearchContentQueryParamsType,
  SearchContentResponse,
  type SearchContentResponse as SearchContentResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class SearchResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Performs a full-text search across localized articles and static pages,
   * returning plain text titles and excerpts with matching terms highlighted in Markdown bold.
   */
  public async query(
    params?: SearchContentQueryParamsType,
    options?: RequestOptions,
  ): Promise<SearchContentResponseType> {
    return this.transport.get(
      'api/v1/search',
      params as Record<string, unknown> | undefined,
      SearchContentResponse,
      options,
    );
  }
}
