import { CONTENT_CACHE_TAGS, type ContentApiClient } from '@maw/content-sdk';
import { fetchCurrencyRates } from './get-currency-rates';

describe('fetchCurrencyRates', () => {
  it('requests the rates with the currency cache tag', async () => {
    const rates = { base: 'EUR', rates: [{ code: 'USD', rate: 1.08 }] };
    const getRates = jest.fn().mockResolvedValue(rates);
    const client = {
      currency: { getRates },
    } as unknown as ContentApiClient;

    const result = await fetchCurrencyRates(client);

    expect(result).toBe(rates);
    expect(getRates).toHaveBeenCalledWith({
      next: {
        revalidate: 1800,
        tags: [CONTENT_CACHE_TAGS.currency],
      },
    });
  });
});
