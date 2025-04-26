'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { FakeAuthRepository } from '../../infrastructure';
import { passwordReminder, PasswordReminderDto } from '../../usecases';

interface PasswordReminderFormProps {
  onSuccess?: () => void;
}

export function usePasswordReminderForm({
  onSuccess,
}: PasswordReminderFormProps) {
  const logger = useLogger().child({ hook: 'usePasswordReminderForm' });
  const methods = useForm<PasswordReminderDto>();

  const onSubmit = async (data: PasswordReminderDto) => {
    try {
      await passwordReminder(FakeAuthRepository, data);
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
