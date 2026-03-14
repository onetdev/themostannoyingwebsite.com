'use client';

import { useForm } from 'react-hook-form';
import { useLogger, useZodFormValidator } from '@/hooks';
import { useAuthService } from '../hooks';
import {
  getLoginFormDataSchema,
  type LoginFormData,
  type User,
} from '../schemas';
import type { LoginUseCaseParams } from '../types';
import { useAuthFormError } from './useAuthFormError';

interface LoginFormProps {
  onSuccess?: (user: User) => void;
}

export function useLoginForm({ onSuccess }: LoginFormProps) {
  const logger = useLogger('use-login-form');
  const authService = useAuthService();
  const resolver = useZodFormValidator(getLoginFormDataSchema);
  const methods = useForm<LoginFormData>({ resolver });
  const { translate } = useAuthFormError();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginPayload: LoginUseCaseParams = {
        ...data,
        remember: data.remember ?? false,
      };

      const result = await authService.login(loginPayload);
      if (result.success) {
        onSuccess?.(result.data);
      } else {
        methods.setError('root', {
          message: translate(result.error?.code),
        });
      }
    } catch (err: unknown) {
      logger.warn(err, 'Login failed');
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
