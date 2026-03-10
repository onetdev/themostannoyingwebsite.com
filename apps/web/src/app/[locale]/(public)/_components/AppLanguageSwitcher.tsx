'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@maw/ui-lib';
import { clsx } from '@maw/ui-lib/utils';
import { useLocale } from 'next-intl';
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

  return (
    <Select value={locale} onValueChange={onLanguageChange}>
      <SelectTrigger className={clsx(className)}>
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
