import {
  type GetSpamSampleListParams,
  GetSpamSampleListResponse,
  type GetSpamSampleListResponse as GetSpamSampleListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class SpamSampleResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the complete satirical spam sample pool. Sampling and slicing
   * are left to the client.
   */
  public async list(
    lang: GetSpamSampleListParams['lang'],
    options?: RequestOptions,
  ): Promise<GetSpamSampleListResponseType> {
    return this.transport.get(
      `api/v1/spam-sample/${encodeURIComponent(lang)}`,
      undefined,
      GetSpamSampleListResponse,
      options,
    );
  }
}
