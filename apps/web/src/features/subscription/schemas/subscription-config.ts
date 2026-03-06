import { z } from 'zod';

export const SubscriptionConfigSchema = z.object({
  assets: z.object({}).optional(),
  urgency: z.object({
    discountPercentage: z.number(),
    timeoutSeconds: z.number(),
  }),
  socialProof: z.object({
    minDelayMs: z.number(),
    maxDelayMs: z.number(),
  }),
});

export type SubscriptionConfig = z.infer<typeof SubscriptionConfigSchema>;
