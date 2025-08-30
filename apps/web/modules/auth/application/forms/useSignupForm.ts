'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthError } from './useAuthError';
import { User } from '../../domain';
import { RegisterUseCaseParams } from '../use-cases';
import { useAuthService } from '../useAuthService';

interface SignupFormProps {
  onSuccess?: (user: User) => void;
}

export function useSignupForm({ onSuccess }: SignupFormProps) {
  const logger = useLogger().child({ hook: 'useSignupForm' });
  const methods = useForm<RegisterUseCaseParams>();
  const { translate } = useAuthError();
  const authService = useAuthService();

  const onSubmit = async (data: RegisterUseCaseParams) => {
    try {
      const result = await authService?.register(data);
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
