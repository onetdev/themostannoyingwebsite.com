import { z } from 'zod';

import type { ZodTranslator } from '@/types';

export function getCommentFormDataSchema(t: ZodTranslator) {
  return z.object({
    name: z.string().min(1, { message: t('form.validation.error.required') }),
    content: z
      .string()
      .min(1, { message: t('form.validation.error.required') }),
    captcha: z
      .string()
      .min(1, { message: t('form.validation.error.captchaRequired') })
      .regex(/^[XyZ123]{444}$/, {
        message: t('form.validation.error.captchaInvalid'),
      }),
  });
}

export type CommentFormData = z.infer<
  ReturnType<typeof getCommentFormDataSchema>
>;
