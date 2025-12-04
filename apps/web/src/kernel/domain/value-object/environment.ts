import { z } from 'zod';

const EnvironmentList = ['production', 'preview', 'development'] as const;

export const EnvironmentSchema = z.enum(EnvironmentList);

export type Environment = (typeof EnvironmentList)[number];
