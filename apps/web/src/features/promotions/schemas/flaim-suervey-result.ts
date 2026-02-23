import { z } from 'zod';

export const FlaimSurveyResultList = [
  'cheatDetected',
  'completed',
  'lost',
  'timeout',
] as const;

export const FlaimSurveyResultSchema = z.enum(FlaimSurveyResultList);

export type FlaimSurveyResult = (typeof FlaimSurveyResultList)[number];
