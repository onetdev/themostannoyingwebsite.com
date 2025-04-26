'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthError } from './useAuthError';
import { UserType } from '../../domain';
import { FakeAuthRepository } from '../../infrastructure';
import { login, LoginDto } from '../../usecases';

interface LoginFormProps {
  onSuccess?: (user: UserType) => void;
}

export function useLoginForm({ onSuccess }: LoginFormProps) {
  const logger = useLogger().child({ hook: 'useLoginForm' });
  const methods = useForm<LoginDto>();
  const { translate } = useAuthError();

  const onSubmit = async (data: LoginDto) => {
    try {
      const result = await login(FakeAuthRepository, data);
      if (result.success && result.user) {
        onSuccess?.(result.user);
      } else {
        methods.setError('root', {
          message: translate(result.errorCode),
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
