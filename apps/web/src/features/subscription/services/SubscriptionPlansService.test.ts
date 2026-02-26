import 'reflect-metadata';
import { SubscriptionPlansService } from './SubscriptionPlansService';
import { getFeatures } from './use-cases/get-features';
import { getPlans } from './use-cases/get-plans';

jest.mock('./use-cases/get-features');
jest.mock('./use-cases/get-plans');

describe('SubscriptionPlansService', () => {
  let service: SubscriptionPlansService;

  beforeEach(() => {
    service = new SubscriptionPlansService();
  });

  describe('getFeatures', () => {
    it('should call getFeatures use case', async () => {
      await service.getFeatures();
      expect(getFeatures).toHaveBeenCalled();
    });
  });

  describe('getPlans', () => {
    it('should call getPlans use case', async () => {
      await service.getPlans();
      expect(getPlans).toHaveBeenCalled();
    });
  });
});
