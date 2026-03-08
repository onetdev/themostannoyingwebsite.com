import { getFeatures } from './get-features';
import { getPlans } from './get-plans';

describe('Subscription Use Cases', () => {
  describe('getFeatures', () => {
    it('should return a list of subscription features', async () => {
      const result = await getFeatures();
      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0]).toHaveProperty('id');
        expect(result.data[0]).toHaveProperty('titleKey');
        expect(result.data[0]).toHaveProperty('icon');
      }
    });
  });

  describe('getPlans', () => {
    it('should return a list of subscription plans', async () => {
      const result = await getPlans();
      expect(result.success).toBe(true);
      if (result.success && result.data) {
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0]).toHaveProperty('key');
        expect(result.data[0]).toHaveProperty('icon');
        expect(result.data[0]).toHaveProperty('titleKey');
        expect(result.data[0]).toHaveProperty('descriptionKey');
        expect(result.data[0]).toHaveProperty('monthlyPriceByCycle');
        expect(result.data[0]).toHaveProperty('featureIds');
      }
    });
  });
});
