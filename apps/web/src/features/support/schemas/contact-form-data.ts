import { z } from 'zod';

import type { ZodTranslator } from '@/types';

export function getContactFormDataSchema(t: ZodTranslator) {
  return z.object({
    subject: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
    message: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
  });
}

export type ContactFormData = z.infer<
  ReturnType<typeof getContactFormDataSchema>
>;
