'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useZodFormValidator } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { type DebugAuthFormData, getDebugAuthFormDataSchema } from '../schemas';

const DEBUG_PASSWORD = 'idontwanttobug';
const STORAGE_KEY = 'maw-debug-authorized';

export const debugAuthFormDefaultValues: DebugAuthFormData = {
  password: '',
};

export function useDebugAuth() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const resolver = useZodFormValidator(getDebugAuthFormDataSchema);
  const methods = useForm<DebugAuthFormData>({
    resolver,
    defaultValues: debugAuthFormDefaultValues,
  });

  useEffect(() => {
    const authorized = localStorage.getItem(STORAGE_KEY) === 'true';
    if (authorized) {
      setIsAuthorized(true);
    }
  }, []);

  const onLogin = async (data: DebugAuthFormData) => {
    if (data.password === DEBUG_PASSWORD) {
      setIsAuthorized(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      methods.setError('password', {
        type: 'manual',
        message: 'Invalid password. Access denied.',
      });
    }
  };

  const logout = () => {
    setIsAuthorized(false);
    localStorage.removeItem(STORAGE_KEY);
    router.push('/');
  };

  return {
    loginForm: methods,
    onLogin,
    logout,
    isAuthorized,
  };
}
