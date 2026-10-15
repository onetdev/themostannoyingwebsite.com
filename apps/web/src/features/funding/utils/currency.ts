import { DONATION_BASE_CURRENCY, type DonationRate } from '../types';

/**
 * Currency is a frontend display concern: every donation figure arrives from the
 * content API in the base currency (`DONATION_BASE_CURRENCY`), and this module
 * converts + formats it for the visitor's locale.
 */

/**
 * Fallback rates relative to the base currency (1 base unit = `rate` units),
 * used when the API does not (yet) serve a `rates` table. Kept deliberately
 * small and approximate — these are fictional numbers on a joke site.
 */
export const FALLBACK_RATES: Readonly<Record<string, number>> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  CHF: 0.95,
  SEK: 11.2,
  PLN: 4.3,
  CZK: 25,
  RON: 4.97,
  HUF: 395,
  TRY: 37,
  JPY: 168,
  // Crypto, as approximate units per 1 EUR (used for payment URIs only).
  BTC: 0.0000105,
  ETH: 0.000323,
};

/** Curated region → currency map for the common cases. */
const REGION_CURRENCY: Readonly<Record<string, string>> = {
  US: 'USD',
  GB: 'GBP',
  HU: 'HUF',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  AT: 'EUR',
  IE: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  BE: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  PL: 'PLN',
  CZ: 'CZK',
  RO: 'RON',
  CH: 'CHF',
  SE: 'SEK',
  TR: 'TRY',
  JP: 'JPY',
};

function getRegion(locale: string): string | undefined {
  try {
    const parsed = new Intl.Locale(locale);
    if (parsed.region) {
      return parsed.region;
    }

    return parsed.maximize().region ?? undefined;
  } catch {
    return undefined;
  }
}

function availableCurrencies(
  rates: readonly DonationRate[] | undefined,
  base: string,
): Set<string> {
  const codes = new Set<string>([base, ...Object.keys(FALLBACK_RATES)]);
  for (const rate of rates ?? []) {
    codes.add(rate.code);
  }

  return codes;
}

/**
 * Resolves the currency to display for a locale, preferring the currency of the
 * locale's region and falling back to the base currency. Resolved server-side so
 * SSR and hydration agree.
 */
export function resolveDisplayCurrency(
  locale: string,
  rates?: readonly DonationRate[],
  base: string = DONATION_BASE_CURRENCY,
): string {
  const region = getRegion(locale);
  const candidate = region ? REGION_CURRENCY[region] : undefined;

  if (candidate && availableCurrencies(rates, base).has(candidate)) {
    return candidate;
  }

  return base;
}

/** Minor-unit count for a currency, per `Intl` (e.g. 2 for USD, 0 for HUF). */
export function getCurrencyDecimals(locale: string, currency: string): number {
  return (
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).resolvedOptions().maximumFractionDigits ?? 2
  );
}

/** The localized currency symbol/token (e.g. `$`, `Ft`, `€`). */
export function getCurrencySymbol(locale: string, currency: string): string {
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).formatToParts(0);

  return parts.find((part) => part.type === 'currency')?.value ?? currency;
}

function getRate(
  currency: string,
  rates: readonly DonationRate[] | undefined,
  base: string,
): number {
  if (currency === base) {
    return 1;
  }

  const apiRate = rates?.find((entry) => entry.code === currency)?.rate;
  return apiRate ?? FALLBACK_RATES[currency] ?? 1;
}

export function convertAmount(
  amountInBase: number,
  currency: string,
  rates?: readonly DonationRate[],
  base: string = DONATION_BASE_CURRENCY,
): number {
  return amountInBase * getRate(currency, rates, base);
}

/**
 * Snaps a value to a "charm" price: the nearest round magnitude minus one minor
 * unit (…1999 `Ft`, `4.99` / `29.99`). Used for tier presets so converted
 * amounts read like real price points instead of raw exchange output.
 */
export function charmRound(value: number, decimals: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  const exponent = Math.floor(Math.log10(value));
  const step = 10 ** exponent;
  const rounded = Math.round(value / step) * step;
  const unit = 10 ** -decimals;
  const charmed = rounded - unit;

  return charmed > 0 ? Number(charmed.toFixed(decimals)) : rounded;
}

export type MoneyContext = {
  locale: string;
  currency: string;
  rates?: readonly DonationRate[];
  base?: string;
};

export type FormatMoneyOptions = {
  /** Snap converted amounts to charm prices (tier presets). */
  charm?: boolean;
  /** Force a fixed number of fraction digits (e.g. 0 for large figures). */
  fractionDigits?: number;
};

/**
 * Converts a base-currency amount to the display currency as a plain number
 * (optionally charm-rounded). Used for amount-aware provider links.
 */
export function toDisplayAmount(
  amountInBase: number,
  context: MoneyContext,
  options: FormatMoneyOptions = {},
): number {
  const { locale, currency, rates, base = DONATION_BASE_CURRENCY } = context;
  const { charm = false, fractionDigits } = options;

  const decimals = fractionDigits ?? getCurrencyDecimals(locale, currency);
  const converted = Math.abs(
    convertAmount(amountInBase, currency, rates, base),
  );

  return charm ? charmRound(converted, decimals) : converted;
}

/**
 * Converts a base-currency amount and formats it for the given locale/currency.
 * This is the single formatter every donation figure should go through.
 */
export function formatMoney(
  amountInBase: number,
  context: MoneyContext,
  options: FormatMoneyOptions = {},
): string {
  const { locale, currency } = context;
  const { fractionDigits } = options;
  const decimals = fractionDigits ?? getCurrencyDecimals(locale, currency);
  const sign = amountInBase < 0 ? -1 : 1;
  const value = toDisplayAmount(amountInBase, context, options);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(sign * value);
}
