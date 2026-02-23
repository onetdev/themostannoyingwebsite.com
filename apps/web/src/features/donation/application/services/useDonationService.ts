'use client';

import { useMemo } from 'react';

import { createDonationService, DonationService } from './DonationService';

/**
 * Hook to get DonationService instance
 * Creates a new instance per component (not singleton)
 */
export const useDonationService = (): DonationService => {
  return useMemo(() => createDonationService(), []);
};
