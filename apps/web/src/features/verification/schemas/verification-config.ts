import { z } from 'zod';

export const VerificationConfigSchema = z.object({
  assets: z.object({
    captchaTile: z.string(),
    captchaRandom: z.array(z.string()),
  }),
});

export type VerificationConfig = z.infer<typeof VerificationConfigSchema>;
