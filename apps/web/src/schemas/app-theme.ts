import * as z from 'zod';

/**
 * `system` is a preference, not a rendered color scheme: it defers to the OS
 * `prefers-color-scheme` until the user selects `light` or `dark` explicitly.
 */
const AppThemeList = ['light', 'dark', 'system'] as const;

export const AppThemeSchema = z.enum(AppThemeList);

export type AppTheme = (typeof AppThemeList)[number];
