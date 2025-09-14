'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthFormError } from './useAuthFormError';
import { User } from '../../domain';
import { useAuthService } from '../services';
import { LoginUseCaseParams } from '../use-cases';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  captcha: z.string().min(1, 'Captcha is required'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSuccess?: (user: User) => void;
}

export function useLoginForm({ onSuccess }: LoginFormProps) {
  const logger = useLogger().child({ hook: 'useLoginForm' });
  const authService = useAuthService();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const { translate } = useAuthFormError();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginPayload: LoginUseCaseParams = {
        ...data,
        remember: data.remember ?? false,
      };

      const result = await authService.login(loginPayload);
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
