import {
  type GetTranslationByLangParams,
  type GetTranslationByLangQueryParams,
  GetTranslationByLangResponse,
  type GetTranslationByLangResponse as GetTranslationByLangResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export class TranslationsResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the translation message bundle for a language, optionally sliced by namespace.
   */
  public async getByLang(
    lang: GetTranslationByLangParams['lang'],
    params?: GetTranslationByLangQueryParams,
    options?: RequestOptions,
  ): Promise<GetTranslationByLangResponseType> {
    return this.transport.get(
      `api/v1/translations/${encodeURIComponent(lang)}`,
      params as Record<string, unknown> | undefined,
      GetTranslationByLangResponse,
      options,
    );
  }
}
