'use client';

import { useLocale } from 'next-intl';
import { persistLocaleCookie } from '@/core/i18n/locale-cookie';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { track } from '@/core/telemetry';
import { SUPPORTED_LANGUAGES } from '@/i18n/supported-locales';

const LANGUAGE_CONTROL = 'navigation:language';

/**
 * Locale switching plus its two telemetry signals: the language menu opening
 * and a locale actually changing. `section` attributes the switcher surface
 * (`navigation:header`, `navigation:footer`, `settings:preferences`, …).
 */
export function useLanguageSwitcher(section?: string) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = SUPPORTED_LANGUAGES;

  const onLanguageChange = (value: AppLocale | null) => {
    if (value == null) {
      return;
    }

    if (value !== locale) {
      track('nav.locale-change', { locale: value, from: locale, section });
    }

    persistLocaleCookie(value);

    // Might not look sexy, modern BUT it is what we need. And it works,
    // and it doesn't need a shitload of boilerplace throughout server and
    // client side components.
    const alternateLink = document.querySelector(
      `link[rel="alternate"][hreflang="${value}"]`,
    ) as HTMLLinkElement | null;

    if (alternateLink?.href) {
      // We need only the path from the fully qualified URL and then we
      // also need to offset path as well since language must be passed down
      // through the second arg of `push`.
      const url = new URL(alternateLink.href);
      router.push(url.pathname.substring(value.length + 1), { locale: value });
      return;
    }

    router.push(pathname, { locale: value });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      return;
    }
    track('ui.select-open', { control: LANGUAGE_CONTROL, section });
  };

  const currentLanguage = languages.find((l) => l.locale === locale);

  return {
    languages,
    currentLanguage,
    onLanguageChange,
    onOpenChange,
  };
}
