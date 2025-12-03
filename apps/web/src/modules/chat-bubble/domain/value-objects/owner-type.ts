import { z } from 'zod';

export const OwneTypeList = ['user', 'bot'] as const;

export const OwnerTypeSchema = z.enum(OwneTypeList);

export type OwnerType = (typeof OwneTypeList)[number];
