import { z } from 'zod';

export const SubscriptionFeatureSchema = z.object({
  id: z.string(),
  icon: z.string().optional(),
  titleKey: z.string(),
});

export type SubscriptionFeature = z.infer<typeof SubscriptionFeatureSchema>;
