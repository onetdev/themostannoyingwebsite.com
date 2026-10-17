/**
 * A conversion rate relative to a base currency: 1 base unit equals `rate`
 * units of `code`. The base currency itself is never listed (its rate is 1).
 */
export interface CurrencyRate {
  readonly code: string;
  readonly rate: number;
}
