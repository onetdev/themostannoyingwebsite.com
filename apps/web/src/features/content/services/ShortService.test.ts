import 'reflect-metadata';

import type { ContentApiClient, Short, ShortListItem } from '@maw/content-sdk';
import { Container } from 'inversify';
import { DI } from '../types';
import { getShortService, ShortService } from './ShortService';

const makeShort = (id: string): ShortListItem =>
  ({
    id,
    slug: id,
    media: [],
  }) as unknown as ShortListItem;

const makeShortDetail = (): Short =>
  ({
    id: 'short-1',
    slug: 'gummy-bear-fork',
    media: [],
    translations: [],
  }) as unknown as Short;

describe('ShortService', () => {
  let getBySlugMock: jest.Mock;
  let listMock: jest.Mock;
  let service: ShortService;

  beforeEach(() => {
    getBySlugMock = jest.fn().mockResolvedValue(makeShortDetail());
    listMock = jest.fn();

    const mockClient = {
      shorts: {
        getBySlug: getBySlugMock,
        list: listMock,
      },
    } as unknown as ContentApiClient;

    service = new ShortService(mockClient);
  });

  describe('getBySlug', () => {
    it('fetches a short with the short cache tag', async () => {
      const result = await service.getBySlug('gummy-bear-fork', 'en');

      expect(result?.slug).toBe('gummy-bear-fork');
      expect(getBySlugMock).toHaveBeenCalledWith(
        'gummy-bear-fork',
        { lang: 'en' },
        expect.objectContaining({
          next: expect.objectContaining({
            tags: ['content:shorts'],
          }),
        }),
      );
    });

    it('returns undefined when the request fails', async () => {
      getBySlugMock.mockRejectedValueOnce(new Error('Not found'));

      await expect(service.getBySlug('missing')).resolves.toBeUndefined();
    });
  });

  describe('list', () => {
    it('returns an empty page when the endpoint is unavailable', async () => {
      listMock.mockRejectedValueOnce(new Error('Not found'));

      await expect(service.list({ lang: 'en', limit: 8 })).resolves.toEqual({
        total: 0,
        limit: 8,
        offset: 0,
        items: [],
      });
    });
  });

  describe('listAll', () => {
    it('paginates until every item is collected', async () => {
      listMock
        .mockResolvedValueOnce({
          total: 3,
          limit: 100,
          offset: 0,
          items: [makeShort('a'), makeShort('b')],
        })
        .mockResolvedValueOnce({
          total: 3,
          limit: 100,
          offset: 2,
          items: [makeShort('c')],
        });

      const result = await service.listAll({ lang: 'en' });

      expect(result.map((item) => item.id)).toEqual(['a', 'b', 'c']);
      expect(listMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ lang: 'en', limit: 100, offset: 0 }),
        expect.anything(),
      );
      expect(listMock).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ lang: 'en', limit: 100, offset: 2 }),
        expect.anything(),
      );
    });

    it('returns an empty list when a page fails', async () => {
      listMock.mockRejectedValueOnce(new Error('Not found'));

      await expect(service.listAll({ lang: 'en' })).resolves.toEqual([]);
    });
  });

  describe('getShortService', () => {
    it('resolves the service from the container', () => {
      const container = new Container();
      container.bind(DI.ShortService).toConstantValue(service);

      expect(getShortService(container)).toBe(service);
    });
  });
});
