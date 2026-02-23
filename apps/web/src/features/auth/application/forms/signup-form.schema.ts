import { z } from 'zod';

import { getCaptchaEmojiSchema } from './captcha-emoji.schema';
import { GenderSchema } from '../../domain';

import { ZodTranslator } from '@/core';

const validatePassword = (value: string, t: ZodTranslator) => {
  // Split up in this way to annoy the user the most
  if (!value.match(/[A-Z]/)) {
    return t('form.validation.error.missingUppercase');
  } else if (!value.match(/[a-z]/)) {
    return t('form.validation.error.missingLowercase');
  } else if (!value.match(/[0-9]/)) {
    return t('form.validation.error.missingNumber');
  } else if (!value.match(/[^A-Za-z0-9]/)) {
    return t('form.validation.error.missingSpecialCharacter');
  }

  const numbers = value.match(/[0-9]/g) ?? [];
  const sumOfNumbers = numbers.map(Number).reduce((a, b) => a + b, 0);
  if (sumOfNumbers < 30) {
    return t('form.validation.error.sumOfNumbersGte', {
      count: 30,
    });
  }

  if (sumOfNumbers % 2) {
    return t('form.validation.error.sumOfNumbersMustBeEven');
  }

  return t('form.validation.error.passwordAlreadyTaken');
};

export function getSignupFormSchema(t: ZodTranslator) {
  return z
    .object({
      firstName: z
        .string()
        .min(1, { message: t('form.validation.error.required') }),
      lastName: z
        .string()
        .min(1, { message: t('form.validation.error.required') }),
      email: z.email({ message: t('form.validation.error.emailInvalid') }),
      password: z
        .string()
        .min(12, {
          message: t('form.validation.error.minLength', { count: 12 }),
        })
        .refine((value) => validatePassword(value, t)),
      passwordConfirmation: z
        .string()
        .min(1, { message: t('form.validation.error.required') }),
      dateOfBirth: z.preprocess(
        (val) => (!val ? undefined : val),
        z.coerce.date().optional(),
      ),
      username: z
        .string()
        .min(1, { message: t('form.validation.error.required') }),
      nickname: z.string().optional(),
      consentNewsletter: z.boolean().optional(),
      consentPrivacyPolicy: z.boolean().refine((val) => val === true, {
        message: t('form.validation.error.checkboxRequired'),
      }),
      consentChildSoul: z.boolean().refine((val) => val === true, {
        message: t('form.validation.error.checkboxRequired'),
      }),
      gender: GenderSchema.optional(),
      countryCode: z
        .string()
        .min(1, { message: t('form.validation.error.required') }),
      phoneNumberCountry: z.string().optional(),
      phoneNumber: z.preprocess(
        (val) => (!val ? undefined : val),
        z.coerce.number().optional(),
      ),
      captcha: getCaptchaEmojiSchema(t),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('form.validation.error.passwordMismatch'),
      path: ['passwordConfirmation'],
    });
}

export type SignupFormData = z.infer<ReturnType<typeof getSignupFormSchema>>;
