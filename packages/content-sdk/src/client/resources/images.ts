import {
  type GetImageListQueryParams,
  GetImageListResponse,
  type GetImageListResponse as GetImageListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class ImagesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of raster image assets and their responsive dimensions and URLs.
   */
  public async list(
    params?: GetImageListQueryParams,
    options?: RequestOptions,
  ): Promise<GetImageListResponseType> {
    return this.transport.get(
      'api/v1/images',
      params as Record<string, unknown> | undefined,
      GetImageListResponse,
      options,
    );
  }
}
