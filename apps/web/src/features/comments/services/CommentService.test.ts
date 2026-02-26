import 'reflect-metadata';
import type { ArticleDatum } from '@maw/content-api';
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
      const mockArticle: ArticleDatum = {
        slug: 'test-article',
        publishedAt: new Date('2023-01-01'),
        title: 'Test Article',
        assetGroupId: 'test-group',
        content: 'test content',
        isHighlighted: false,
        isOnCover: false,
        locale: 'en',
        url: '/articles/test-article',
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

      const result = await service.getByArticle(mockArticle);

      expect(generateTree).toHaveBeenCalledWith(
        mockArticle.slug,
        mockArticle.publishedAt,
        expect.objectContaining({ pool: expect.any(Object) }),
      );
      expect(filterByDate).toHaveBeenCalledWith(mockTree, expect.any(Number));
      expect(result).toEqual(mockTree);
    });
  });
});
