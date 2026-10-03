import {
  type GetPrizeWheelSegmentListParams,
  GetPrizeWheelSegmentListResponse,
  type GetPrizeWheelSegmentListResponse as GetPrizeWheelSegmentListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class PrizeWheelResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the prize wheel segments with localized labels merged with their
   * `weight`/`starred` behavior.
   */
  public async getSegments(
    lang: GetPrizeWheelSegmentListParams['lang'],
    options?: RequestOptions,
  ): Promise<GetPrizeWheelSegmentListResponseType> {
    return this.transport.get(
      `api/v1/prize-wheel/${encodeURIComponent(lang)}/segments`,
      undefined,
      GetPrizeWheelSegmentListResponse,
      options,
    );
  }
}
