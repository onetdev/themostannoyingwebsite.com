'use client';

import { useDependencyContainer } from '@/contexts/DependencyContainer';
import { DI, type DonationService } from '../types';

export const useDonationService = (): DonationService => {
  const { container } = useDependencyContainer();
  return container.get<DonationService>(DI.DonationService);
};
