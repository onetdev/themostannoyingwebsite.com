import 'reflect-metadata';
import type { Article } from '@maw/content-sdk';
import { getContentPool } from '@/features/content/services/get-content-pool';
import { CommentService } from './CommentService';
import { filterByDate } from './use-cases/filterByDate';
import { generateTree } from './use-cases/generateTree';

jest.mock('@/features/content/services/get-content-pool');
jest.mock('./use-cases/generateTree');
jest.mock('./use-cases/filterByDate');

const getContentPoolMock = getContentPool as jest.MockedFunction<
  typeof getContentPool
>;

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    jest.clearAllMocks();
    // Default to an unreachable API; pools degrade to empty arrays.
    getContentPoolMock.mockResolvedValue(undefined);
    service = new CommentService();
  });

  describe('getByArticle', () => {
    it('should call generateTree and filterByDate with correct arguments', async () => {
      const mockArticle: Partial<Article> = {
        id: '1',
        article_group: 'test-group',
        content: 'test content',
        is_featured: false,
        lang: 'en',
        published_at: '2023-01-01T00:00:00.000Z',
        slug: 'test-article',
        title: 'Test Article',
      };

      const mockTree = [
        {
          id: '1',
          content: 'test',
          publishedAt: Date.now(),
          likes: 0,
          author: 'test',
        },
      ];
      (generateTree as jest.Mock).mockReturnValue(mockTree);
      (filterByDate as jest.Mock).mockReturnValue(mockTree);

      const result = await service.getByArticle(mockArticle as Article);

      expect(generateTree).toHaveBeenCalledWith(
        mockArticle.slug,
        new Date(mockArticle.published_at as string),
        expect.objectContaining({ pool: expect.any(Object) }),
      );
      expect(filterByDate).toHaveBeenCalledWith(mockTree, expect.any(Number));
      expect(result).toEqual(mockTree);
    });

    it('falls back to empty pools when the Content API is unreachable', async () => {
      const mockArticle: Partial<Article> = {
        lang: 'en',
        published_at: '2023-01-01T00:00:00.000Z',
        slug: 'test-article',
      };
      (generateTree as jest.Mock).mockReturnValue([]);
      (filterByDate as jest.Mock).mockReturnValue([]);

      await service.getByArticle(mockArticle as Article);

      expect(generateTree).toHaveBeenCalledWith(
        'test-article',
        expect.any(Date),
        expect.objectContaining({
          pool: { names: [], comments: [] },
        }),
      );
    });

    it('prefers Content API variant pools over bundled translations', async () => {
      getContentPoolMock.mockImplementation(async (_client, _lang, type) => ({
        items: type === 'names' ? ['API Name'] : ['API Comment'],
        updatedAt: '2026-09-01T00:00:00.000Z',
      }));

      const mockArticle: Partial<Article> = {
        lang: 'en',
        published_at: '2023-01-01T00:00:00.000Z',
        slug: 'test-article',
      };
      (generateTree as jest.Mock).mockReturnValue([]);
      (filterByDate as jest.Mock).mockReturnValue([]);

      await service.getByArticle(mockArticle as Article);

      expect(generateTree).toHaveBeenCalledWith(
        'test-article',
        expect.any(Date),
        expect.objectContaining({
          pool: { names: ['API Name'], comments: ['API Comment'] },
        }),
      );
      expect(getContentPoolMock).toHaveBeenCalledWith(
        expect.anything(),
        'en',
        'names',
      );
      expect(getContentPoolMock).toHaveBeenCalledWith(
        expect.anything(),
        'en',
        'comments',
      );
    });
  });

  describe('getByShortVideos', () => {
    it('generates a single-level thread per short, keyed by id', async () => {
      (generateTree as jest.Mock).mockReturnValue([]);
      (filterByDate as jest.Mock).mockReturnValue([]);

      const items = [
        {
          id: 'short-a',
          slug: 'short-a',
          lang: 'en' as const,
          published_at: '2026-11-20T10:00:00.000Z',
        },
        {
          id: 'short-b',
          slug: 'short-b',
          lang: 'en' as const,
          published_at: '2026-11-21T10:00:00.000Z',
        },
      ];

      const result = await service.getByShortVideos(items);

      expect(result).toEqual({ 'short-a': [], 'short-b': [] });
      expect(generateTree).toHaveBeenCalledTimes(2);
      expect(generateTree).toHaveBeenCalledWith(
        'short-a',
        new Date(items[0].published_at),
        expect.objectContaining({
          maxDepth: 1,
          rootCount: 6,
          maxReplies: 2,
          maxTotalNodes: 18,
          now: expect.any(Number),
        }),
      );
      // The pool is fetched once per language (names + comments), not per short.
      expect(getContentPoolMock).toHaveBeenCalledTimes(2);
    });

    it('returns an empty record for an empty feed', async () => {
      await expect(service.getByShortVideos([])).resolves.toEqual({});
      expect(getContentPoolMock).not.toHaveBeenCalled();
    });
  });
});
