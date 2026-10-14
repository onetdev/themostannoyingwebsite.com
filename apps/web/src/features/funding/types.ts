import type { DonationSummary } from '@maw/content-sdk';
import type fundingEnLocale from './i18n/en';

export const DI = {
  DonationService: Symbol.for('DonationService'),
};

export type FundingI18nShape = typeof fundingEnLocale;

/** Base currency every content-API donation figure is denominated in. */
export const DONATION_BASE_CURRENCY = 'EUR';

/**
 * The content-API donation summary consumed by the donation page. Every figure
 * is denominated in `DONATION_BASE_CURRENCY`; currency conversion is a frontend
 * display concern (see `utils/currency.ts`).
 */
export type FundingDonationSummary = DonationSummary;

/** A preset support tier (amount in the base currency). */
export type DonationTier = DonationSummary['tiers'][number];

/** A funding goal shown as progress on the hero (amount in the base currency). */
export type DonationGoal = DonationSummary['goal'];

/** A static, approximate conversion rate from the base currency. */
export type DonationRate = DonationSummary['rates'][number];

export interface BeggingBannerData {
  messageKey: AppTranslationKey;
  prefixKey: AppTranslationKey;
  linkTextKey: AppTranslationKey;
}

export interface DonationService {
  getBeggingBannerData(month?: number): BeggingBannerData;
  shouldShowBeggingBanner(currentDate?: Date): boolean;
}
