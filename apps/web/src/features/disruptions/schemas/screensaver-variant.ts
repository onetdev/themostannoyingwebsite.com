import { z } from 'zod';

const ScreensaverVariantList = ['bouncingLogo', 'maze'] as const;

export const ScreensaverVariantSchema = z.enum(ScreensaverVariantList);

export type ScreensaverVariant = (typeof ScreensaverVariantList)[number];
