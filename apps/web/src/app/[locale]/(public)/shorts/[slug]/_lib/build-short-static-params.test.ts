import type { ShortListItem } from '@maw/content-sdk';
import { buildShortStaticParams } from './build-short-static-params';

const makeShort = (slug: string) => ({ slug }) as ShortListItem;

describe('buildShortStaticParams', () => {
  it('emits a slug/locale pair for every localized short', async () => {
    const listAll = jest.fn(async (params?: { lang?: string }) => {
      const lang = params?.lang;

      return lang === 'en'
        ? [makeShort('gummy-bear-fork'), makeShort('egg-tower-fail')]
        : [makeShort('gummy-bear-fork')];
    });

    const result = await buildShortStaticParams(['en', 'de'], { listAll });

    expect(result).toEqual([
      { slug: 'gummy-bear-fork', locale: 'en' },
      { slug: 'egg-tower-fail', locale: 'en' },
      { slug: 'gummy-bear-fork', locale: 'de' },
    ]);
  });

  it('returns no params when the endpoint is unavailable', async () => {
    const listAll = jest.fn(async () => []);

    await expect(buildShortStaticParams(['en'], { listAll })).resolves.toEqual(
      [],
    );
  });
});
