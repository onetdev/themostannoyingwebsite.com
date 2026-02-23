import { z } from 'zod';

import { ZodTranslator } from '@/core/types';

export function getNewsletterFormSchema(t: ZodTranslator) {
  return z.object({
    email: z
      .email({ error: t('form.validation.error.emailInvalid') })
      .min(1, { error: t('form.validation.error.required') }),
  });
}

export type NewsletterFormData = z.infer<typeof getNewsletterFormSchema>;
