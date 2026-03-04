import { z } from 'zod';
import { ChallengeTypeSchema } from './challenge-type';
import { SpriteConfigSchema } from './sprite-config';

export const VerificationConfigSchema = z.object({
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
  requiredCompletedChallanges: z.number(),
});

export type VerificationConfig = z.infer<typeof VerificationConfigSchema>;
