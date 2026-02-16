import { z } from 'zod';

import { ZodTranslator } from '@/kernel';

export function getContactFormSchema(t: ZodTranslator) {
  return z.object({
    subject: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
    message: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>;
