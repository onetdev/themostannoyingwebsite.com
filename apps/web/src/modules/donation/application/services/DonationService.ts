/**
 * Donation Service
 * Handles begging banner logic, message selection, and balance calculation
 */

const MESSAGE_KEYS = [
  'catJudging',
  'rentDue',
  'codeTherapy',
  'futureSelf',
  'pretendSuccessful',
  'validationNeeded',
  'ramenUpgrade',
] as const;

type MessageKey = (typeof MESSAGE_KEYS)[number];

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

/**
 * DonationService - Utility class for donation-related operations
 * Not a singleton - can be instantiated with different translation functions
 */
export class DonationService {
  /**
   * Get message for the current month
   * Uses month (0-11) as seed for deterministic selection
   * Same month = same message across all page loads
   */
  getBeggingBannerData(
    t: (key: string) => string,
    month?: number,
  ): BeggingBannerData {
    const currentMonth = month ?? new Date().getMonth();
    const messageIndex = currentMonth % MESSAGE_KEYS.length;
    const messageKey = MESSAGE_KEYS[messageIndex];

    return {
      message: t(`beggingBanner.messages.${messageKey}`),
      prefix: t('beggingBanner.prefix'),
      linkText: t('beggingBanner.linkText'),
    };
  }

  /**
   * Check if the begging banner should be visible
   * (Only visible from 1st to 10th of each month)
   */
  shouldShowBeggingBanner(currentDate?: Date): boolean {
    const now = currentDate ?? new Date();
    const dayOfMonth = now.getDate();
    return dayOfMonth >= 1 && dayOfMonth <= 10;
  }

  /**
   * Calculate the current donation balance
   * Balance = Total donations - Cumulative costs
   *
   * @param config - Donation balance configuration
   * @param currentTime - Current timestamp (defaults to now), in seconds
   * @returns The current balance in euros
   */
  calculateBalance(
    config: DonationBalanceConfig,
    currentTime?: number,
  ): number {
    const now = currentTime ?? Date.now() / 1000;
    const elapsedDays = (now - config.costStartEpoch) / (24 * 60 * 60);
    const cumulativeCost = elapsedDays * config.costDailyAvgInEuro * -1;
    const balance = Math.floor(cumulativeCost) + config.totalDonationInEuro;

    return balance;
  }
}

/**
 * Create a new instance of DonationService
 * Can be used without dependency injection
 */
export const createDonationService = (): DonationService => {
  return new DonationService();
};
