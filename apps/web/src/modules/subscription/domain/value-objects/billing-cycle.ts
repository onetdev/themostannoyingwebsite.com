import { z } from 'zod';

export const BillingCycleList = ['monthly', 'yearly', 'biyearly'] as const;

export const BillingCycleSchema = z.enum(BillingCycleList);

export type BillingCycle = z.infer<typeof BillingCycleSchema>;
