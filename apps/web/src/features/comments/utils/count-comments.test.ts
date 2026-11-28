import type { Comment } from '../schemas';
import { countComments } from './count-comments';

const makeComment = (id: string, replies: Comment[] = []): Comment => ({
  id,
  name: 'Tester',
  content: 'Hello',
  time: 0,
  likes: 0,
  replies,
});

describe('countComments', () => {
  it('returns zero for an empty thread', () => {
    expect(countComments([])).toBe(0);
  });

  it('counts roots and nested replies', () => {
    const thread = [
      makeComment('root-1', [
        makeComment('reply-1', [makeComment('reply-2')]),
        makeComment('reply-3'),
      ]),
      makeComment('root-2'),
    ];

    expect(countComments(thread)).toBe(5);
  });
});
