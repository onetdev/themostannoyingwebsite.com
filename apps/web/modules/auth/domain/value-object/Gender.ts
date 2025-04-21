import { z } from 'zod';

export const GenderList = [
  'female',
  'male',
  'other',
  'alien',
  'robot',
  'cyborg',
] as const;

export const GenderSchema = z.enum(GenderList);

export type GenderType = (typeof GenderList)[number];
