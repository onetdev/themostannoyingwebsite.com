'use client';

import { CoreSymbols } from '@/core/di/symbols';
import { useDiContext } from '@/core/react';
import type { AppService } from '../services/AppService';

export const useAppService = () => {
  const { container } = useDiContext();
  return container.get<AppService>(CoreSymbols.AppService);
};
