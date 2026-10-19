import type { DonationSummary } from '@maw/content-sdk';
import type { CurrencyRate } from '@/core/currency';
import type fundingEnLocale from './i18n/en';

export const DI = {
  DonationService: Symbol.for('DonationService'),
};

export type FundingI18nShape = typeof fundingEnLocale;

/**
 * Fallback base currency used when the currency endpoint's `base` is
 * unavailable (e.g. the Content API is unreachable and seed rates are used).
 * Amounts served by the Content API carry their own currency.
 */
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
 * The content-API donation summary consumed by the donation page. Every
 * monetary value is a currency-tagged amount, so conversion is a frontend
 * display concern handled by `@/core/currency`.
 */
export type FundingDonationSummary = DonationSummary;

/** A preset support tier (its `amount` carries its own currency). */
export type DonationTier = DonationSummary['tiers'][number];

/** A funding goal shown as progress on the hero (its amount carries its own currency). */
export type DonationGoal = DonationSummary['goal'];

/** A currency-tagged amount as served by the Content API. */
export type DonationCurrencyAmount = DonationTier['amount'];

/**
 * A conversion rate relative to the donation base currency, served by the
 * currency endpoint (`client.currency.getRates()`). Structurally identical to the
 * shared `@/core/currency` rate, which is what the conversion helpers consume.
 */
export type DonationRate = CurrencyRate;

export interface BeggingBannerData {
  messageKey: AppTranslationKey;
  prefixKey: AppTranslationKey;
  linkTextKey: AppTranslationKey;
}

export interface DonationService {
  getBeggingBannerData(month?: number): BeggingBannerData;
  shouldShowBeggingBanner(currentDate?: Date): boolean;
}
