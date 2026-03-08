'use client';

import { useMemo } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { useDonationService } from './';

export function useDonationBalance(): number {
  const { funding } = useAppConfigContext();
  const donationService = useDonationService();

  const balance = useMemo(() => {
    return donationService.calculateBalance({
      costStartEpoch: funding.costStartEpoch,
      costDailyAvgInEuro: funding.costDailyAvgInEuro,
      totalDonationInEuro: funding.totalDonationInEuro,
    });
  }, [funding, donationService]);

  return balance;
}
