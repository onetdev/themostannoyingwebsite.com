import { z } from 'zod';

import { BillingCycleSchema } from '../value-objects/billing-cycle';

export const SubscriptionPackageSchema = z.object({
  key: z.string(),
  icon: z.string(),
  titleKey: z.string(),
  descriptionKey: z.string(),
  monthlyPriceByCycle: z.record(BillingCycleSchema, z.number()),
  featureIds: z.array(z.string()),
  isPopular: z.boolean().optional(),
});

export type SubscriptionPackage = z.infer<typeof SubscriptionPackageSchema>;
