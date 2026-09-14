# ADR 20: Type-Safe Route Aliasing and Navigation Layer

## Status
Accepted

## Context
Standard Next.js navigation relies on hardcoded URL string literals (e.g., `<Link href="/articles/my-slug">` or `router.push('/plans/cancellation')`). In a multi-locale application with deep nested features and evolving URL structures, using raw strings has several drawbacks:
- Path typos and dead links are undetected at compile time.
- Changing a route structure requires manual find-and-replace across components, stores, and services.
- Passing route parameters (slugs, query parameters, anchors) lacks type checking.
- Integrating `next-intl` localized prefixes with internal links can lead to broken relative paths if not carefully managed.

## Decision
We implemented a **Type-Safe Route Aliasing System** built around `RouteAlias` and `path-to-regexp`:

1. **Centralized Route Registry**:
   - Every destination is assigned a typed `RouteAlias` (e.g., `'article.single'`, `'plans.cancellation'`, `'user.login'`) mapped to route templates in [`/apps/web/src/app/bootstrap/navigation.ts`](/apps/web/src/app/bootstrap/navigation.ts).
2. **Parameterized Path Compilation**:
   - `resolvePathForRouteAlias(param)` uses `path-to-regexp` to compile aliases with their required parameters into concrete URL paths.
3. **Dedicated UI & Context Abstractions**:
   - The custom [`<Link hrefFor="...">`](/apps/web/src/core/navigation/react/Link.tsx) component accepts `RouteAliasParams` rather than raw URLs and resolves them via `NavigationContext`.
   - Programmatic navigation via `useNavigationProvider()` exposes typed `push(aliasParams)`, `replace(aliasParams)`, and `resolve(aliasParams)` alongside explicit escape hatches (`unsafePush`, `unsafeReplace`).

## Consequences
- **Pros**: Compile-time verification for all internal navigation and route parameters; route paths can be restructured in one place without altering component code; seamless integration with localized routing.
- **Cons**: Adds a layer of indirection when looking up destination URLs; requires developers to register new pages in `routeAliasToPathMap` and update `RouteAlias` union types.
