import { createPagination } from '@/core/navigation/pagination';

export const shortsPagination = createPagination({
  pageSize: 24,
  basePath: '/shorts',
});
