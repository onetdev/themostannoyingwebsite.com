import 'reflect-metadata';
import { Container } from 'inversify';
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
        messageKey: 'funding.beggingBanner.messages.catJudging',
        prefixKey: 'funding.beggingBanner.prefix',
        linkTextKey: 'funding.beggingBanner.linkText',
      });
    });

    it('should select message key deterministically based on month', () => {
      // Test each month to ensure consistent selection
      const month0 = service.getBeggingBannerData(0);
      const month1 = service.getBeggingBannerData(1);
      const month2 = service.getBeggingBannerData(2);

      expect(month0.messageKey).toBe(
        'funding.beggingBanner.messages.catJudging',
      );
      expect(month1.messageKey).toBe('funding.beggingBanner.messages.rentDue');
      expect(month2.messageKey).toBe(
        'funding.beggingBanner.messages.codeTherapy',
      );
    });

    it('should cycle through messages using modulo', () => {
      // MESSAGE_KEYS length is 7
      // Month 7 (August) should wrap around (7 % 7 = 0)
      const month7 = service.getBeggingBannerData(7);
      expect(month7.messageKey).toBe(
        'funding.beggingBanner.messages.catJudging',
      );

      // Month 8 (September) should be index 1 (8 % 7 = 1)
      const month8 = service.getBeggingBannerData(8);
      expect(month8.messageKey).toBe('funding.beggingBanner.messages.rentDue');
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
});
