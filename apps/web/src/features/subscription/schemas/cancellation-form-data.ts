import * as z from 'zod';

export function getCancellationFormDataSchema(t: ZodTranslator) {
  return z.object({
    reason: z
      .string()
      .min(1, { message: t('common.validation.error.required') }),
    feedback: z.string().min(3000, {
      message: t('common.validation.error.minLength', { count: 3000 }),
    }),
    email: z
      .string()
      .min(1, { message: t('common.validation.error.required') })
      .email({ message: t('common.validation.error.emailInvalid') }),
  });
}

export type CancellationFormData = z.infer<
  ReturnType<typeof getCancellationFormDataSchema>
>;
