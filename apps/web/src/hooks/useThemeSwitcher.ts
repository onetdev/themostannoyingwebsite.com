'use client';

import type { ThemeSelectValue } from '@maw/ui-lib';
import { useTheme } from '@wrksz/themes/client';
import { useTranslations } from 'next-intl';
import { type TelemetrySection, track } from '@/core/telemetry';

const THEME_CONTROL = 'navigation:theme';

/**
 * Theme preference selection plus its telemetry signal. `section` attributes
 * the switcher surface (`navigation:theme`, `settings:preferences`, …).
 *
 * The raw `theme` (which may be `system`) is exposed rather than
 * `resolvedTheme`, so the selector can represent all three states. It is
 * `undefined` until hydration; falling back to `system` keeps the server and
 * first client render identical.
 */
export function useThemeSwitcher(section?: TelemetrySection) {
  const t = useTranslations('common.themeSwitch');
  const { theme, setTheme } = useTheme();

  const onValueChange = (value: ThemeSelectValue) => {
    setTheme(value);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      return;
    }
    track('ui.select-open', { control: THEME_CONTROL, section });
  };

  return {
    onOpenChange,
    onValueChange,
    text: {
      dark: t('dark'),
      label: t('label'),
      light: t('light'),
      system: t('system'),
    },
    value: theme ?? 'system',
  };
}
