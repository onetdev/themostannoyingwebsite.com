import * as z from 'zod';
import { ChallengeTypeSchema } from './challenge-type';
import { SpriteConfigSchema } from './sprite-config';

export const CaptchaConfigSchema = z.object({
  assets: z.object({
    tileChallenge: z.array(z.string()),
    taxonomyChallengeSprites: z.array(SpriteConfigSchema),
  }),
  allowedChallenges: z.array(ChallengeTypeSchema),
  challengeTriggerTimeoutMs: z
    .number()
    .describe(
      'Timeout ms for showing challenge dialog once the user clickcs on the trigger',
    ),
  requiredCompletedChallenges: z.number(),
  tilePuzzleCols: z.number(),
  tilePuzzleRows: z.number(),
  emojiChallengeCount: z.number(),
});

export type CaptchaConfig = z.infer<typeof CaptchaConfigSchema>;
