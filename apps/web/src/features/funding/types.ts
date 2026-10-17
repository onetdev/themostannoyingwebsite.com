import type { DonationSummary } from '@maw/content-sdk';
import type { CurrencyRate } from '@/core/currency';
import type fundingEnLocale from './i18n/en';

export const DI = {
  DonationService: Symbol.for('DonationService'),
};

export type FundingI18nShape = typeof fundingEnLocale;

/** Base currency every content-API donation figure is denominated in. */
export const DONATION_BASE_CURRENCY = 'EUR';

/**
 * Crypto currencies that are only used to estimate a crypto payment. They are
 * never offered as display currencies in the donation form.
 */
export const DONATION_CRYPTO_CODES = ['BTC', 'ETH'] as const;

/**
 * Static seed rates mirroring the content API's offer, used when the API does
 * not (yet) serve a `rates` table. Kept deliberately small and approximate —
 * these are fictional numbers on a joke site.
 */
export const DONATION_FALLBACK_RATES: readonly CurrencyRate[] = [
  { code: 'USD', rate: 1.08 },
  { code: 'GBP', rate: 0.85 },
  { code: 'JPY', rate: 168 },
  // Crypto, as approximate units per 1 EUR (used for payment URIs only).
  { code: 'BTC', rate: 0.0000105 },
  { code: 'ETH', rate: 0.000323 },
];

/**
 * The content-API donation summary consumed by the donation page. Every figure
 * is denominated in `DONATION_BASE_CURRENCY`; currency conversion is a frontend
 * display concern handled by `@/core/currency`.
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
