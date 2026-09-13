import {
  GetApiHealthResponse,
  type GetApiHealthResponse as GetApiHealthResponseType,
  GetHealthResponse,
  type GetHealthResponse as GetHealthResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class HealthResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Basic root health check endpoint.
   */
  public async check(options?: RequestOptions): Promise<GetHealthResponseType> {
    return this.transport.get('health', undefined, GetHealthResponse, options);
  }

  /**
   * Detailed API v1 service health and database connectivity check.
   */
  public async apiCheck(
    options?: RequestOptions,
  ): Promise<GetApiHealthResponseType> {
    return this.transport.get(
      'api/v1/health',
      undefined,
      GetApiHealthResponse,
      options,
    );
  }
}
