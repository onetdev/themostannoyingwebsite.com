import {
  type GetSearchResultsQueryParams as GetSearchResultsQueryParamsType,
  GetSearchResultsResponse,
  type GetSearchResultsResponse as GetSearchResultsResponseType,
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
    params?: GetSearchResultsQueryParamsType,
    options?: RequestOptions,
  ): Promise<GetSearchResultsResponseType> {
    return this.transport.get(
      'api/v1/search',
      params as Record<string, unknown> | undefined,
      GetSearchResultsResponse,
      options,
    );
  }
}
