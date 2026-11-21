import { createPagination } from '@/core/navigation/pagination';

export const articlesPagination = createPagination({
  pageSize: 16,
  basePath: '/articles',
});
