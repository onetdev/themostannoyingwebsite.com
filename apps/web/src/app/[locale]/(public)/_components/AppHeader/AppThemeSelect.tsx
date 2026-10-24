'use client';

import { ThemeSelect } from '@maw/ui-lib';
import { useThemeSwitcher } from '@/hooks';

const THEME_SECTION = 'navigation:theme';

export function AppThemeSelect() {
  const themeSwitcher = useThemeSwitcher(THEME_SECTION);

  return (
    <div className="contents" data-track-section={THEME_SECTION}>
      <ThemeSelect
        className="self-center justify-self-end"
        displayOnlyIcon
        {...themeSwitcher}
        data-track-control={THEME_SECTION}
        data-track-section={THEME_SECTION}
      />
    </div>
  );
}
