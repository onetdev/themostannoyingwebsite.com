'use client';

import { useDiContext } from '@/core/react';
import type { AuthService } from '../services/AuthService';
import { DI } from '../types';

export const useAuthService = () => {
  const { container } = useDiContext();
  return container.get<AuthService>(DI.AuthService);
};
