import {
  filterFutureComments,
  generateCommentTree,
} from './commentTreeGenerator';

describe('commentTreeGenerator', () => {
  const pool = {
    names: ['Alice', 'Bob', 'Charlie'],
    comments: ['Nice post!', 'I disagree.', 'Interesting perspective.'],
  };
  const publishedAt = new Date('2023-01-01T00:00:00Z');
  // ... (rest of existing imports and setup)

  it('generates a tree with the specified root count', () => {
    const rootCount = 5;
    const tree = generateCommentTree('test-seed', publishedAt, {
      pool,
      rootCount,
      maxDepth: 0,
    });

    expect(tree).toHaveLength(rootCount);
  });

  it('is deterministic for the same seed', () => {
    const seed = 'deterministic-seed';
    const tree1 = generateCommentTree(seed, publishedAt, { pool });
    const tree2 = generateCommentTree(seed, publishedAt, { pool });

    expect(tree1).toEqual(tree2);
  });

  it('produces different results for different seeds', () => {
    const tree1 = generateCommentTree('seed-1', publishedAt, { pool });
    const tree2 = generateCommentTree('seed-2', publishedAt, { pool });

    expect(tree1).not.toEqual(tree2);
  });

  it('respects maxDepth', () => {
    // maxDepth = 1 means root + 1 level of replies
    // But wait, in the code:
    // function generateNode(depth: number, ...) {
    //   ...
    //   if (depth < maxDepth) {
    //     node.replies = ... generateNode(depth + 1, ...)
    //   }
    // }
    // If maxDepth = 1:
    // generateNode(0) -> depth(0) < 1 is true -> generates replies with depth 1
    // generateNode(1) -> depth(1) < 1 is false -> no more replies.
    // So maxDepth = 1 means 1 level of replies (total 2 levels: root and its replies).

    const tree = generateCommentTree('depth-seed', publishedAt, {
      pool,
      maxDepth: 1,
      rootCount: 5,
      maxReplies: 2,
    });

    tree.forEach((root) => {
      expect(root.replies).toBeDefined();
      root.replies?.forEach((reply) => {
        // According to the schema we saw, replies of replies should not exist or be stripped.
        // Let's check if they are indeed stripped or undefined.
        expect((reply as any).replies).toBeUndefined();
      });
    });
  });

  it('respects maxTotalNodes by limiting nodes that can have children', () => {
    const rootCount = 1;
    const maxTotalNodes = 5;
    const maxReplies = 10;
    const maxDepth = 2;

    const tree = generateCommentTree('total-nodes-precision', publishedAt, {
      pool,
      maxTotalNodes,
      rootCount,
      maxReplies,
      maxDepth,
    });

    let countedNodes = 0;
    let totalNodes = 0;

    // In our implementation, a node is "counted" if it's NOT a fallback node.
    // Fallback nodes are returned when nodeCount >= maxTotalNodes.
    // However, nodeCount starts at 0 and is incremented AFTER the check.
    // So if maxTotalNodes is 5, nodes with index 0, 1, 2, 3, 4 (in order of generation) are counted.

    const countNodes = (nodes: any[]) => {
      nodes.forEach((node) => {
        totalNodes++;
        if (node.replies && node.replies.length > 0) {
          countedNodes++;
          countNodes(node.replies);
        }
      });
    };

    countNodes(tree);

    // The number of nodes that HAVE replies should be at most maxTotalNodes.
    // Actually, it's more like: the number of nodes that ATTEMPTED to have replies is capped.
    // If a node is "normal", it increments nodeCount and then MAY generate replies if depth < maxDepth.
    expect(countedNodes).toBeLessThanOrEqual(maxTotalNodes);
  });

  it('calculates time correctly for roots and replies', () => {
    const tree = generateCommentTree('time-seed', publishedAt, {
      pool,
      rootCount: 1,
      maxDepth: 1,
      maxReplies: 1,
    });

    const root = tree[0];
    const TWO_MONTHS_MS = 60 * 24 * 60 * 60 * 1000;
    const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

    expect(root.time).toBeGreaterThanOrEqual(publishedAt.getTime());
    expect(root.time).toBeLessThanOrEqual(
      publishedAt.getTime() + TWO_MONTHS_MS,
    );

    if (root.replies && root.replies.length > 0) {
      const reply = root.replies[0];
      expect(reply.time).toBe(root.time + ONE_MONTH_MS);
    }
  });

  it('generates valid IDs and non-negative likes/time', () => {
    const tree = generateCommentTree('validity-seed', publishedAt, { pool });

    tree.forEach((node) => {
      expect(node.id).toBeDefined();
      expect(typeof node.id).toBe('string');
      expect(node.time).toBeGreaterThanOrEqual(publishedAt.getTime());
      expect(node.likes).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('filterFutureComments', () => {
  it('removes future comments from the root', () => {
    const now = 1000;
    const tree = [
      { id: '1', name: 'A', content: 'C', time: 500, likes: 0, replies: [] },
      { id: '2', name: 'B', content: 'C', time: 1500, likes: 0, replies: [] },
    ];

    const filtered = filterFutureComments(tree, now);
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

    const filtered = filterFutureComments(tree, now);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].replies).toHaveLength(1);
    expect(filtered[0].replies![0].id).toBe('1-1');
  });

  it('returns an empty array if all comments are in the future', () => {
    const now = 1000;
    const tree = [
      { id: '1', name: 'A', content: 'C', time: 1500, likes: 0, replies: [] },
    ];

    const filtered = filterFutureComments(tree, now);
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

    const filtered = filterFutureComments(tree, now);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].replies).toEqual([]);
  });
});
