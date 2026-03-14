import { injectable } from 'inversify';
import i18nConfig from '@/root/i18n.config';
import { getAllCountries } from './use-cases/get-all-countries';
import {
  getSupportedLocaleMeta,
  type LanguageInfo,
} from './use-cases/get-supported-locales';

@injectable()
export class AppService {
  async getAllCountries() {
    return getAllCountries();
  }

  getSupportedLanguages(): LanguageInfo[] {
    const languageMap = getSupportedLocaleMeta();
    return i18nConfig.locales.map((locale) => {
      const langInfo = languageMap[locale];
      if (!langInfo) {
        throw new Error(
          `Language configuration is missing for locale: "${locale}"`,
        );
      }
      return {
        locale,
        ...langInfo,
      };
    });
  }
}
