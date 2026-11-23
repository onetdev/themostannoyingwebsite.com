import {
  type GetShortVideoBySlugQueryParams,
  GetShortVideoBySlugResponse,
  type GetShortVideoBySlugResponse as GetShortVideoBySlugResponseType,
  type GetShortVideoListQueryParams,
  GetShortVideoListResponse,
  type GetShortVideoListResponse as GetShortVideoListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class ShortVideosResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of localized vertical short videos with their
   * media renditions, poster thumbnails, cues, and metadata.
   */
  public async list(
    params?: GetShortVideoListQueryParams,
    options?: RequestOptions,
  ): Promise<GetShortVideoListResponseType> {
    return this.transport.get(
      'api/v1/short-videos',
      params as Record<string, unknown> | undefined,
      GetShortVideoListResponse,
      options,
    );
  }

  /**
   * Retrieves a single short video by its localized slug, including available
   * translation alternates and its subtitle track.
   */
  public async getBySlug(
    slug: string,
    params?: GetShortVideoBySlugQueryParams,
    options?: RequestOptions,
  ): Promise<GetShortVideoBySlugResponseType> {
    const encodedSlug = encodeURIComponent(slug);
    return this.transport.get(
      `api/v1/short-videos/${encodedSlug}`,
      params as Record<string, unknown> | undefined,
      GetShortVideoBySlugResponse,
      options,
    );
  }
}
