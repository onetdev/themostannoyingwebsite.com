import { z } from 'zod';
import type { ZodTranslator } from '@/types';

export function getDebugAuthFormDataSchema(t: ZodTranslator) {
  return z.object({
    password: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
  });
}

export type DebugAuthFormData = z.infer<
  ReturnType<typeof getDebugAuthFormDataSchema>
>;
