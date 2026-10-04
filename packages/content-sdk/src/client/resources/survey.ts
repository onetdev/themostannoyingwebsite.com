import {
  type GetSurveyQuestionListParams,
  GetSurveyQuestionListResponse,
  type GetSurveyQuestionListResponse as GetSurveyQuestionListResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class SurveyResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the ordered survey questions with options and merged answers.
   */
  public async getQuestions(
    lang: GetSurveyQuestionListParams['lang'],
    options?: RequestOptions,
  ): Promise<GetSurveyQuestionListResponseType> {
    return this.transport.get(
      `api/v1/survey/${encodeURIComponent(lang)}/questions`,
      undefined,
      GetSurveyQuestionListResponse,
      options,
    );
  }
}
