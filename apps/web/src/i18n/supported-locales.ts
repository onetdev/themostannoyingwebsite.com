import generatedLocales from '@/root/public/locales.json' with { type: 'json' };
import type { LanguageInfo } from '@/services/use-cases/get-supported-locales';

/**
 * Static list of supported locales, generated at build time by
 * `scripts/build-locales.ts` from the Content API.
 *
 * Reading it synchronously avoids a runtime browser fetch (which is subject to
 * CORS) and guarantees the language selector is populated on first paint.
 * When the Content API is unavailable at build time the generated list contains
 * the bundled English-only fallback.
 */
export const SUPPORTED_LANGUAGES: LanguageInfo[] =
  generatedLocales.items as LanguageInfo[];
