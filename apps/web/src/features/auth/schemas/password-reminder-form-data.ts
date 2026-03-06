import { z } from 'zod';

export function getPasswordReminderFormDataSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ message: t('common.validation.error.emailInvalid') }),
    captcha: z
      .string()
      .min(1, { message: t('common.validation.error.captchaRequired') }),
  });
}

export type PasswordReminderFormData = z.infer<
  ReturnType<typeof getPasswordReminderFormDataSchema>
>;
