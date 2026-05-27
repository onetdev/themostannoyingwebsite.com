# Internationalization (i18n) Guidelines

## String Placement

- **Global Strings**: `src/i18n/messages/{locale}/common.ts` (buttons, generic labels).
- **Metadata**: `src/i18n/messages/{locale}/metadata.ts` (SEO tags).
- **Feature Strings**: `src/features/{feature}/i18n/{locale}.ts` or `src/features/{feature}/i18n/{locale}/index.ts`.
- **Large Arrays/Variants**: `src/i18n/messages/{locale}/variants.ts` or feature-specific `variants.ts`.

## Rules

1.  **NEVER Hardcode**: User-facing strings must use `next-intl`.
2.  **Naming Keys**: Use `camelCase` for keys.
3.  **Dynamic Imports**: Services must use dynamic imports for variants to keep bundles small:
    ```typescript
    const variants = await import(`@/i18n/messages/${locale}/variants`);
    ```
4.  **English First**: Always add the English translation first. Other languages can follow if requested.

## Translation Workflow

1.  Identify if the string is global or feature-specific.
2.  Add to English translation (`en.ts` or `en/index.ts`).
3.  Add to other locales if needed.
4.  Update the UI component to use `t('key')` from `useTranslations()`.
