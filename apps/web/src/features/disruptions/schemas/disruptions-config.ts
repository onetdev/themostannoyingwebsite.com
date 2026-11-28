import * as z from 'zod';

import { ScreensaverVariantSchema } from './screensaver-variant';

export const CursorKindList = [
  'arrow',
  'pointer',
  'busy',
  'text',
  'help',
  'unavailable',
] as const;

export const CursorKindSchema = z.enum(CursorKindList);

export const CursorHotspotSchema = z.object({
  x: z.number().int().min(0).max(31),
  y: z.number().int().min(0).max(31),
});

export const CursorPresetSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  hotspot: CursorHotspotSchema,
  kind: CursorKindSchema,
});

const DelayRangeSchema = z.object({
  min: z.number().positive(),
  max: z.number().positive(),
});

export const PossessedCursorConfigSchema = z.object({
  cursors: z.array(CursorPresetSchema).min(2),
  firstSwapDelaySeconds: DelayRangeSchema,
  swapDelaySeconds: DelayRangeSchema,
  ghostLifetimeSeconds: DelayRangeSchema,
  maxGhosts: z.number().int().positive(),
  ghostPathSteps: z.object({
    min: z.number().int().min(2),
    max: z.number().int().min(2),
  }),
});

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
  deadPixel: z.object({
    rainbowChance: z
      .number()
      .describe('Floating point value meaning percentage of chance'),
  }),
  possessedCursor: PossessedCursorConfigSchema,
});

export type DisruptionsConfig = z.infer<typeof DisruptionsConfigSchema>;
export type CursorPreset = z.infer<typeof CursorPresetSchema>;
export type CursorKind = z.infer<typeof CursorKindSchema>;
