import { useDiContext } from '@/core/di/react-di';
import { Symbols } from '@/core/di/symbols';
import type { AppService } from '../services/AppService';

export const useAppService = () => {
  const { container } = useDiContext();
  return container.get<AppService>(Symbols.KernelService);
};
