import {
  type GetLocaleListQueryParams,
  GetLocaleListResponse,
  type GetLocaleListResponse as GetLocaleListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class LocalesResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the supported locales with their English/native names and text direction.
   */
  public async list(
    params?: GetLocaleListQueryParams,
    options?: RequestOptions,
  ): Promise<GetLocaleListResponseType> {
    return this.transport.get(
      'api/v1/locales',
      params as Record<string, unknown> | undefined,
      GetLocaleListResponse,
      options,
    );
  }
}
