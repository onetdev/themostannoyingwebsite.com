import { z } from 'zod';

import { getCaptchaEmojiDataSchema } from './captcha-emoji';

import { ZodTranslator } from '@/types';

export function getLoginFormDataSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ message: t('form.validation.error.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
    captcha: getCaptchaEmojiDataSchema(t),
    remember: z.boolean().optional(),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormDataSchema>>;
