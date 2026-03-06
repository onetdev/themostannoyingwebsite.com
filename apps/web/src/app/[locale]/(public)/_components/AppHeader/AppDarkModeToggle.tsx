'use client';

import { DarkModeToggle } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export function AppDarkModeToggle() {
  const t = useTranslations();

  const { resolvedTheme, setTheme } = useTheme();
  const darkModeToggleText = {
    lightMode: t('themeSwitch.lightMode'),
    darkMode: t('themeSwitch.darkMode'),
  };

  return (
    <DarkModeToggle
      className="self-center justify-self-end"
      resolvedTheme={resolvedTheme as AppTheme}
      setTheme={setTheme}
      size="lg"
      text={darkModeToggleText}
    />
  );
}
