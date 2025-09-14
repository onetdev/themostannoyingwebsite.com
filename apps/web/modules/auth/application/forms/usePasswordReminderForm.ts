'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthService } from '../services';
import { PasswordReminderUseCaseParams } from '../use-cases';

const passwordReminderFormSchema = z.object({
  email: z.email({ error: 'form.validation.error.emailInvalid' }),
  captcha: z
    .string()
    .min(1, { error: 'form.validation.error.captchaRequired' }),
});

type PasswordReminderFormData = z.infer<typeof passwordReminderFormSchema>;

interface PasswordReminderFormProps {
  onSuccess?: () => void;
}

export function usePasswordReminderForm({
  onSuccess,
}: PasswordReminderFormProps) {
  const logger = useLogger().child({ hook: 'usePasswordReminderForm' });
  const methods = useForm<PasswordReminderFormData>({
    resolver: zodResolver(passwordReminderFormSchema),
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
