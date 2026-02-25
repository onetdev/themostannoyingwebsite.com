import { z } from 'zod';

const AppThemeList = ['light', 'dark'] as const;

export const AppThemeSchema = z.enum(AppThemeList);

export type AppTheme = (typeof AppThemeList)[number];
