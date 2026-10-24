'use client';

import { DarkModeToggle } from '@maw/ui-lib';
import { useTheme } from '@wrksz/themes/client';
import { useTranslations } from 'next-intl';

export function AppDarkModeToggle() {
  const t = useTranslations();

  const { resolvedTheme, setTheme } = useTheme();
  const darkModeToggleText = {
    lightMode: t('common.themeSwitch.lightMode'),
    darkMode: t('common.themeSwitch.darkMode'),
  };

  return (
    <div className="contents" data-track-section="navigation:theme">
      <DarkModeToggle
        className="self-center justify-self-end"
        resolvedTheme={resolvedTheme}
        setTheme={setTheme}
        size="lg"
        text={darkModeToggleText}
      />
    </div>
  );
}
