'use client';

import { useDiContext } from '@/core/react';
import { DI, type DonationService } from '../types';

export const useDonationService = (): DonationService => {
  const { container } = useDiContext();
  return container.get<DonationService>(DI.DonationService);
};
