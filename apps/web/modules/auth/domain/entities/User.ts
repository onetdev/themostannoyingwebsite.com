import { z } from 'zod';

import { GenderSchema } from '../value-object/Gender';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nickname: z.string().min(1).optional(),
  username: z.string().min(8),
  consentNewsletter: z.boolean(),
  consentPrivacyPolicy: z.boolean(),
  gender: GenderSchema.optional(),
  dateOfBirth: z.date().optional(),
  countryCode: z.string(),
  phoneNumberCountry: z.string().optional(),
  phoneNumber: z.number().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
