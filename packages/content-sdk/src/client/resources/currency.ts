import {
  GetCurrencyRateListResponse,
  type GetCurrencyRateListResponse as GetCurrencyRateListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class CurrencyResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the exchange rates for the offered display currencies, relative
   * to the response's base currency.
   */
  public async getRates(
    options?: RequestOptions,
  ): Promise<GetCurrencyRateListResponseType> {
    return this.transport.get(
      'api/v1/currency/rates',
      undefined,
      GetCurrencyRateListResponse,
      options,
    );
  }
}
