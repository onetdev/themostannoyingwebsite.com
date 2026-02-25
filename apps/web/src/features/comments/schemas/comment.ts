import { z } from 'zod';

export const CommentSchema: z.ZodType<Comment> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    content: z.string().min(1),
    time: z.number().int().nonnegative(),
    likes: z.number().int().nonnegative(),
    replies: z.array(CommentSchema).optional(),
  }),
);

export type Comment = {
  id: string;
  name: string;
  content: string;
  time: number;
  likes: number;
  replies?: Comment[];
};
