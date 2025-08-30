import { z } from 'zod';

export const CountrySchema = z.object({
  code: z.string().min(2).max(2),
  name: z.string().min(2).max(100),
  localName: z.string().min(2).max(100),
  phone: z.string().min(2).max(20),
});

export type Country = z.infer<typeof CountrySchema>;
