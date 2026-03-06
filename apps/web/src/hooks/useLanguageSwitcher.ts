'use client';

import { useLocale } from 'next-intl';
import { useAppService } from '@/hooks';
import { usePathname, useRouter } from '@/i18n/navigation';

export function useLanguageSwitcher() {
  const appService = useAppService();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onLanguageChange = (value: string) => {
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

  const languages = appService.getSupportedLanguages();
  const currentLanguage = languages.find((l) => l.locale === locale);

  return {
    languages,
    currentLanguage,
    onLanguageChange,
  };
}
