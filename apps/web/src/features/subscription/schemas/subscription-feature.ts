import * as z from 'zod';
import { TranslationKeySchema } from '@/schemas';

export const SubscriptionFeatureSchema = z.object({
  id: z.string(),
  icon: z.string().optional(),
  titleKey: TranslationKeySchema,
});

export type SubscriptionFeature = z.infer<typeof SubscriptionFeatureSchema>;
