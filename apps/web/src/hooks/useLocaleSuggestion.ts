'use client';

import * as ct from 'countries-and-timezones';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { COUNTRY_TO_LOCALE, LOCALE_DETECTOR_MESSAGES } from '@/i18n/selector';
import i18nConfig from '@/root/i18n.config';
import { useUserPreferencesStore } from '@/stores';
import { useLanguageSwitcher } from './useLanguageSwitcher';

export function useLocaleSuggestion() {
  const currentLocale = useLocale() as AppLocale;
  const switcher = useLanguageSwitcher();
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

      if (country?.id && COUNTRY_TO_LOCALE[country.id]) {
        const matchedTimezoneLocale = COUNTRY_TO_LOCALE[country.id];
        if (matchedTimezoneLocale !== currentLocale) {
          setSuggestion(matchedTimezoneLocale);
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
    setSwitchLanguageToastDisplayedDate(new Date().toISOString());
    switcher.onLanguageChange(suggestedLocale);
    setSuggestion(null);
  };

  const onDismiss = () => {
    setSwitchLanguageToastDisplayedDate(new Date().toISOString());
    setSuggestion(null);
  };

  const content = useMemo(() => {
    const suggestedPayload = suggestedLocale
      ? LOCALE_DETECTOR_MESSAGES[suggestedLocale]
      : null;
    const currentPayload = LOCALE_DETECTOR_MESSAGES[currentLocale];
    return suggestedLocale
      ? {
          changeAction: suggestedPayload?.switch,
          stayAction: currentPayload?.stay,
          message: suggestedPayload?.detected,
        }
      : undefined;
  }, [currentLocale, suggestedLocale]);

  return {
    content,
    isReady,
    onAccept,
    onDismiss,
    suggestedLocale,
  };
}
