import {
  createPagination,
  DEFAULT_MAX_PAGE,
  getPaginationItems,
} from './pagination';

describe('createPagination', () => {
  const pagination = createPagination({ pageSize: 10, basePath: '/authors' });

  it('derives the page count from the total, with a one-page minimum', () => {
    expect(pagination.getPageCount(0)).toBe(1);
    expect(pagination.getPageCount(1)).toBe(1);
    expect(pagination.getPageCount(10)).toBe(1);
    expect(pagination.getPageCount(11)).toBe(2);
    expect(pagination.getPageCount(30)).toBe(3);
  });

  it('computes the offset for a page', () => {
    expect(pagination.getOffset(1)).toBe(0);
    expect(pagination.getOffset(2)).toBe(10);
    expect(pagination.getOffset(0)).toBe(0);
  });

  it('builds canonical paths from the base path', () => {
    expect(pagination.getPath(1)).toBe('/authors');
    expect(pagination.getPath(2)).toBe('/authors/page/2');
    expect(pagination.getPath(42)).toBe('/authors/page/42');
  });

  it('normalizes trailing and missing base-path slashes', () => {
    const trailing = createPagination({ pageSize: 5, basePath: '/authors//' });
    const missing = createPagination({ pageSize: 5, basePath: 'authors' });
    const root = createPagination({ pageSize: 5, basePath: '/' });

    expect(trailing.getPath(2)).toBe('/authors/page/2');
    expect(missing.getPath(2)).toBe('/authors/page/2');
    expect(root.getPath(1)).toBe('/');
    expect(root.getPath(2)).toBe('/page/2');
  });

  it('accepts positive integers within the supported range', () => {
    expect(pagination.parsePage('1')).toBe(1);
    expect(pagination.parsePage('2')).toBe(2);
    expect(
      createPagination({
        pageSize: 10,
        basePath: '/items',
        maxPage: 5,
      }).parsePage('5'),
    ).toBe(5);
  });

  it.each(['', '0', '-1', '1.5', 'abc', '1e3', undefined])(
    'rejects invalid page input (%p)',
    (value) => {
      expect(pagination.parsePage(value)).toBeUndefined();
    },
  );

  it('rejects pages beyond the configured maximum', () => {
    const capped = createPagination({
      pageSize: 10,
      basePath: '/items',
      maxPage: 5,
    });

    expect(capped.parsePage('6')).toBeUndefined();
    expect(capped.parsePage(String(DEFAULT_MAX_PAGE + 1))).toBeUndefined();
  });
});

describe('getPaginationItems', () => {
  it('returns nothing when there is a single page', () => {
    expect(getPaginationItems(1, 1)).toEqual([]);
    expect(getPaginationItems(1, 0)).toEqual([]);
  });

  it('lists every page when they fit in the window', () => {
    expect(getPaginationItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('collapses the tail near the first page', () => {
    expect(getPaginationItems(1, 10)).toEqual([1, 2, 3, 4, 'ellipsis-end', 10]);
  });

  it('keeps one sibling on each side in the middle', () => {
    expect(getPaginationItems(5, 10)).toEqual([
      1,
      'ellipsis-start',
      4,
      5,
      6,
      'ellipsis-end',
      10,
    ]);
  });

  it('collapses the head near the last page', () => {
    expect(getPaginationItems(10, 10)).toEqual([
      1,
      'ellipsis-start',
      7,
      8,
      9,
      10,
    ]);
  });

  it('clamps an out-of-range current page', () => {
    expect(getPaginationItems(99, 10)).toEqual(getPaginationItems(10, 10));
  });
});
