# ADR 27: Theme Management with @wrksz/themes

## Status
Accepted

## Context
The app has always relied on `next-themes` for theme selection: a `ThemeProvider` rendered inside a client component tree, a dark/light toggle in the header and in user preferences, and an inline no-flash script that applies the persisted theme to `<html data-theme>` before paint.

Since the React 19.2 upgrade (installed: `react`/`react-dom` 19.3.0, Next.js 16.3.5), every development load / client remount logs:

```
Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client.
```

The cause is structural, not a misconfiguration: `next-themes@0.4.6` renders its bootstrap `<script dangerouslySetInnerHTML>` as a React element inside the provider tree. React 19 added a dev-only `console.error` whenever the client renderer *creates* a `<script>` element (only non-executable data blocks such as `application/ld+json` are exempt), so any client-side remount of the provider — switching the root `[locale]` segment, crossing route groups, Fast Refresh — re-creates the node and warns. `suppressHydrationWarning` cannot suppress it.

Two constraints forced a decision rather than a workaround:

- `next-themes` is effectively unmaintained: last npm release `0.4.6` (2025-03-11), last repository commit 2025-05-31, ~69 open issues, and no released fix for the React 19 script warning (pacocoursey/next-themes #385, #387, #397).
- The warning is dev-only (the message is absent from `react-dom-client.production.js`), so patching minified `dist` output or silencing the overlay would leave the app on a frozen dependency without addressing the root cause.

Options considered:

1.  **Keep `next-themes` and filter/patch it.** Zero or one-line effort, but either hides a real upstream bug or patches minified output that breaks on every version bump, while staying on an unmaintained package.
2.  **Hand-roll theming.** Full control and no dependency, but re-implements storage, cross-tab sync, system-preference tracking, and the pre-paint bootstrap — all areas with subtle FOUC/hydration pitfalls, and it would require an ADR of its own.
3.  **Migrate to a maintained successor.** `@wrksz/themes` (`next-themes` API conventions, Next.js 16+ / React 18–19, TypeScript ≥5.9, zero runtime dependencies, MIT) injects its bootstrap through `useServerInsertedHTML`, which places the script outside the React tree and removes the warning by construction. Alternatives evaluated: `@teispace/next-themes` (ships a codemod but a much smaller community) and `better-themes` (sparser release cadence).

## Decision
Replace `next-themes` with `@wrksz/themes@^2.0.2`, consumed through the pnpm catalog.

1.  **Server-injected bootstrap.** The provider moves out of the client tree into the document-bearing server layouts (`(public)` and `(barebone)`) as `ThemeProvider` from `@wrksz/themes/next`. Its entry renders the client provider and calls `useServerInsertedHTML`, so the no-flash script is emitted into `<head>` by the server stream and is never a React-created element. `getTheme` is intentionally unused (the app does not read cookies server-side).
2.  **Behavior preserved.** `attribute="data-theme"`, `storageKey` `theme`, and `storage` `localStorage` are kept explicitly. `@wrksz/themes` defaults to `attribute="class"`, so the attribute must be stated to keep the existing `[data-theme="light"]` / `[data-theme="dark"]` selectors, `enableColorScheme`, and Tailwind's `dark:` custom variant working. `defaultTheme` comes from `config.defaultColorScheme` instead of a hardcoded string, and existing persisted preferences keep working because the storage key is unchanged.
3.  **Hook imports.** Client consumers read `useTheme` from `@wrksz/themes/client`. `resolvedTheme` is `"light" | "dark" | undefined` (undefined before hydration) and `setTheme` accepts the theme union including `"system"`; the now-unnecessary `as AppTheme` casts were removed.
4.  **`ui-lib` stays framework-agnostic.** `Toaster` no longer calls `useTheme` (which throws outside a provider in `@wrksz/themes`, unlike `next-themes`' no-op default). It becomes prop-driven like `DarkModeToggle`, and `apps/web` bridges the context in a dedicated `ThemedToaster` client component so only the toaster re-renders on theme change. `DarkModeToggle.setTheme` is narrowed to `(theme: 'light' | 'dark') => void`, which it already only ever called.
5.  **Dependency bookkeeping.** `next-themes` is removed from both workspaces, the catalog, and the dependency-upgrade grouping reference; `@wrksz/themes` is added to `apps/web` only.

## Consequences
- **Pros**: The React 19 inline-script warning disappears by construction (the bootstrap lives outside the React tree), with no patching of third-party build output.
- **Pros**: The dependency is maintained against Next.js 16 / React 19 and TypeScript 5.9, and is dependency-free.
- **Pros**: The provider now sits above the app's other client providers, which is the shape the library documents and expects; theme state survives React 19 `Activity`/suspension via `useSyncExternalStore`.
- **Pros**: `ui-lib` no longer depends on a Next.js-specific theme library, matching the existing prop-driven `DarkModeToggle` convention.
- **Pros**: User preferences are preserved — same storage key, attribute, and default theme.
- **Cons**: `@wrksz/themes` requires Next.js ≥16 and TypeScript ≥5.9, raising the floor for these packages; it was chosen over alternatives partly on maturity (a young library with a small maintainer team).
- **Cons**: `resolvedTheme` is `undefined` until hydration, so theme-dependent UI renders its neutral state first. `DarkModeToggle` already sets `suppressHydrationWarning`, but future theme-dependent markup should gate on `useHydrated()` to stay mismatch-free.
- **Cons**: A third-party dependency swap carries integration risk; mitigated by type-check, lint, unit tests, and a live smoke check of the SSR output (bootstrap script present in `<head>` with the expected arguments).
- **Cons**: `@wrksz/themes` exposes far more surface than the app uses (cookies, hybrid storage, scoped providers, typed factories). Only `ThemeProvider`, `useTheme`, and `ClientThemeProvider` are consumed today.
