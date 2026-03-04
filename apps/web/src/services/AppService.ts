import { inject, injectable } from 'inversify';
import { CoreSymbols } from '@/core/di/symbols';
import type { CountryRepository } from '@/repositories';
import i18nConfig from '@/root/i18n.config';

export type LanguageInfo = {
  locale: string;
  flag: string;
  labelKey: string;
};

const LANGUAGE_MAP: Record<string, Omit<LanguageInfo, 'locale'>> = {
  en: { flag: '🇺🇸', labelKey: 'settings.userPreferences.languages.en' },
  hu: { flag: '🇭🇺', labelKey: 'settings.userPreferences.languages.hu' },
};

@injectable()
export class AppService {
  @inject(CoreSymbols.CountryRepository)
  private countryRepository!: CountryRepository;

  getAllCountries() {
    return this.countryRepository.findAll();
  }

  getSupportedLanguages(): LanguageInfo[] {
    return i18nConfig.locales.map((locale) => ({
      locale,
      ...LANGUAGE_MAP[locale],
    }));
  }
}
