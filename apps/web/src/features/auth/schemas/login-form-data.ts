import * as z from 'zod';

export function getLoginFormDataSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ message: t('common.validation.error.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('common.validation.error.required') }),
    remember: z
      .boolean()
      .optional()
      .refine((val) => val !== undefined, {
        message: t('common.validation.error.checkboxRequired'),
      }),
    captcha: z
      .string()
      .min(1, { message: t('common.validation.error.captchaRequired') }),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormDataSchema>>;
