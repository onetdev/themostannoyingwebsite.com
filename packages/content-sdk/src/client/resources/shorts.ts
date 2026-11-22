import {
  type GetShortBySlugQueryParams,
  GetShortBySlugResponse,
  type GetShortBySlugResponse as GetShortBySlugResponseType,
  type GetShortListQueryParams,
  GetShortListResponse,
  type GetShortListResponse as GetShortListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class ShortsResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of localized vertical short-form clips with
   * their media renditions, poster thumbnails, cues, and metadata.
   */
  public async list(
    params?: GetShortListQueryParams,
    options?: RequestOptions,
  ): Promise<GetShortListResponseType> {
    return this.transport.get(
      'api/v1/shorts',
      params as Record<string, unknown> | undefined,
      GetShortListResponse,
      options,
    );
  }

  /**
   * Retrieves a single short by its localized slug, including available
   * translation alternates and its subtitle track.
   */
  public async getBySlug(
    slug: string,
    params?: GetShortBySlugQueryParams,
    options?: RequestOptions,
  ): Promise<GetShortBySlugResponseType> {
    const encodedSlug = encodeURIComponent(slug);
    return this.transport.get(
      `api/v1/shorts/${encodedSlug}`,
      params as Record<string, unknown> | undefined,
      GetShortBySlugResponse,
      options,
    );
  }
}
