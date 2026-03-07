import { z } from 'zod';

export const MarketingConfigSchema = z.object({
  assets: z.object({
    dilfFlapsAd: z.string(),
    wanAPhoneAd: z.string(),
    dilfFullImage: z.string(),
  }),
});

export type MarketingConfig = z.infer<typeof MarketingConfigSchema>;
