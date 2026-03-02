'use client';

import { useMemo } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { useDonationService } from './';

export function useDonationBalance(): number {
  const { donation } = useAppConfigContext();
  const donationService = useDonationService();

  const balance = useMemo(() => {
    return donationService.calculateBalance({
      costStartEpoch: donation.costStartEpoch,
      costDailyAvgInEuro: donation.costDailyAvgInEuro,
      totalDonationInEuro: donation.totalDonationInEuro,
    });
  }, [donation, donationService]);

  return balance;
}
