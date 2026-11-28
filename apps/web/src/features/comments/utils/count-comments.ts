import type { Comment } from '../schemas';

/** Total number of comments in a thread, including every nested reply. */
export function countComments(items: readonly Comment[]): number {
  return items.reduce(
    (total, item) => total + 1 + countComments(item.replies ?? []),
    0,
  );
}
