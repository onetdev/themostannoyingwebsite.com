'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@maw/ui-lib';
import { clsx } from 'cn';
import { useLocale, useTranslations } from 'next-intl';
import { useLanguageSwitcher } from '@/hooks';

interface AppLanguageSwitcherProps {
  className?: string;
  displayOnlyFlag?: boolean;
  /** Telemetry surface, e.g. `navigation:header`. */
  section?: string;
}

export function AppLanguageSwitcher({
  className,
  displayOnlyFlag = false,
  section,
}: AppLanguageSwitcherProps) {
  const { onLanguageChange, onOpenChange, languages, currentLanguage } =
    useLanguageSwitcher(section);
  const locale = useLocale();
  const t = useTranslations('common.language');

  return (
    <Select
      value={locale}
      onValueChange={onLanguageChange}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        className={clsx(className)}
        aria-label={t('select')}
        title={t('select')}
        data-track="navigation:language"
        data-track-section={section}
      >
        <SelectValue>
          {currentLanguage?.flag}{' '}
          {currentLanguage !== undefined &&
            !displayOnlyFlag &&
            currentLanguage?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="end"
        className={displayOnlyFlag ? 'w-56' : undefined}
        data-track-section={section}
      >
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
