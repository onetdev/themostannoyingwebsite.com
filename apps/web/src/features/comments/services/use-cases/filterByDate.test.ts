import { filterByDate } from './filterByDate';

describe('filterByDate', () => {
  it('removes future comments from the root', () => {
    const now = 1000;
    const tree = [
      { id: '1', name: 'A', content: 'C', time: 500, likes: 0, replies: [] },
      { id: '2', name: 'B', content: 'C', time: 1500, likes: 0, replies: [] },
    ];

    const filtered = filterByDate(tree, now);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('1');
  });

  it('removes future comments from nested replies', () => {
    const now = 1000;
    const tree = [
      {
        id: '1',
        name: 'A',
        content: 'C',
        time: 500,
        likes: 0,
        replies: [
          {
            id: '1-1',
            name: 'A',
            content: 'C',
            time: 800,
            likes: 0,
            replies: [],
          },
          {
            id: '1-2',
            name: 'A',
            content: 'C',
            time: 1200,
            likes: 0,
            replies: [],
          },
        ],
      },
    ];

    const filtered = filterByDate(tree, now);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].replies).toHaveLength(1);
    expect(filtered[0].replies![0].id).toBe('1-1');
  });

  it('returns an empty array if all comments are in the future', () => {
    const now = 1000;
    const tree = [
      { id: '1', name: 'A', content: 'C', time: 1500, likes: 0, replies: [] },
    ];

    const filtered = filterByDate(tree, now);
    expect(filtered).toBeDefined();
    expect(filtered).toHaveLength(0);
  });

  it('handles comments with undefined replies', () => {
    const now = 1000;
    const tree = [
      {
        id: '1',
        name: 'A',
        content: 'C',
        time: 500,
        likes: 0,
        replies: undefined,
      } as any,
    ];

    const filtered = filterByDate(tree, now);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].replies).toEqual([]);
  });
});
