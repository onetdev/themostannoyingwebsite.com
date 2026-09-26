# Internationalization (i18n) Guidelines

## String Placement

- **Global Strings**: `src/i18n/messages/en/common.ts` (buttons, generic labels).
- **Metadata**: `src/i18n/messages/en/metadata.ts` (SEO tags).
- **Feature Strings**: `src/features/{feature}/i18n/en.ts`.
- **Variant Pools**: **not** bundled. Fake names, comments, testimonials, quiz
  questions, social-proof data, etc. come from the Content API and are consumed
  via services (`getVariantPool`) or client components (`useVariantPool`). See
  `adr/0025-api-only-variant-pools-ssr-hydration.md`.

## Rules

1.  **NEVER Hardcode**: User-facing strings must use `next-intl`.
2.  **Naming Keys**: Use `camelCase` for keys.
3.  **Variant Pools**: Never bundle variant arrays. Read them from the Content API and prefetch them on the server so the client reads the hydrated React Query cache:
    ```tsx
    // client component
    const items = useVariantPool<string>('names');
    ```
    Wrap the route (or use `VariantPoolsBoundary`) so the pool is prefetched server-side.
4.  **English First**: Always add the English translation first. Other languages can follow if requested.

## Translation Workflow

1.  Identify if the string is global or feature-specific.
2.  Add to the English translation `en.ts`.
3.  Add to other locales if needed.
4.  Update the UI component to use `t('key')` from `useTranslations()`.
