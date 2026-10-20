import {
  type GetDonationSummaryParams,
  GetDonationSummaryResponse,
  type GetDonationSummaryResponse as GetDonationSummaryResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class DonationsResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the donation summary for a language: all-time totals and
   * balance, monthly history, trend stats and top supporters.
   */
  public async getSummary(
    lang: GetDonationSummaryParams['lang'],
    options?: RequestOptions,
  ): Promise<GetDonationSummaryResponseType> {
    return this.transport.get(
      `api/v1/donation/${encodeURIComponent(lang)}`,
      undefined,
      GetDonationSummaryResponse,
      options,
    );
  }
}
