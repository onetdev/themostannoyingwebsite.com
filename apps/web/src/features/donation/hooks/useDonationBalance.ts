import { useMemo } from 'react';

import { useDonationService } from './';

import { useAppConfig } from '@/contexts/AppConfig';

export function useDonationBalance(): number {
  const { donation } = useAppConfig();
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
