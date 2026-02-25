'use client';

import { DI, type DonationService } from '../types';

import { useDependencyContainer } from '@/contexts/DependencyContainer';

export const useDonationService = (): DonationService => {
  const { container } = useDependencyContainer();
  return container.get<DonationService>(DI.DonationService);
};
