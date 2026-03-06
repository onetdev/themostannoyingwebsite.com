import { z } from 'zod';

export function getNewsletterFormDataSchema(t: ZodTranslator) {
  return z.object({
    email: z
      .email({ error: t('common.validation.error.emailInvalid') })
      .min(1, { error: t('common.validation.error.required') }),
  });
}

export type NewsletterFormData = z.infer<
  ReturnType<typeof getNewsletterFormDataSchema>
>;
