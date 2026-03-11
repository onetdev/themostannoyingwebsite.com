import { z } from 'zod';

import { ScreensaverVariantSchema } from './screensaver-variant';

export const DisruptionsConfigSchema = z.object({
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
  stickyVideoPlayer: z.object({
    videoUrl: z.url(),
  }),
  deadPixel: z.object({
    rainbowChance: z.number().describe('Floating point value meaning percentage of chance'),
  }),
});

export type DisruptionsConfig = z.infer<typeof DisruptionsConfigSchema>;
