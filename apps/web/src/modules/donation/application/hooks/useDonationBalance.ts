import { useAppConfig } from '@/kernel';

export function useDonationBalance() {
  const { donation } = useAppConfig();

  const cumulativeCost =
    ((new Date().getTime() / 1000 - donation.costStartEpoch) / 24 / 60 / 60) *
    donation.costDailyAvgInEuro *
    -1;
  const balance = Math.floor(cumulativeCost) + donation.totalDonationInEuro;

  return balance;
}
