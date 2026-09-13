import {
  type ListImagesQueryParams,
  ListImagesResponse,
  type ListImagesResponse as ListImagesResponseType,
} from '../../generated/endpoints.js';
import type { HttpTransport } from '../http.js';
import type { RequestOptions } from '../types.js';

export class ImagesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves a paginated list of raster image assets and their responsive dimensions and URLs.
   */
  public async list(
    params?: ListImagesQueryParams,
    options?: RequestOptions,
  ): Promise<ListImagesResponseType> {
    return this.transport.get(
      'api/v1/images',
      params as Record<string, unknown> | undefined,
      ListImagesResponse,
      options,
    );
  }
}
