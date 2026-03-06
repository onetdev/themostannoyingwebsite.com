export const DI = {
  DonationService: Symbol.for('DonationService'),
};

export interface BeggingBannerData {
  messageKey: AppTranslationKey;
  prefixKey: AppTranslationKey;
  linkTextKey: AppTranslationKey;
}

export interface DonationBalanceConfig {
  costStartEpoch: number;
  costDailyAvgInEuro: number;
  totalDonationInEuro: number;
}

export interface DonationService {
  getBeggingBannerData(month?: number): BeggingBannerData;
  shouldShowBeggingBanner(currentDate?: Date): boolean;
  calculateBalance(config: DonationBalanceConfig, currentTime?: number): number;
}
