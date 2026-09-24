import { injectable } from 'inversify';
import { getAllCountries } from './use-cases/get-all-countries';
import {
  fetchSupportedLanguages,
  getSupportedLanguages,
  type LanguageInfo,
} from './use-cases/get-supported-locales';

@injectable()
export class AppService {
  async getAllCountries() {
    return getAllCountries();
  }

  /**
   * Fetches the supported languages from the Content API, falling back to the
   * bundled metadata when unavailable.
   */
  async getSupportedLanguages(): Promise<LanguageInfo[]> {
    return fetchSupportedLanguages();
  }

  /**
   * Synchronously returns the bundled supported languages. Useful as initial
   * data while the API-backed list is loading.
   */
  getFallbackSupportedLanguages(): LanguageInfo[] {
    return getSupportedLanguages();
  }
}
