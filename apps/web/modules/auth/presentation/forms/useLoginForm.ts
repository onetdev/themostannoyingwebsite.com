'use client';

import { useForm } from 'react-hook-form';

import { FakeAuthRepository } from '../../infrastructure';
import { login, LoginDto } from '../../usecases';

export function useLoginForm() {
  const methods = useForm<LoginDto>();

  const onSubmit = async (data: LoginDto) => {
    try {
      await login(FakeAuthRepository, data);
    } catch (err: unknown) {
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
