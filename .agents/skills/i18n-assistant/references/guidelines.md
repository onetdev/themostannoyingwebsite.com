# Internationalization (i18n) Guidelines

## String Placement

- **Global Strings**: `src/i18n/messages/en/common.ts` (buttons, generic labels).
- **Metadata**: `src/i18n/messages/en/metadata.ts` (SEO tags).
- **Feature Strings**: `src/features/{feature}/i18n/en.ts`.
- **Content Pools**: **not** bundled. Fake names, comments, testimonials, quiz
  questions, social-proof data, etc. come from the Content API and are consumed
  via services (`getContentPool` / `fetchContentPool`) or client components
  (`usePool`). See
  `adr/0029-content-resource-model-pools-and-dedicated-endpoints.md`.

## Rules

1.  **NEVER Hardcode**: User-facing strings must use `next-intl`.
2.  **Naming Keys**: Use `camelCase` for keys.
3.  **Content Pools**: Never bundle variant arrays. Read them from the Content API and prefetch them on the server so the client reads the hydrated React Query cache:
    ```tsx
    // client component
    const items = usePool('names');
    ```
    Wrap the route (or use `ContentPoolsBoundary`) so the pool is prefetched server-side.
4.  **English Only in the Repo**: Only English is bundled and acts as the
    reference shape plus runtime fallback. All other languages are served by the
    Content API and deep-merged over English. Do **not** create non-English
    message files.

## Translation Workflow

1.  Identify if the string is global or feature-specific.
2.  Add it to the English translation (`en.ts`) and use `t('key')` in the UI.
3.  For non-English support, add the key to the Content API's translation source
    (the API is the single source of truth); the app picks it up automatically
    and falls back to English for any missing key.

## Static Rendering

The `[locale]` segment is read through `next/root-params` in
`src/core/i18n/request.ts`, so next-intl never needs to read request headers and
routes stay statically renderable. Do **not** add `setRequestLocale`
(deprecated in the installed next-intl; verify in `node_modules/next-intl`) and
do **not** add a pass-through `app/layout.tsx` — the root layout must remain
`src/app/[locale]/layout.tsx` for root params to work.
