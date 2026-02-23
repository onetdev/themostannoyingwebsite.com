'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { useAuthService } from '../services';
import { PasswordReminderUseCaseParams } from '../use-cases';
import {
  getPasswordReminderFormSchema,
  PasswordReminderFormData,
} from './password-reminder-form.schema';

import { useZodFormValidator } from '@/hooks';

interface PasswordReminderFormProps {
  onSuccess?: () => void;
}

export function usePasswordReminderForm({
  onSuccess,
}: PasswordReminderFormProps) {
  const logger = useLogger().getSubLogger({ name: 'usePasswordReminderForm' });
  const resolver = useZodFormValidator(getPasswordReminderFormSchema);
  const methods = useForm<PasswordReminderFormData>({
    resolver,
  });
  const authService = useAuthService();

  const onSubmit = async (data: PasswordReminderFormData) => {
    try {
      const payload: PasswordReminderUseCaseParams = {
        ...data,
      };
      await authService.passwordReminder(payload);
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
