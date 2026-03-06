import { z } from 'zod';

export function getEventTestFormDataSchema(t: ZodTranslator) {
  return z.object({
    eventType: z
      .string()
      .min(1, { message: t('common.validation.error.required') }),
    payload: z.string(),
  });
}

export type EventTestFormData = z.infer<
  ReturnType<typeof getEventTestFormDataSchema>
>;
