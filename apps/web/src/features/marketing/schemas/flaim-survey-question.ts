import * as z from 'zod';

export const FlaimSurveyOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export type FlaimSurveyOption = z.infer<typeof FlaimSurveyOptionSchema>;

export const FlaimSurveyQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(FlaimSurveyOptionSchema),
  /** ID of the correct option; omitted when the question has no correct answer. */
  solution: z.string().optional(),
});

export type FlaimSurveyQuestion = z.infer<typeof FlaimSurveyQuestionSchema>;
