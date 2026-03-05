import 'reflect-metadata';
import { Container } from 'inversify';
import type { DonationBalanceConfig } from '../types';
import { DI } from '../types';
import { DonationService, getDonationService } from './DonationService';

describe('DonationService', () => {
  let container: Container;
  let service: DonationService;

  beforeEach(() => {
    container = new Container();
    container.bind<DonationService>(DI.DonationService).to(DonationService);
    service = getDonationService(container);
  });

  describe('getBeggingBannerData', () => {
    it('should return banner data with translation keys', () => {
      const result = service.getBeggingBannerData(0);

      expect(result).toEqual({
        messageKey: 'donate.beggingBanner.messages.catJudging',
        prefixKey: 'donate.beggingBanner.prefix',
        linkTextKey: 'donate.beggingBanner.linkText',
      });
    });

    it('should select message key deterministically based on month', () => {
      // Test each month to ensure consistent selection
      const month0 = service.getBeggingBannerData(0);
      const month1 = service.getBeggingBannerData(1);
      const month2 = service.getBeggingBannerData(2);

      expect(month0.messageKey).toBe(
        'donate.beggingBanner.messages.catJudging',
      );
      expect(month1.messageKey).toBe('donate.beggingBanner.messages.rentDue');
      expect(month2.messageKey).toBe(
        'donate.beggingBanner.messages.codeTherapy',
      );
    });

    it('should cycle through messages using modulo', () => {
      // MESSAGE_KEYS length is 7
      // Month 7 (August) should wrap around (7 % 7 = 0)
      const month7 = service.getBeggingBannerData(7);
      expect(month7.messageKey).toBe(
        'donate.beggingBanner.messages.catJudging',
      );

      // Month 8 (September) should be index 1 (8 % 7 = 1)
      const month8 = service.getBeggingBannerData(8);
      expect(month8.messageKey).toBe('donate.beggingBanner.messages.rentDue');
    });

    it('should use current month when no month is provided', () => {
      const result = service.getBeggingBannerData();

      // Should return valid banner data with translation keys
      expect(result).toHaveProperty('messageKey');
      expect(result).toHaveProperty('prefixKey');
      expect(result).toHaveProperty('linkTextKey');
    });
  });

  describe('shouldShowBeggingBanner', () => {
    it('should return true for day 1 of the month', () => {
      const date = new Date('2025-01-01');
      expect(service.shouldShowBeggingBanner(date)).toBe(true);
    });

    it('should return true for day 10 of the month', () => {
      const date = new Date('2025-01-10');
      expect(service.shouldShowBeggingBanner(date)).toBe(true);
    });

    it('should return true for days in the middle (day 5)', () => {
      const date = new Date('2025-01-05');
      expect(service.shouldShowBeggingBanner(date)).toBe(true);
    });

    it('should return false for day 11 of the month', () => {
      const date = new Date('2025-01-11');
      expect(service.shouldShowBeggingBanner(date)).toBe(false);
    });

    it('should return false for day 15 of the month', () => {
      const date = new Date('2025-01-15');
      expect(service.shouldShowBeggingBanner(date)).toBe(false);
    });

    it('should return false for the last day of the month', () => {
      const date = new Date('2025-01-31');
      expect(service.shouldShowBeggingBanner(date)).toBe(false);
    });

    it('should work correctly across different months', () => {
      expect(service.shouldShowBeggingBanner(new Date('2025-02-05'))).toBe(
        true,
      );
      expect(service.shouldShowBeggingBanner(new Date('2025-03-15'))).toBe(
        false,
      );
      expect(service.shouldShowBeggingBanner(new Date('2025-12-01'))).toBe(
        true,
      );
    });

    it('should use current date when no date is provided', () => {
      // This test just ensures the method doesn't throw without a date
      const result = service.shouldShowBeggingBanner();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('calculateBalance', () => {
    const baseConfig: DonationBalanceConfig = {
      costStartEpoch: 1704067200, // 2024-01-01 00:00:00 UTC
      costDailyAvgInEuro: 10,
      totalDonationInEuro: 500,
    };

    it('should return total donations when no time has elapsed', () => {
      const balance = service.calculateBalance(
        baseConfig,
        baseConfig.costStartEpoch,
      );

      expect(balance).toBe(500);
    });

    it('should calculate balance after 1 day', () => {
      const oneDayLater = baseConfig.costStartEpoch + 24 * 60 * 60;
      const balance = service.calculateBalance(baseConfig, oneDayLater);

      // 500 - 10 = 490 (floored)
      expect(balance).toBe(490);
    });

    it('should calculate balance after 10 days', () => {
      const tenDaysLater = baseConfig.costStartEpoch + 10 * 24 * 60 * 60;
      const balance = service.calculateBalance(baseConfig, tenDaysLater);

      // 500 - 100 = 400
      expect(balance).toBe(400);
    });

    it('should calculate balance after 50 days (balance becomes zero)', () => {
      const fiftyDaysLater = baseConfig.costStartEpoch + 50 * 24 * 60 * 60;
      const balance = service.calculateBalance(baseConfig, fiftyDaysLater);

      // 500 - 500 = 0
      expect(balance).toBe(0);
    });

    it('should calculate negative balance when costs exceed donations', () => {
      const sixtyDaysLater = baseConfig.costStartEpoch + 60 * 24 * 60 * 60;
      const balance = service.calculateBalance(baseConfig, sixtyDaysLater);

      // 500 - 600 = -100
      expect(balance).toBe(-100);
    });

    it('should floor the cumulative cost', () => {
      // 1.5 days elapsed
      const oneAndHalfDaysLater =
        baseConfig.costStartEpoch + 1.5 * 24 * 60 * 60;
      const balance = service.calculateBalance(baseConfig, oneAndHalfDaysLater);

      // Elapsed: 1.5 days
      // Cost: 1.5 * 10 = 15 (as negative: -15)
      // Floor(-15) = -15
      // Balance: -15 + 500 = 485
      expect(balance).toBe(485);
    });

    it('should use current time when no time is provided', () => {
      const balanceNow = service.calculateBalance(baseConfig);

      // Just verify it's a number and reasonable
      expect(typeof balanceNow).toBe('number');
      // Should be less than initial donation since time has passed
      expect(balanceNow).toBeLessThanOrEqual(baseConfig.totalDonationInEuro);
    });

    it('should handle different daily costs', () => {
      const configHighCost: DonationBalanceConfig = {
        ...baseConfig,
        costDailyAvgInEuro: 50,
      };

      const oneDayLater = baseConfig.costStartEpoch + 24 * 60 * 60;
      const balance = service.calculateBalance(configHighCost, oneDayLater);

      // 500 - 50 = 450
      expect(balance).toBe(450);
    });

    it('should handle fractional days correctly', () => {
      // 12 hours (0.5 days)
      const halfDayLater = baseConfig.costStartEpoch + 12 * 60 * 60;
      const balance = service.calculateBalance(baseConfig, halfDayLater);

      // 0.5 days * 10 = 5 (as negative: -5)
      // Floor(-5) = -5
      // Balance: -5 + 500 = 495
      expect(balance).toBe(495);
    });

    it('should calculate correctly with different start epochs', () => {
      const configFutureStart: DonationBalanceConfig = {
        costStartEpoch: 1735689600, // 2025-01-01 00:00:00 UTC
        costDailyAvgInEuro: 10,
        totalDonationInEuro: 1000,
      };

      const oneDayLater = configFutureStart.costStartEpoch + 24 * 60 * 60;
      const balance = service.calculateBalance(configFutureStart, oneDayLater);

      // 1000 - 10 = 990
      expect(balance).toBe(990);
    });
  });
});
