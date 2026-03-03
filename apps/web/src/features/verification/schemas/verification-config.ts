import { z } from 'zod';
import { SpriteConfigSchema } from './sprite-config';

export const VerificationConfigSchema = z.object({
  assets: z.object({
    tileChallenge: z.array(z.string()),
    taxonomyChallengeSprites: z.array(SpriteConfigSchema),
  }),
});

export type VerificationConfig = z.infer<typeof VerificationConfigSchema>;
