import { z } from 'zod';

import { ScreensaverVariantSchema } from './screensaver-variant';

export const ObstructorConfigSchema = z.object({
  assets: z.object({
    mazeCeiling: z.string(),
    mazeFloor: z.string(),
    mazeWall: z.string(),
    mazeOverlayEasteregg: z.string(),
  }),
  screensaver: z.object({
    defaultTimeoutSeconds: z.number(),
    defaultVariant: ScreensaverVariantSchema,
  }),
});

export type ObstructorConfig = z.infer<typeof ObstructorConfigSchema>;
