'use client';

import { DarkModeToggle } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';

export const AppDarkModeToggle: FunctionComponent = () => {
  const t = useTranslations();

  const { resolvedTheme, setTheme } = useTheme();
  const darkModeToggleText = {
    lightMode: t('settings.userPreferences.themeSwitch.lightMode'),
    darkMode: t('settings.userPreferences.themeSwitch.darkMode'),
  };

  return (
    <DarkModeToggle
      className="self-center justify-self-end"
      size="lg"
      resolvedTheme={resolvedTheme as AppTheme}
      setTheme={setTheme}
      text={darkModeToggleText}
    />
  );
};
