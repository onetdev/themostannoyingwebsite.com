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
import { useLanguageSwitcher } from '@/hooks';

interface AppLanguageSwitcherProps {
  className?: string;
  displayOnlyFlag?: boolean;
}

export function AppLanguageSwitcher({
  className,
  displayOnlyFlag = false,
}: AppLanguageSwitcherProps) {
  const { onLanguageChange, languages, currentLanguage } =
    useLanguageSwitcher();
  const locale = useLocale();
  const t = useTranslations('language');

  return (
    <Select value={locale} onValueChange={onLanguageChange}>
      <SelectTrigger
        className={clsx(className)}
        aria-label={t('select')}
        title={t('select')}
      >
        <SelectValue>
          {currentLanguage?.flag}{' '}
          {currentLanguage !== undefined &&
            !displayOnlyFlag &&
            currentLanguage?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {languages.map((lang) => (
          <SelectItem key={lang.locale} value={lang.locale}>
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
