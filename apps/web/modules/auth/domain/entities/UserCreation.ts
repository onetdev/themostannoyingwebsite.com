import { z } from 'zod';

import { UserSchema } from './User';

export const UserCreationSchema = UserSchema.omit({ id: true }).extend({
  password: z.string().min(8),
});

export type UserCreationType = z.infer<typeof UserCreationSchema>;
