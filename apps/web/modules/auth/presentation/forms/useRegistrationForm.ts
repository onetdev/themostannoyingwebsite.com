'use client';

import { useForm } from 'react-hook-form';

import { FakeAuthRepository } from '../../infrastructure';
import { RegisterDto, register as userRegister } from '../../usecases';

export function useRegistrationForm() {
  const methods = useForm<RegisterDto>({
    defaultValues: {
      phoneNumber: 1,
    },
  });

  const onSubmit = async (data: RegisterDto) => {
    try {
      await userRegister(FakeAuthRepository, data);
    } catch (err: unknown) {
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
