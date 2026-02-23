'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthFormError } from './useAuthFormError';
import { User } from '../schemas';
import { LoginUseCaseParams } from '../services/use-cases';
import { getLoginFormSchema, LoginFormData } from '../schemas/forms';
import { useAuthService } from '../services';

import { useZodFormValidator } from '@/hooks';

interface LoginFormProps {
  onSuccess?: (user: User) => void;
}

export function useLoginForm({ onSuccess }: LoginFormProps) {
  const logger = useLogger().getSubLogger({ name: 'useLoginForm' });
  const authService = useAuthService();
  const resolver = useZodFormValidator(getLoginFormSchema);
  const methods = useForm<LoginFormData>({ resolver });
  const { translate } = useAuthFormError();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginPayload: LoginUseCaseParams = {
        ...data,
        remember: data.remember ?? false,
      };

      const result = await authService.login(loginPayload);
      if (result.success && result.data) {
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
