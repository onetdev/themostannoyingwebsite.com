'use client';

import { useDiContext } from '@/core/di/react/ReactDi';
import { CoreSymbols } from '@/core/di/symbols';
import type { AppService } from '../services/AppService';

export const useAppService = () => {
  const { container } = useDiContext();
  return container.get<AppService>(CoreSymbols.AppService);
};
