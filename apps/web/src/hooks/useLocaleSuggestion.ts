'use client';

import * as ct from 'countries-and-timezones';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useLanguageDetectorMessages } from '@/core/i18n/LanguageDetectorMessagesProvider';
import { persistLocaleCookie } from '@/core/i18n/locale-cookie';
import { COUNTRY_LANGUAGE_MAP } from '@/i18n/country-language-map';
import { SUPPORTED_LANGUAGES } from '@/i18n/supported-locales';
import i18nConfig from '@/root/i18n.config';
import { useUserPreferencesStore } from '@/stores';
import { useLanguageSwitcher } from './useLanguageSwitcher';

export function useLocaleSuggestion() {
  const currentLocale = useLocale() as AppLocale;
  const switcher = useLanguageSwitcher();
  const detectorMessages = useLanguageDetectorMessages();
  const [suggestedLocale, setSuggestion] = useState<AppLocale | null>(null);
  const {
    isReady,
    switchLanguageToastDisplayedDate,
    setSwitchLanguageToastDisplayedDate,
  } = useUserPreferencesStore();

  useEffect(() => {
    if (!isReady || switchLanguageToastDisplayedDate) return;

    // 1. Check timezone
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = ct.getCountryForTimezone(timezone);

      if (country?.id && COUNTRY_LANGUAGE_MAP[country.id]) {
        const matchedTimezoneLocale = COUNTRY_LANGUAGE_MAP[country.id];
        if (matchedTimezoneLocale !== currentLocale) {
          setSuggestion(matchedTimezoneLocale);
          return;
        } else {
          // In case the locale is the same as the timezone, we should be fine.
          setSuggestion(null);
          return;
        }
      }
    } catch (_e) {
      // Ignore timezone detection errors
    }

    // 2. Check browser languages
    const browserLanguages = navigator.languages || [navigator.language];
    const matchedBrowserLocale = browserLanguages
      .map((lang) => lang.split('-')[0] as AppLocale)
      .find((lang) => i18nConfig.locales.includes(lang));

    if (matchedBrowserLocale && matchedBrowserLocale !== currentLocale) {
      setSuggestion(matchedBrowserLocale);
      return;
    }
  }, [currentLocale, switchLanguageToastDisplayedDate, isReady]);

  const onAccept = () => {
    if (!suggestedLocale) return;
    persistLocaleCookie(suggestedLocale);
    setSwitchLanguageToastDisplayedDate(new Date().toISOString());
    switcher.onLanguageChange(suggestedLocale);
    setSuggestion(null);
  };

  const onDismiss = () => {
    persistLocaleCookie(currentLocale);
    setSwitchLanguageToastDisplayedDate(new Date().toISOString());
    setSuggestion(null);
  };

  const content = useMemo(() => {
    const nativeName = (locale: AppLocale) =>
      SUPPORTED_LANGUAGES.find((language) => language.locale === locale)
        ?.label ?? locale;
    const interpolate = (template: string | undefined, locale: AppLocale) =>
      template?.replace('{language}', nativeName(locale));

    const suggestedPayload = suggestedLocale
      ? detectorMessages[suggestedLocale]
      : undefined;
    const currentPayload = detectorMessages[currentLocale];

    return suggestedLocale
      ? {
          changeAction: interpolate(suggestedPayload?.switch, suggestedLocale),
          stayAction: interpolate(currentPayload?.stay, currentLocale),
          message: interpolate(suggestedPayload?.detected, suggestedLocale),
        }
      : undefined;
  }, [currentLocale, suggestedLocale, detectorMessages]);

  return {
    content,
    isReady,
    onAccept,
    onDismiss,
    suggestedLocale,
  };
}
