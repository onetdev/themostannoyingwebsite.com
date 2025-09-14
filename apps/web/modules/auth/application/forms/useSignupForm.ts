'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthFormError } from './useAuthFormError';
import { GenderSchema, User } from '../../domain';
import { useAuthService } from '../services';
import { RegisterUseCaseParams } from '../use-cases';

const signupFormSchema = z
  .object({
    firstName: z.string().min(1, 'form.validation.error.required'),
    lastName: z.string().min(1, 'form.validation.error.required'),
    email: z
      .string()
      .min(1, 'form.validation.error.required')
      .email('form.validation.error.emailInvalid'),
    password: z.string().min(8, 'form.validation.error.passwordMinLength'),
    passwordConfirmation: z.string().min(1, 'form.validation.error.required'),
    dateOfBirth: z.date().optional(),
    username: z.string().min(1, 'form.validation.error.required'),
    nickname: z.string().optional(),
    consentNewsletter: z.boolean().optional(),
    consentPrivacyPolicy: z.boolean().refine((val) => val === true, {
      message: 'form.validation.error.required',
    }),
    gender: GenderSchema.optional(),
    countryCode: z.string().min(1, 'form.validation.error.required'),
    phoneNumberCountry: z.string().optional(),
    phoneNumber: z
      .number()
      .optional()
      .transform((val) => (val ? Number(val) : undefined)),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'form.validation.error.passwordsDoNotMatch',
  });

export type SignupFormData = z.infer<typeof signupFormSchema>;

export const signupFormDefaultValues: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  dateOfBirth: undefined,
  username: '',
  nickname: '',
  consentNewsletter: false,
  consentPrivacyPolicy: false,
  countryCode: '',
  phoneNumberCountry: undefined,
  phoneNumber: undefined,
};

interface SignupFormProps {
  onSuccess?: (user: User) => void;
}

export function useSignupForm({ onSuccess }: SignupFormProps) {
  const logger = useLogger().child({ hook: 'useSignupForm' });
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: signupFormDefaultValues,
  });
  const { translate } = useAuthFormError();
  const authService = useAuthService();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const registerData: RegisterUseCaseParams = {
        ...data,
        consentNewsletter: Boolean(data.consentNewsletter),
        consentPrivacyPolicy: Boolean(data.consentPrivacyPolicy),
      };

      const result = await authService.register(registerData);
      if (result.success && result.data) {
        onSuccess?.(result.data);
      } else {
        methods.setError('root', {
          message: translate(result.error?.code),
        });
      }
    } catch (err: unknown) {
      logger.warn(err, 'Signup failed');
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
