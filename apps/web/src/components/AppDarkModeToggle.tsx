'use client';

import { FunctionComponent } from 'react';

import { DarkModeToggle } from '@maw/ui';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

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
