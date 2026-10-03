import {
  type GetNewsletterStepListParams,
  GetNewsletterStepListResponse,
  type GetNewsletterStepListResponse as GetNewsletterStepListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class NewsletterResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the ordered newsletter confirmation steps.
   */
  public async getSteps(
    lang: GetNewsletterStepListParams['lang'],
    options?: RequestOptions,
  ): Promise<GetNewsletterStepListResponseType> {
    return this.transport.get(
      `api/v1/newsletter/${encodeURIComponent(lang)}/steps`,
      undefined,
      GetNewsletterStepListResponse,
      options,
    );
  }
}
