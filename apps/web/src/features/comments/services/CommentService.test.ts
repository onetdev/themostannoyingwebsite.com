import 'reflect-metadata';
import type { Article } from '@/features/content/types';
import { CommentService } from './CommentService';
import { filterByDate } from './use-cases/filterByDate';
import { generateTree } from './use-cases/generateTree';

jest.mock('./use-cases/generateTree');
jest.mock('./use-cases/filterByDate');

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
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
  });
});
