import type { CurrencyRate } from './types';

/**
 * Locale-aware currency conversion and formatting.
 *
 * Conversion is a display concern: amounts are stored in one base currency and
 * converted for presentation. Nothing here knows about donations (or any other
 * feature) — callers pass the base currency and the rate table explicitly, so
 * the helpers can be reused wherever money is shown in a visitor-selected
 * currency.
 */

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

export type RateContext = {
  /** Currency every amount is stored in. */
  base: string;
  /** Conversion rates relative to `base`. Missing codes are left unconverted. */
  rates?: readonly CurrencyRate[];
};

/** The conversion factor for `currency`, relative to the context's base. */
export function getRate(currency: string, context: RateContext): number {
  if (currency === context.base) {
    return 1;
  }

  return context.rates?.find((entry) => entry.code === currency)?.rate ?? 1;
}

/** Converts an amount from the base currency to `currency`. */
export function convertAmount(
  amountInBase: number,
  currency: string,
  context: RateContext,
): number {
  return amountInBase * getRate(currency, context);
}

/**
 * Snaps a value to a "charm" price: the nearest round magnitude minus one minor
 * unit (…1999 `Ft`, `4.99` / `29.99`). Used for preset price points so converted
 * amounts read like real prices instead of raw exchange output.
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

export type MoneyContext = RateContext & {
  locale: string;
  currency: string;
};

export type FormatMoneyOptions = {
  /** Snap converted amounts to charm prices (preset price points). */
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
  const { locale, currency } = context;
  const { charm = false, fractionDigits } = options;
  const decimals = fractionDigits ?? getCurrencyDecimals(locale, currency);
  const converted = Math.abs(convertAmount(amountInBase, currency, context));

  return charm ? charmRound(converted, decimals) : converted;
}

/**
 * Converts a display-currency amount back into the base currency. Used when a
 * visitor types an amount in their selected currency so downstream consumers
 * keep operating on the base amount.
 */
export function toBaseAmount(
  amountInDisplayCurrency: number,
  context: Omit<MoneyContext, 'locale'>,
): number {
  return amountInDisplayCurrency / getRate(context.currency, context);
}

/**
 * Converts a base-currency amount and formats it for the given locale/currency.
 * This is the single formatter every monetary figure should go through.
 */
export function formatMoney(
  amountInBase: number,
  context: MoneyContext,
  options: FormatMoneyOptions = {},
): string {
  const { locale, currency } = context;
  const decimals =
    options.fractionDigits ?? getCurrencyDecimals(locale, currency);
  const sign = amountInBase < 0 ? -1 : 1;
  const value = toDisplayAmount(amountInBase, context, options);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(sign * value);
}

export type DisplayCurrencyOptions = {
  /** Currency that is always offered and listed first. */
  base: string;
  /** Codes that must never be offered (e.g. crypto payment units). */
  exclude?: readonly string[];
};

/**
 * The selectable display currencies: the base first, then the rate table's
 * codes in their served order, minus any excluded codes.
 */
export function getDisplayCurrencies(
  rates: readonly CurrencyRate[] | undefined,
  { base, exclude = [] }: DisplayCurrencyOptions,
): string[] {
  const codes = new Set<string>([base]);

  for (const rate of rates ?? []) {
    if (!exclude.includes(rate.code)) {
      codes.add(rate.code);
    }
  }

  return [...codes];
}
