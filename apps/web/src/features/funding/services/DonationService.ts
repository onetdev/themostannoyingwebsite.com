import { type Container, injectable } from 'inversify';

import {
  type BeggingBannerData,
  DI,
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
  getBeggingBannerData(month?: number): BeggingBannerData {
    const currentMonth = month ?? new Date().getMonth();
    const messageIndex = currentMonth % MESSAGE_KEYS.length;
    const messageKey = MESSAGE_KEYS[messageIndex];

    return {
      messageKey: `funding.beggingBanner.messages.${messageKey}`,
      prefixKey: 'funding.beggingBanner.prefix',
      linkTextKey: 'funding.beggingBanner.linkText',
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
}

export function getDonationService(container: Container) {
  return container.get<IDonationService>(DI.DonationService);
}
