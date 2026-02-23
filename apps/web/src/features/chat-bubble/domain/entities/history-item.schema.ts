import { z } from 'zod';

import { OwnerTypeSchema } from '../value-objects/owner-type';

export const HistoryItemSchema = z.object({
  text: z.string(),
  owner: OwnerTypeSchema,
  time: z.date(),
});

export type HistoryItem = z.infer<typeof HistoryItemSchema>;
