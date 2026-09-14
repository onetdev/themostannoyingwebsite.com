import * as z from 'zod';

export const CommonConfigSchema = z.object({
  assets: z.object({
    adStandard: z.string(),
    adScript: z.string(),
    appIcon: z.string(),
    bannerDefault: z.string(),
    bannerGithub: z.string(),
    socialImage: z.string(),
  }),
  socialLinks: z.object({
    x: z.url(),
    facebook: z.url(),
    youtube: z.url(),
    instagram: z.url(),
    tiktok: z.url(),
  }),
});

export type CommonConfig = z.infer<typeof CommonConfigSchema>;
