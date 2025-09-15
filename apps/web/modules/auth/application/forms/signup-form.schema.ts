import { z } from 'zod';

import { GenderSchema } from '../../domain';

import { ZodTranslator } from '@/kernel';

export function getSignupFormSchema(t: ZodTranslator) {
  return z
    .object({
      firstName: z
        .string()
        .min(1, { error: t('form.validation.error.required') }),
      lastName: z
        .string()
        .min(1, { error: t('form.validation.error.required') }),
      email: z.email({ error: t('form.validation.error.emailInvalid') }),
      password: z
        .string()
        .min(8, { error: t('form.validation.error.passwordMinLength') }),
      passwordConfirmation: z
        .string()
        .min(1, { error: t('form.validation.error.required') }),
      dateOfBirth: z.date().optional(),
      username: z
        .string()
        .min(1, { error: t('form.validation.error.required') }),
      nickname: z.string().optional(),
      consentNewsletter: z.boolean().optional(),
      consentPrivacyPolicy: z.boolean().refine((val) => val === true, {
        error: t('form.validation.error.required'),
      }),
      gender: GenderSchema.optional(),
      countryCode: z
        .string()
        .min(1, { error: t('form.validation.error.required') }),
      phoneNumberCountry: z.string().optional(),
      phoneNumber: z.number().optional(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      error: t('form.validation.error.passwordsDoNotMatch'),
    });
}

export type SignupFormData = z.infer<ReturnType<typeof getSignupFormSchema>>;
