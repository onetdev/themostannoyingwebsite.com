import 'reflect-metadata';

import type {
  ContentApiClient,
  ShortVideo,
  ShortVideoListItem,
} from '@maw/content-sdk';
import { Container } from 'inversify';
import { DI } from '../types';
import { getShortVideoService, ShortVideoService } from './ShortVideoService';

const makeShortVideo = (id: string): ShortVideoListItem =>
  ({
    id,
    slug: id,
    media: [],
  }) as unknown as ShortVideoListItem;

const makeShortVideoDetail = (): ShortVideo =>
  ({
    id: 'short-1',
    slug: 'gummy-bear-fork',
    media: [],
    translations: [],
  }) as unknown as ShortVideo;

describe('ShortVideoService', () => {
  let getBySlugMock: jest.Mock;
  let listMock: jest.Mock;
  let service: ShortVideoService;

  beforeEach(() => {
    getBySlugMock = jest.fn().mockResolvedValue(makeShortVideoDetail());
    listMock = jest.fn();

    const mockClient = {
      shortVideos: {
        getBySlug: getBySlugMock,
        list: listMock,
      },
    } as unknown as ContentApiClient;

    service = new ShortVideoService(mockClient);
  });

  describe('getBySlug', () => {
    it('fetches a short video with the short video cache tag', async () => {
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
          items: [makeShortVideo('a'), makeShortVideo('b')],
        })
        .mockResolvedValueOnce({
          total: 3,
          limit: 100,
          offset: 2,
          items: [makeShortVideo('c')],
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

    it('keeps the pages collected before a failure', async () => {
      listMock
        .mockResolvedValueOnce({
          total: 3,
          limit: 100,
          offset: 0,
          items: [makeShortVideo('a'), makeShortVideo('b')],
        })
        .mockRejectedValueOnce(new Error('Server unavailable'));

      const result = await service.listAll({ lang: 'en' });

      expect(result.map((item) => item.id)).toEqual(['a', 'b']);
    });
  });

  describe('getShortVideoService', () => {
    it('resolves the service from the container', () => {
      const container = new Container();
      container.bind(DI.ShortVideoService).toConstantValue(service);

      expect(getShortVideoService(container)).toBe(service);
    });
  });
});
