import { z } from 'zod';

export const FlaimSurveyQuestionSchema = z.object({
  text: z.string(),
  options: z.array(z.string()),
  solution: z.string().optional(),
});

export type FlaimSurveyQuestion = z.infer<typeof FlaimSurveyQuestionSchema>;
