import {
  type ContentApiClient,
  ContentApiNetworkError,
  ContentApiNotFoundError,
  type Page,
} from '@maw/content-sdk';
import {
  fetchPrivacyPolicyPage,
  PRIVACY_POLICY_SLUG,
} from './load-privacy-policy';

const makePage = (): Page =>
  ({
    id: 'page-1',
    page_group: PRIVACY_POLICY_SLUG,
    slug: PRIVACY_POLICY_SLUG,
    lang: 'en',
    title: 'Privacy Policy',
    summary: 'How we handle your data.',
    content: '# Privacy Policy',
    author: 'The MAW Team',
    published_at: '2024-10-29T00:00:00Z',
    reading_time_minutes: 9,
    created_at: '2026-11-23 21:14:02',
    updated_at: '2026-11-23T00:00:00Z',
    translations: [],
  }) as unknown as Page;

describe('fetchPrivacyPolicyPage', () => {
  it('fetches the privacy policy with the pages cache tag', async () => {
    const page = makePage();
    const getBySlug = jest.fn().mockResolvedValue(page);
    const client = { pages: { getBySlug } } as unknown as ContentApiClient;

    await expect(fetchPrivacyPolicyPage(client, 'en')).resolves.toBe(page);
    expect(getBySlug).toHaveBeenCalledWith(
      PRIVACY_POLICY_SLUG,
      { lang: 'en' },
      {
        next: {
          revalidate: 1800,
          tags: ['content:pages'],
        },
      },
    );
  });

  it('returns undefined when the page does not exist', async () => {
    const getBySlug = jest
      .fn()
      .mockRejectedValue(new ContentApiNotFoundError('Not found'));
    const client = { pages: { getBySlug } } as unknown as ContentApiClient;

    await expect(fetchPrivacyPolicyPage(client, 'en')).resolves.toBeUndefined();
  });

  it('rethrows network and server failures', async () => {
    const failure = new ContentApiNetworkError(new Error('Network down'));
    const getBySlug = jest.fn().mockRejectedValue(failure);
    const client = { pages: { getBySlug } } as unknown as ContentApiClient;

    await expect(fetchPrivacyPolicyPage(client, 'en')).rejects.toBe(failure);
  });
});
