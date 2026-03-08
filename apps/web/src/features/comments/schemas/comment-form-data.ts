import { z } from 'zod';

export function getCommentFormDataSchema(t: ZodTranslator) {
  return z.object({
    name: z.string().min(1, { message: t('common.validation.error.required') }),
    content: z
      .string()
      .min(1, { message: t('common.validation.error.required') }),
    captcha: z
      .string()
      .min(1, { message: t('common.validation.error.captchaRequired') }),
  });
}

export type CommentFormData = z.infer<
  ReturnType<typeof getCommentFormDataSchema>
>;
