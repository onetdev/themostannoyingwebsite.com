import { z } from 'zod';

import { ZodTranslator } from '@/types';

export function getPasswordReminderFormSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ message: t('form.validation.error.emailInvalid') }),
    captcha: z
      .string()
      .min(1, { message: t('form.validation.error.captchaRequired') }),
  });
}

export type PasswordReminderFormData = z.infer<
  ReturnType<typeof getPasswordReminderFormSchema>
>;
