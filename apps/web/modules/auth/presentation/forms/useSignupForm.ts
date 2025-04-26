'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthError } from './useAuthError';
import { UserType } from '../../domain';
import { FakeAuthRepository } from '../../infrastructure';
import { register, RegisterUserDto } from '../../usecases';

interface SignupFormProps {
  onSuccess?: (user: UserType) => void;
}

export function useSignupForm({ onSuccess }: SignupFormProps) {
  const logger = useLogger().child({ hook: 'useSignupForm' });
  const methods = useForm<RegisterUserDto>();
  const { translate } = useAuthError();

  const onSubmit = async (data: RegisterUserDto) => {
    try {
      const result = await register(FakeAuthRepository, data);
      if (result.success && result.user) {
        onSuccess?.(result.user);
      } else {
        methods.setError('root', {
          message: translate(result.errorCode),
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
