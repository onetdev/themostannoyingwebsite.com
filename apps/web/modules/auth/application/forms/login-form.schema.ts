import { z } from 'zod';

import { getCaptchaEmojiSchema } from './captcha-emoji.schema';

import { ZodTranslator } from '@/kernel';

export function getLoginFormSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ error: t('form.validation.error.emailInvalid') }),
    password: z.string().min(1, { error: t('form.validation.error.required') }),
    captcha: getCaptchaEmojiSchema(t),
    remember: z.boolean().optional(),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormSchema>>;
