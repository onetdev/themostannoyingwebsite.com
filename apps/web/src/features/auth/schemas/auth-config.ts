import { z } from 'zod';

export const AuthConfigSchema = z.object({
  assets: z.object({
    captchaTile: z.string(),
    captchaRandom: z.array(z.string()),
  }),
});

export type AuthConfig = z.infer<typeof AuthConfigSchema>;
