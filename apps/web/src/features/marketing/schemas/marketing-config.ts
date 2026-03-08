import { z } from 'zod';
import { LocaleResourceSchema } from '@/schemas';

export const MarketingConfigSchema = z.object({
  assets: z.object({
    dilfFlapsAd: z.string(),
    wanAPhoneAd: z.union([z.string(), LocaleResourceSchema]),
    dilfFullImage: z.string(),
  }),
});

export type MarketingConfig = z.infer<typeof MarketingConfigSchema>;
