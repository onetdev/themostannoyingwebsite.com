import { z } from 'zod';
import { ScreensaverVariantSchema } from '@/features/obstructor/schemas';

export const PRIVATE_PAIN_POINT_LIST = [
  'pageTitle.inactiveMarquee',
  'pageTitle.randomGlitch',
] as const;

export const PrivatePainPointSchema = z.enum(PRIVATE_PAIN_POINT_LIST);
export type PrivatePainPoint = (typeof PRIVATE_PAIN_POINT_LIST)[number];

// The sort of the pain points is important, it might get refactore into
// a weighted struct but it is what it is for now.
export const PUBLIC_PAIN_POINT_LIST = [
  'gifts.oneByOne',
  'gifts.flaps',
  'contentPaywall',
  'mockChat',
  'wheelOfFortune',
  'screensaver',
  'exitPrompt',
  'clipboardMarker',
  'gifts.detectAdblocker',
  'searchDelay',
  'pageTitle.inactiveArrayPaged',
  'deadPixel',
  'achievementNotifications',
  'disableContextMenu',
  'newsletterModal',
  'historySpam',
  'notifications',
  'stickyVideo',
] as const;

export const PublicPainPointSchema = z.enum(PUBLIC_PAIN_POINT_LIST);

export const PAIN_POINT_LIST = [
  ...PRIVATE_PAIN_POINT_LIST,
  ...PUBLIC_PAIN_POINT_LIST,
] as const;

export const PainPointSchema = z.enum(PAIN_POINT_LIST);
export type PainPointKey = (typeof PAIN_POINT_LIST)[number];

export const PainPreferencesStateSchema = z.object({
  flags: z.record(PainPointSchema, z.boolean()),
  publicLevel: z.object({
    current: z.number(),
    max: z.number(),
  }),
  screensaver: z.object({
    timeoutSeconds: z.number(),
    variant: ScreensaverVariantSchema,
  }),
});

export type PainPreferencesState = z.infer<typeof PainPreferencesStateSchema>;
