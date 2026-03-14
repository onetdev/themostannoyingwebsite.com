import * as z from 'zod';

// IMPORTANT! This is just a static enforcement of dot notation type
// During runtime it will be handled as a regular string.
// Reason? Performance overhead and the fact that we have only static data atm.
export const TranslationKeySchema = z.custom<AppTranslationKey>();

export type TranslationKey = z.infer<typeof TranslationKeySchema>;
