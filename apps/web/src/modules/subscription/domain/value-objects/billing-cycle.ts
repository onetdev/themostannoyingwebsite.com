import { z } from 'zod';

export const BillingCycleList = ['monthly', 'yearly', 'biyearly'] as const;

export const BILLING_CYCLE_MONTH_MAP: Record<
  (typeof BillingCycleList)[number],
  number
> = {
  monthly: 1,
  yearly: 12,
  biyearly: 24,
};

export const BillingCycleSchema = z.enum(BillingCycleList);

export type BillingCycle = z.infer<typeof BillingCycleSchema>;
