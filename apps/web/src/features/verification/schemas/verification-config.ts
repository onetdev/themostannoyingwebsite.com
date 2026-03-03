import { z } from 'zod';
import { SpriteConfig } from './sprite-config';

export const VerificationConfigSchema = z.object({
  assets: z.object({
    tileChallenge: z.array(z.string()),
    taxonomyChallengeSprites: z.array(SpriteConfig),
  }),
});

export type VerificationConfig = z.infer<typeof VerificationConfigSchema>;
