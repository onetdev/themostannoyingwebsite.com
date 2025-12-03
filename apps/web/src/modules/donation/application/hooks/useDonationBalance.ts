export type useDonationBalanceProps = {
  costStartEpoch: number;
  costDailyAvgInEuro: number;
  totalDonationInEuro: number;
};

export function useDonationBalance({
  costStartEpoch,
  costDailyAvgInEuro,
  totalDonationInEuro,
}: useDonationBalanceProps) {
  const cumulativeCost =
    ((new Date().getTime() / 1000 - costStartEpoch) / 24 / 60 / 60) *
    costDailyAvgInEuro *
    -1;
  const balance = Math.floor(cumulativeCost) + totalDonationInEuro;

  return balance;
}
