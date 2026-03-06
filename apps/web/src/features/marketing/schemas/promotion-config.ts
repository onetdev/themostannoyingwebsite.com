import { z } from 'zod';

export const PromotionConfigSchema = z.object({
  assets: z.object({
    dilfFlapsAd: z.string(),
    wanAPhoneAd: z.string(),
    dilfFullImage: z.string(),
  }),
});

export type PromotionConfig = z.infer<typeof PromotionConfigSchema>;
