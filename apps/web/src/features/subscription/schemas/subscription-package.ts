import { z } from 'zod';
import { TranslationKeySchema } from '@/schemas';
import { BillingCycleSchema } from './billing-cycle';

export const SubscriptionPackageSchema = z.object({
  key: z.string(),
  icon: z.string(),
  titleKey: TranslationKeySchema,
  descriptionKey: TranslationKeySchema,
  monthlyPriceByCycle: z.record(BillingCycleSchema, z.number()),
  featureIds: z.array(z.string()),
  isPopular: z.boolean().optional(),
});

export type SubscriptionPackage = z.infer<typeof SubscriptionPackageSchema>;
