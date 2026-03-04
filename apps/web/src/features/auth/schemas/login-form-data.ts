import { z } from 'zod';

export function getLoginFormDataSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ message: t('form.validation.error.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
    remember: z
      .boolean()
      .optional()
      .refine((val) => val !== undefined, {
        message: t('form.validation.error.checkboxRequired'),
      }),
    captcha: z
      .string()
      .min(1, { message: t('form.validation.error.captchaRequired') }),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormDataSchema>>;
