import { z } from 'zod';

const CommentBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  content: z.string().min(1),
  time: z.number().int().nonnegative(),
  likes: z.number().int().nonnegative(),
});

export const CommentSchema = CommentBaseSchema.extend({
  replies: z.lazy(() => CommentBaseSchema.array()).optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
