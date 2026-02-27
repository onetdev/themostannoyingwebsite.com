import { z } from 'zod';
import type { ZodTranslator } from '@/types';

export function getEventTestFormDataSchema(t: ZodTranslator) {
  return z.object({
    eventType: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
    payload: z.string(),
  });
}

export type EventTestFormData = z.infer<
  ReturnType<typeof getEventTestFormDataSchema>
>;
