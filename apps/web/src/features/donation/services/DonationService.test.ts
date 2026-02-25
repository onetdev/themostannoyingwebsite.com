import { DonationBalanceConfig } from '../types';
import { DonationService, getDonationService } from './DonationService';

import { getDependencyContainer } from '@/dependency-container';

describe('DonationService', () => {
  const container = getDependencyContainer();
  let service: DonationService;
  let mockTranslate: jest.Mock;

  beforeEach(() => {
    service = getDonationService(container);
    mockTranslate = jest.fn((key: string) => {
      // Mock translation function
      const translations: Record<string, string> = {
        'beggingBanner.prefix': '🚨 Support Needed:',
        'beggingBanner.linkText': 'Help us survive →',
        'beggingBanner.messages.catJudging':
          'My imaginary cat is judging me...',
        'beggingBanner.messages.rentDue': 'The rent is due...',
        'beggingBanner.messages.codeTherapy': 'My code needs therapy...',
        'beggingBanner.messages.futureSelf': 'Past me made commitments...',
        'beggingBanner.messages.pretendSuccessful': 'Just for one day...',
        'beggingBanner.messages.validationNeeded': 'My therapist says...',
        'beggingBanner.messages.ramenUpgrade': 'I want to upgrade my ramen...',
      };
      return translations[key] || key;
    });
  });

  describe('getBeggingBannerData', () => {
    it('should return banner data with translated strings', () => {
      const result = service.getBeggingBannerData(mockTranslate, 0);

      expect(result).toEqual({
        message: 'My imaginary cat is judging me...',
        prefix: '🚨 Support Needed:',
        linkText: 'Help us survive →',
      });
      expect(mockTranslate).toHaveBeenCalledWith(
        'beggingBanner.messages.catJudging',
      );
      expect(mockTranslate).toHaveBeenCalledWith('beggingBanner.prefix');
      expect(mockTranslate).toHaveBeenCalledWith('beggingBanner.linkText');
    });

    it('should select message deterministically based on month', () => {
      // Test each month to ensure consistent selection
      const month0 = service.getBeggingBannerData(mockTranslate, 0);
      const month1 = service.getBeggingBannerData(mockTranslate, 1);
      const month2 = service.getBeggingBannerData(mockTranslate, 2);

      expect(month0.message).toBe('My imaginary cat is judging me...');
      expect(month1.message).toBe('The rent is due...');
      expect(month2.message).toBe('My code needs therapy...');
    });

    it('should cycle through messages using modulo', () => {
      // Month 7 (August) should wrap around (7 % 7 = 0)
      const month7 = service.getBeggingBannerData(mockTranslate, 7);
      expect(month7.message).toBe('My imaginary cat is judging me...');

      // Month 8 (September) should be index 1 (8 % 7 = 1)
      const month8 = service.getBeggingBannerData(mockTranslate, 8);
      expect(month8.message).toBe('The rent is due...');
    });

    it('should use current month when no month is provided', () => {
      const result = service.getBeggingBannerData(mockTranslate);

      // Should return valid banner data with translated strings
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('prefix');
      expect(result).toHaveProperty('linkText');
      expect(mockTranslate).toHaveBeenCalled();
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
      expect(balanceNow).toBeLessThan(baseConfig.totalDonationInEuro);
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
