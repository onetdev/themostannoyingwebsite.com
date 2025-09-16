import { z } from 'zod';

import { ZodTranslator } from '@/kernel';

export function getPasswordReminderFormSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ error: t('form.validation.error.emailInvalid') }),
    captcha: z
      .string()
      .min(1, { error: t('form.validation.error.captchaRequired') }),
  });
}

export type PasswordReminderFormData = z.infer<
  ReturnType<typeof getPasswordReminderFormSchema>
>;
