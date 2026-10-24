/**
 * Framework-free pagination math shared by any paginated route.
 *
 * The page-size and path convention live in a `createPagination` instance, so
 * feature-specific modules only declare their own configuration.
 */
export const DEFAULT_MAX_PAGE = 10_000;

export interface CreatePaginationOptions {
  /** Number of items per page. */
  pageSize: number;
  /** Root-relative base path, e.g. `/articles`. Page 1 lives here. */
  basePath: string;
  /** Upper bound for a parsed page number. */
  maxPage?: number;
}

export interface Pagination {
  pageSize: number;
  /** Always at least one page, even for an empty collection. */
  getPageCount(total: number): number;
  getOffset(page: number): number;
  /** Canonical path for a page: base path for page 1, `/page/:page` after. */
  getPath(page: number): string;
  /** Parses a `[page]` segment, rejecting non-integers and out-of-range input. */
  parsePage(value: string | undefined): number | undefined;
}

const normalizeBasePath = (basePath: string): string => {
  const normalized = `/${basePath.replace(/^\/+|\/+$/g, '')}`;

  return normalized === '/' ? '' : normalized;
};

export function createPagination({
  pageSize,
  basePath,
  maxPage = DEFAULT_MAX_PAGE,
}: CreatePaginationOptions): Pagination {
  const base = normalizeBasePath(basePath);

  return {
    pageSize,
    getPageCount(total) {
      if (!Number.isFinite(total) || total <= 0) {
        return 1;
      }

      return Math.ceil(total / pageSize);
    },
    getOffset(page) {
      return Math.max(0, page - 1) * pageSize;
    },
    getPath(page) {
      return page <= 1 ? base || '/' : `${base}/page/${page}`;
    },
    parsePage(value) {
      if (!value || !/^\d+$/.test(value)) {
        return undefined;
      }

      const page = Number(value);

      if (!Number.isSafeInteger(page) || page < 1 || page > maxPage) {
        return undefined;
      }

      return page;
    },
  };
}

export type PaginationItemValue = number | 'ellipsis-start' | 'ellipsis-end';

/**
 * Builds the page-number window shown by a pagination control: the first and
 * last page, the current page plus one neighbour on each side, and ellipses
 * where the window skips pages.
 */
export function getPaginationItems(
  currentPage: number,
  pageCount: number,
  siblingCount = 1,
): PaginationItemValue[] {
  if (pageCount <= 1) {
    return [];
  }

  const current = Math.min(Math.max(currentPage, 1), pageCount);

  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const edgeWindow = siblingCount + 2;
  let start = Math.max(2, current - siblingCount);
  let end = Math.min(pageCount - 1, current + siblingCount);

  if (current <= edgeWindow) {
    start = 2;
    end = Math.min(pageCount - 1, 1 + edgeWindow);
  }

  if (current >= pageCount - edgeWindow + 1) {
    start = Math.max(2, pageCount - edgeWindow);
    end = pageCount - 1;
  }

  const items: PaginationItemValue[] = [1];

  if (start > 2) {
    items.push('ellipsis-start');
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < pageCount - 1) {
    items.push('ellipsis-end');
  }

  items.push(pageCount);

  return items;
}
