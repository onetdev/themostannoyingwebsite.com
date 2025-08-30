'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthService } from '../services';
import { PasswordReminderUseCaseParams } from '../use-cases';

interface PasswordReminderFormProps {
  onSuccess?: () => void;
}

export function usePasswordReminderForm({
  onSuccess,
}: PasswordReminderFormProps) {
  const logger = useLogger().child({ hook: 'usePasswordReminderForm' });
  const methods = useForm<PasswordReminderUseCaseParams>();
  const authService = useAuthService();

  const onSubmit = async (data: PasswordReminderUseCaseParams) => {
    try {
      await authService?.passwordReminder(data);
      onSuccess?.();
    } catch (err: unknown) {
      logger.warn(err, 'Password reminder failed');
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
