import { z } from 'zod';

import { UserSchema } from './User';

export const RegisteredUserSchema = UserSchema.omit({ id: true }).extend({
  password: z.string().min(8),
});

export type RegisterUserType = z.infer<typeof RegisteredUserSchema>;
