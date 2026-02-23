import { z } from 'zod';

export const SubscriptionErrorList = ['UNKNOWN_ERROR'] as const;

export const SubscriptionErrorSchema = z.enum(SubscriptionErrorList);

export type SubscriptionError = (typeof SubscriptionErrorList)[number];
