import { idFromRand, mulberry32, stringToSeed } from '@maw/utils/seed';

import { type Comment, CommentSchema } from '../../schemas';

export interface SeededCommentsOptions {
  pool: {
    names: string[];
    comments: string[];
  };
  maxDepth?: number;
  maxReplies?: number;
  rootCount?: number;
  maxTotalNodes?: number;
}

export function generateTree(
  identifier: string,
  publishedAt: Date,
  {
    pool,
    maxDepth = 1,
    maxReplies = 4,
    rootCount = 10,
    maxTotalNodes = 15,
  }: SeededCommentsOptions,
) {
  const seed = stringToSeed(identifier);
  const rand = mulberry32(seed);

  let nodeCount = 0;

  function randomFrom<T>(arr: T[]) {
    return arr[Math.floor(rand() * arr.length)];
  }

  const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
  const TWO_MONTHS_MS = 60 * 24 * 60 * 60 * 1000;
  const ONE_YEAR_MS = 12 * ONE_MONTH_MS;

  function randomLikes(commentTime: number) {
    const age = commentTime - publishedAt.getTime();
    const factor = Math.max(0, 1 - age / ONE_YEAR_MS);
    return Math.floor(300 * factor * rand() ** 2);
  }

  function generateNode(depth: number, parentTime?: number): Comment {
    const time =
      parentTime === undefined
        ? publishedAt.getTime() + Math.floor(TWO_MONTHS_MS * rand() ** 2)
        : parentTime + ONE_MONTH_MS;

    if (nodeCount >= maxTotalNodes) {
      return {
        id: idFromRand(rand),
        name: randomFrom(pool.names),
        content: randomFrom(pool.comments),
        time,
        likes: randomLikes(time),
        replies: [],
      };
    }

    nodeCount++;

    const node: Comment = {
      id: idFromRand(rand),
      name: randomFrom(pool.names),
      content: randomFrom(pool.comments),
      time,
      likes: randomLikes(time),
      replies: [],
    };

    if (depth < maxDepth) {
      const replyCount = Math.floor(rand() * maxReplies);

      node.replies = Array.from({ length: replyCount }, () =>
        generateNode(depth + 1, time),
      );
    }

    return node;
  }

  const tree = Array.from({ length: rootCount }, () => generateNode(0));

  return CommentSchema.array().parse(tree);
}
