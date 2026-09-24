# ADR 22: API-Served Translations with English-Only Bundled Reference

## Status
Accepted

## Context
The web app supports 15 locales and previously bundled a complete `next-intl` message tree for every locale (`src/i18n/messages/{locale}/` plus `src/features/*/i18n/{locale}`), including large "variant" arrays of fake names, comments, testimonials, and quiz data.

The headless Content API now exposes dedicated endpoints for localized data:

- `client.translations.getByLang(lang, { namespace? })` for full or namespace-sliced message bundles.
- `client.variants.getByType(lang, type)` for dynamic variant pools.
- `client.locales.list()` for supported locale metadata (code, native name, direction).

Keeping a second, static copy of every translated string in the repository therefore duplicates the API's source of truth, inflates the repo and build output, and requires a redeploy for every translation change.

## Decision
Treat the Content API as the runtime source of truth for non-English translations, keeping bundled English only as a reference and fallback.

1.  **English only is bundled.** `src/i18n/messages/en/` and `src/features/*/i18n/en*` remain. They define `AppTranslationShape` and act as the runtime fallback.
2.  **Remote message loading.** `src/core/i18n/request.ts` delegates to `loadMessages()` in `src/core/i18n/load-messages.ts`, which fetches `client.translations.getByLang(locale)` (cached with the `content:translations` tag) and deep-merges the response over the English bundle. On any error it returns the English bundle.
3.  **Variant pools come from the API.** Services use `getVariantPool()` (`client.variants.getByType`) and fall back to the bundled English variant arrays when the API is unavailable.
4.  **Locale metadata is API-backed.** `client.locales.list()` supplies native names; only an English fallback remains bundled. Flag emojis stay bundled because the API does not expose them.
5.  **Non-English MDX pages are out of scope.** Localized static pages (`about`, `privacy-policy`, `terms-of-use`) remain bundled until they migrate to the pages endpoint.

## Consequences
- **Pros**: Removes ~280 duplicated translation files, reduces repo/build size, and lets translations change without an app redeploy.
- **Pros**: Single source of truth shared with the Content API, consistent with how articles, pages, and search already work.
- **Pros**: The English merge guarantees no missing keys at runtime, avoiding `next-intl` missing-message errors.
- **Cons**: Non-English rendering now depends on Content API availability; an outage degrades every non-English locale to English.
- **Cons**: The language switcher's synchronous initial/fallback list only contains English until the API responds.
- **Cons**: Remote bundles are cached (revalidate 1h), so translation changes may take up to the revalidation window to appear.
