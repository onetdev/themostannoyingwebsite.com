'use client';

import { DarkModeToggle } from '@maw/ui-lib';
import { useTheme } from '@wrksz/themes/client';
import { useTranslations } from 'next-intl';

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
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      size="lg"
      text={darkModeToggleText}
    />
  );
}
