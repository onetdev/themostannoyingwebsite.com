import { z } from 'zod';

import { ZodTranslator } from '@/types';

export function getNewsletterFormDataSchema(t: ZodTranslator) {
  return z.object({
    email: z
      .email({ error: t('form.validation.error.emailInvalid') })
      .min(1, { error: t('form.validation.error.required') }),
  });
}

export type NewsletterFormData = z.infer<
  ReturnType<typeof getNewsletterFormDataSchema>
>;
