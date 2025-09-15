import { z } from 'zod';

import { ZodTranslator } from '@/kernel';

export function getLoginFormSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ error: t('form.validation.error.emailInvalid') }),
    password: z.string().min(1),
    captcha: z.string().min(1),
    remember: z.boolean().optional(),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormSchema>>;
