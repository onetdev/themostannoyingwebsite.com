import { z } from 'zod';

import { ZodTranslator } from '@/types';

export function getCaptchaEmojiDataSchema(t: ZodTranslator) {
  return z
    .string()
    .min(1, { message: t('form.validation.error.captchaRequired') })
    .regex(/^[XyZ123]{444}$/, {
      message: t('form.validation.error.captchaInvalid'),
    });
}

export type CaptchaEmojiData = z.infer<
  ReturnType<typeof getCaptchaEmojiDataSchema>
>;
