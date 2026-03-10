import { inject, injectable } from 'inversify';
import { CoreSymbols } from '@/core/di/symbols';
import { LANGUAGES_IN_OWN_LANGUAGE } from '@/i18n/selector';
import type { CountryRepository } from '@/repositories';
import i18nConfig from '@/root/i18n.config';

export type LanguageInfo = {
  locale: string;
  flag: string;
  label: string;
};

const LANGUAGE_MAP: Record<string, Omit<LanguageInfo, 'locale'>> = {
  ar: { flag: '🇸🇦', label: LANGUAGES_IN_OWN_LANGUAGE.ar },
  de: { flag: '🇩🇪', label: LANGUAGES_IN_OWN_LANGUAGE.de },
  en: { flag: '🇺🇸', label: LANGUAGES_IN_OWN_LANGUAGE.en },
  es: { flag: '🇪🇸', label: LANGUAGES_IN_OWN_LANGUAGE.es },
  fr: { flag: '🇫🇷', label: LANGUAGES_IN_OWN_LANGUAGE.fr },
  hi: { flag: '🇮🇳', label: LANGUAGES_IN_OWN_LANGUAGE.hi },
  hu: { flag: '🇭🇺', label: LANGUAGES_IN_OWN_LANGUAGE.hu },
  it: { flag: '🇮🇹', label: LANGUAGES_IN_OWN_LANGUAGE.it },
  ja: { flag: '🇯🇵', label: LANGUAGES_IN_OWN_LANGUAGE.ja },
  ko: { flag: '🇰🇷', label: LANGUAGES_IN_OWN_LANGUAGE.ko },
  pl: { flag: '🇵🇱', label: LANGUAGES_IN_OWN_LANGUAGE.pl },
  pt: { flag: '🇵🇹', label: LANGUAGES_IN_OWN_LANGUAGE.pt },
  ru: { flag: '🇷🇺', label: LANGUAGES_IN_OWN_LANGUAGE.ru },
  tr: { flag: '🇹🇷', label: LANGUAGES_IN_OWN_LANGUAGE.tr },
  zh: { flag: '🇨🇳', label: LANGUAGES_IN_OWN_LANGUAGE.zh },
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
