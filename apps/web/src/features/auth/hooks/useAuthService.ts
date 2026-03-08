'use client';

import { useDiContext } from '@/core/di/react-di';
import type { AuthService } from '../services/AuthService';
import { DI } from '../types';

export const useAuthService = () => {
  const { container } = useDiContext();
  return container.get<AuthService>(DI.AuthService);
};
