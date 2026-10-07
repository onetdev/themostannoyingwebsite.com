import { CONTENT_CACHE_TAGS, type ContentApiClient } from '@maw/content-sdk';
import { fetchDonationSummary } from './get-donation-summary';

describe('fetchDonationSummary', () => {
  it('requests the summary with the donation language and cache tag', async () => {
    const summary = { currency: 'EUR' };
    const getSummary = jest.fn().mockResolvedValue(summary);
    const client = {
      donations: { getSummary },
    } as unknown as ContentApiClient;

    const result = await fetchDonationSummary(client, 'en');

    expect(result).toBe(summary);
    expect(getSummary).toHaveBeenCalledWith('en', {
      next: {
        revalidate: 1800,
        tags: [CONTENT_CACHE_TAGS.donation],
      },
    });
  });
});
