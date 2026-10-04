import 'reflect-metadata';

import type { ContentApiClient } from '@maw/content-sdk';
import { Container } from 'inversify';
import { DI } from '../types';
import { AuthorService, getAuthorService } from './AuthorService';

const mockAuthorItem = {
  id: 'aedc2c33-3760-5957-ac6b-e671cef72ff3',
  slug: 'jane-doe',
  name: 'Jane Doe',
  persona: 'The Tester',
  about: 'Jane writes about tests and testing culture.',
};

describe('AuthorService', () => {
  let mockClient: Partial<ContentApiClient>;
  let service: AuthorService;

  beforeEach(() => {
    mockClient = {
      authors: {
        getBySlug: jest.fn().mockResolvedValue(mockAuthorItem),
        listAll: jest.fn().mockResolvedValue([mockAuthorItem]),
      } as unknown as ContentApiClient['authors'],
    };

    service = new AuthorService(mockClient as ContentApiClient);
  });

  describe('getBySlug', () => {
    it('fetches an author by slug with the requested language', async () => {
      const result = await service.getBySlug('jane-doe', 'en');

      expect(result).toBeDefined();
      expect(result?.name).toBe('Jane Doe');
      expect(result?.about).toBe(
        'Jane writes about tests and testing culture.',
      );
      expect(mockClient.authors?.getBySlug).toHaveBeenCalledWith(
        'jane-doe',
        { lang: 'en' },
        expect.anything(),
      );
    });

    it('omits the lang filter when none is provided', async () => {
      await service.getBySlug('jane-doe');

      expect(mockClient.authors?.getBySlug).toHaveBeenCalledWith(
        'jane-doe',
        undefined,
        expect.anything(),
      );
    });

    it('returns undefined if the client throws an error', async () => {
      const authors = mockClient.authors;
      if (authors) {
        (authors.getBySlug as jest.Mock).mockRejectedValueOnce(
          new Error('Not found'),
        );
      }

      const result = await service.getBySlug('missing');
      expect(result).toBeUndefined();
    });
  });

  describe('listAll', () => {
    it('fetches all authors using auto-pagination', async () => {
      const result = await service.listAll({ lang: 'en' });

      expect(result).toHaveLength(1);
      expect(mockClient.authors?.listAll).toHaveBeenCalledWith(
        { lang: 'en' },
        expect.anything(),
      );
    });
  });

  describe('getAuthorService', () => {
    it('resolves AuthorService from the inversify container', async () => {
      const container = new Container();
      container.bind(DI.AuthorService).toConstantValue(service);

      const resolved = await getAuthorService(container);
      expect(resolved).toBe(service);
    });
  });
});
