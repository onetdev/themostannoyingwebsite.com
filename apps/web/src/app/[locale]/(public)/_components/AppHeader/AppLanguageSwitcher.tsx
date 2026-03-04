'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@maw/ui-lib';
import { clsx } from '@maw/ui-lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useAppService } from '@/hooks';
import { usePathname, useRouter } from '@/i18n/navigation';

interface AppLanguageSwitcherProps {
  className?: string;
  displayOnlyFlag?: boolean;
}

export function AppLanguageSwitcher({
  className,
  displayOnlyFlag = false,
}: AppLanguageSwitcherProps) {
  const appService = useAppService();
  const t = useTranslations();
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
      router.push(url.pathname.substring(3), { locale: value });
      return;
    }

    router.push(pathname, { locale: value });
  };

  const languages = appService.getSupportedLanguages();
  const currentLanguage = languages.find((l) => l.locale === locale);

  return (
    <Select value={locale} onValueChange={onLanguageChange}>
      <SelectTrigger className={clsx(className)}>
        <SelectValue>
          {currentLanguage?.flag}{' '}
          {currentLanguage !== undefined &&
            !displayOnlyFlag &&
            t(currentLanguage?.labelKey)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {languages.map((lang) => (
          <SelectItem key={lang.locale} value={lang.locale}>
            <span className="mr-2">{lang.flag}</span>
            {t(lang.labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
