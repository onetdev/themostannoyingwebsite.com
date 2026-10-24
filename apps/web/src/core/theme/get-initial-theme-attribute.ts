import type { AppTheme } from '@/schemas';

/**
 * `data-theme` can only hold a concrete color scheme. When the configured
 * default is `system`, omit the attribute so the design system's root tokens
 * apply until the pre-paint bootstrap script resolves the OS preference.
 */
export function getInitialThemeAttribute(
  theme: AppTheme,
): Exclude<AppTheme, 'system'> | undefined {
  return theme === 'system' ? undefined : theme;
}
