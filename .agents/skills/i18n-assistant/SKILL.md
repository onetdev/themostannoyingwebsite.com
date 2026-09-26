---
name: i18n-assistant
description: Extracting, managing, and translating user-facing strings using next-intl. Use when adding new text to the UI, fixing hardcoded strings, or updating translations across multiple locales.
---

# i18n Assistant

Use this skill to ensure all user-facing text is correctly localized according to the project's `next-intl` standards.

## Workflow

1.  **Analyze String Location**: Determine if the string is global (shared UI), metadata (SEO), or specific to a feature in `src/features/`.
2.  **English First**:
    - Locate the correct `en.ts` file.
    - If the feature doesn't have an `i18n` folder, create it: `src/features/{feature}/i18n/en.ts`.
    - Add the key/value pair. Use `camelCase` for keys.
    - Do not add variant arrays here; those live in the Content API (see below).
3.  **Do NOT add non-English bundles**: English is the only bundled reference.
    Every other language is served by the headless Content API at runtime and
    deep-merged over the English bundle. To translate a new key, update the
    Content API's translation source — never add
    `src/i18n/messages/{locale}/` or `src/features/*/i18n/{locale}` files.
4.  **UI Implementation**:
    - Import `useTranslations` from `next-intl`.
    - Use `const t = useTranslations('namespace')`.
    - Replace hardcoded text with `{t('key')}`.
5.  **Validation**:
    - Ensure all changes pass the Biome linter (`pnpm lint`).

## Guidelines

See [references/guidelines.md](references/guidelines.md) for detailed placement rules and naming conventions.

- **Prefer namespaces**: Group related strings under a namespace to avoid flat, monolithic translation files.
- **Variant pools / API data**: Never bundle variant arrays; read them from the Content API (`getVariantPool` / `useVariantPool`) with server-side prefetch. See `adr/0025-api-only-variant-pools-ssr-hydration.md`.
- **Static rendering**: the locale is resolved from `next/root-params` in `src/core/i18n/request.ts`. Do not add `setRequestLocale` (deprecated in the installed next-intl; verify in `node_modules/next-intl`) or a pass-through `app/layout.tsx`.
