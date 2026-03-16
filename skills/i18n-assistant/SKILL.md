---
name: i18n-assistant
description: Extracting, managing, and translating user-facing strings using next-intl. Use when adding new text to the UI, fixing hardcoded strings, or updating translations across multiple locales.
---

# i18n Assistant

Use this skill to ensure all user-facing text is correctly localized according to the project's `next-intl` standards.

## Workflow

1.  **Analyze String Location**: Determine if the string is global (shared UI), metadata (SEO), or specific to a feature in `src/features/`.
2.  **English First**:
    - Locate the correct `en.ts` or `en/index.ts` file.
    - If the feature doesn't have an `i18n` folder, create it: `src/features/{feature}/i18n/en.ts`.
    - Add the key/value pair. Use `camelCase` for keys.
3.  **Cross-Locale Sync**:
    - Check if other locales in `src/i18n/messages/` need the same key.
    - Update them if requested.
4.  **UI Implementation**:
    - Import `useTranslations` from `next-intl`.
    - Use `const t = useTranslations('namespace')`.
    - Replace hardcoded text with `{t('key')}`.
5.  **Validation**:
    - Ensure all changes pass the Biome linter (`pnpm lint`).

## Guidelines

See [references/guidelines.md](references/guidelines.md) for detailed placement rules and naming conventions.

- **Prefer namespaces**: Group related strings under a namespace to avoid flat, monolithic translation files.
- **Service usage**: Use dynamic imports for variants in services (see [references/guidelines.md](references/guidelines.md)).
