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
  ar: { flag: '🇸🇦', labelKey: 'language.option.ar' },
  de: { flag: '🇩🇪', labelKey: 'language.option.de' },
  en: { flag: '🇺🇸', labelKey: 'language.option.en' },
  es: { flag: '🇪🇸', labelKey: 'language.option.es' },
  fr: { flag: '🇫🇷', labelKey: 'language.option.fr' },
  hi: { flag: '🇮🇳', labelKey: 'language.option.hi' },
  hu: { flag: '🇭🇺', labelKey: 'language.option.hu' },
  it: { flag: '🇮🇹', labelKey: 'language.option.it' },
  ja: { flag: '🇯🇵', labelKey: 'language.option.ja' },
  ko: { flag: '🇰🇷', labelKey: 'language.option.ko' },
  pl: { flag: '🇵🇱', labelKey: 'language.option.pl' },
  pt: { flag: '🇵🇹', labelKey: 'language.option.pt' },
  ru: { flag: '🇷🇺', labelKey: 'language.option.ru' },
  tr: { flag: '🇹🇷', labelKey: 'language.option.tr' },
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
