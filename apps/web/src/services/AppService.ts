import { inject, injectable } from 'inversify';
import { CoreSymbols } from '@/core/di/symbols';
import type { CountryRepository } from '@/repositories';
import i18nConfig from '@/root/i18n.config';

export type LanguageInfo = {
  locale: string;
  flag: string;
  labelKey: AppTranslationKey;
};

const LANGUAGE_MAP: Record<string, Omit<LanguageInfo, 'locale'>> = {
  en: { flag: '🇺🇸', labelKey: 'language.option.en' },
  hu: { flag: '🇭🇺', labelKey: 'language.option.hu' },
  zh: { flag: '🇨🇳', labelKey: 'language.option.zh' },
};

@injectable()
export class AppService {
  @inject(CoreSymbols.CountryRepository)
  private countryRepository!: CountryRepository;

  getAllCountries() {
    return this.countryRepository.findAll();
  }

  getSupportedLanguages(): LanguageInfo[] {
    return i18nConfig.locales.map((locale) => {
      const langInfo = LANGUAGE_MAP[locale];
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
