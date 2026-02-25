import { Container, injectable } from 'inversify';

import {
  type BeggingBannerData,
  DI,
  type DonationBalanceConfig,
  type DonationService as IDonationService,
} from '../types';

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

/**
 * DonationService - Utility class for donation-related operations
 */
@injectable()
export class DonationService implements IDonationService {
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

export function getDonationService(container: Container) {
  return container.get<IDonationService>(DI.DonationService);
}
