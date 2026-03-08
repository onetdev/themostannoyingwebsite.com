import type fundingEnLocale from './i18n/en';

export const DI = {
  DonationService: Symbol.for('DonationService'),
};

export type FundingI18nShape = typeof fundingEnLocale;

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
