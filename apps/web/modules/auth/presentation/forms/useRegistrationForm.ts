'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthError } from './useAuthError';
import { UserType } from '../../domain';
import { FakeAuthRepository } from '../../infrastructure';
import { register, RegisterDto } from '../../usecases';

interface RegistrationFormProps {
  onSuccess?: (user: UserType) => void;
}

export function useRegistrationForm({ onSuccess }: RegistrationFormProps) {
  const logger = useLogger().child({ hook: 'useRegistrationForm' });
  const methods = useForm<RegisterDto>();
  const { translate } = useAuthError();

  const onSubmit = async (data: RegisterDto) => {
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
      logger.warn(err, 'Registration failed');
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
