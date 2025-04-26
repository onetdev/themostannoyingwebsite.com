'use client';

import { useForm } from 'react-hook-form';

import { FakeAuthRepository } from '../../infrastructure';
import { passwordReminder, PasswordReminderDto } from '../../usecases';

export function usePasswordReminderForm() {
  const methods = useForm<PasswordReminderDto>();

  const onSubmit = async (data: PasswordReminderDto) => {
    try {
      await passwordReminder(FakeAuthRepository, data);
    } catch (err: unknown) {
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
