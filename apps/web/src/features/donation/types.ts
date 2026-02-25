export const DI = {
  DonationService: Symbol.for('DonationService'),
};

export interface BeggingBannerData {
  message: string;
  prefix: string;
  linkText: string;
}

export interface DonationBalanceConfig {
  costStartEpoch: number;
  costDailyAvgInEuro: number;
  totalDonationInEuro: number;
}

export interface DonationService {
  getBeggingBannerData(
    t: (key: string) => string,
    month?: number,
  ): BeggingBannerData;
  shouldShowBeggingBanner(currentDate?: Date): boolean;
  calculateBalance(config: DonationBalanceConfig, currentTime?: number): number;
}
