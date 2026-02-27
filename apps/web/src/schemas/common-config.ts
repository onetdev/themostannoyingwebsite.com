import { z } from 'zod';

export const CommonConfigSchema = z.object({
  assets: z.object({
    adStandard: z.string(),
    adScript: z.string(),
    appIcon: z.string(),
    bannerDefault: z.string(),
    bannerGithub: z.string(),
    socialImage: z.string(),
  }),
});

export type CommonConfig = z.infer<typeof CommonConfigSchema>;
