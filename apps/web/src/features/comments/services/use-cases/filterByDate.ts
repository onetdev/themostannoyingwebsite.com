import type { Comment } from '../../schemas';

export function filterByDate(tree: Comment[], timestamp: number): Comment[] {
  return tree
    .filter((comment) => comment.time <= timestamp)
    .map((comment) => ({
      ...comment,
      replies: comment.replies ? filterByDate(comment.replies, timestamp) : [],
    }));
}
