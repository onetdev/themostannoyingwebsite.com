'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { User } from '../../domain';
import { LoginUseCaseParams } from '../use-cases';
import { useAuthFormError } from './useAuthFormError';
import { useAuthService } from '../services';

interface LoginFormProps {
  onSuccess?: (user: User) => void;
}

export function useLoginForm({ onSuccess }: LoginFormProps) {
  const logger = useLogger().child({ hook: 'useLoginForm' });
  const authService = useAuthService();
  const methods = useForm<LoginUseCaseParams>();
  const { translate } = useAuthFormError();

  const onSubmit = async (data: LoginUseCaseParams) => {
    try {
      const result = await authService.login(data);
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
