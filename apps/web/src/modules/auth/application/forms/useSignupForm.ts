'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthFormError } from './useAuthFormError';
import { User } from '../../domain';
import { useAuthService } from '../services';
import { RegisterUseCaseParams } from '../use-cases';
import { getSignupFormSchema, SignupFormData } from './signup-form.schema';

import { useZodFormValidator } from '@/kernel';

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
  consentChildSoul: false,
  countryCode: '',
  phoneNumberCountry: undefined,
  phoneNumber: undefined,
  captcha: '',
};

interface SignupFormProps {
  onSuccess?: (user: User) => void;
}

export function useSignupForm({ onSuccess }: SignupFormProps) {
  const logger = useLogger().getSubLogger({ name: 'useSignupForm' });
  const resolver = useZodFormValidator(getSignupFormSchema);
  const methods = useForm<SignupFormData>({
    resolver,
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
