# Dependency Groups

Divide dependencies into logical groups to manage updates and testing iteratively.
Grouping keeps a failure attributable to one batch instead of the whole tree.

**This file must only list packages the workspace actually declares.** Before each
upgrade, prune entries for packages that have been removed and add newly
introduced ones — a stale entry costs a wasted registry lookup and hides the fact
that a dependency was dropped.

## Execution Order

Run groups in this order. Rationale: formatter/linter changes first so later
groups are verified against final rules; the largest surface (Next.js) last so it
is validated against an already-stable tree.

1. TypeScript & build tooling
2. Storybook
3. Testing
4. UI & styling
5. Other dependencies
6. Next.js ecosystem

**Isolation rule:** a `major` bump, or a pre-1.0 `0.x` minor bump (semver treats
`0.x` minors as breaking), gets its own update-and-verify cycle inside its group.
Never bundle two risky bumps into one verification run.

## Group 1: Next.js Ecosystem

- `next`, `@next/*`
- `react`, `react-dom`, `@types/react`, `@types/react-dom`
- `next-intl`, `@formatjs/icu-messageformat-parser`
- `@sentry/nextjs`
- `@tanstack/react-query`
- `@vercel/analytics`, `@wrksz/themes`
- `zod`, `zustand`, `inversify`, `reflect-metadata`
- `ky`
- `@lottiefiles/dotlottie-react` (pre-1.0: treat every minor as breaking)
- `html-react-parser`
- `@mdx-js/loader`, `@mdx-js/react`

## Group 2: TypeScript & Tooling

- `typescript`, `typescript-plugin-css-modules`
- `@types/*` not owned by another group
- `tsx`
- `@biomejs/biome`
- `@swc/core`, `@swc/jest`
- `turbo`
- `vite`

## Group 3: Storybook

- `storybook`
- `@storybook/*`

## Group 4: Testing

- `jest`, `jest-environment-jsdom`, `@jest/*`, `@types/jest`
- `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/react`
- `@playwright/test`

## Group 5: UI & Styling

- `tailwindcss`, `@tailwindcss/*`, `postcss`, `tw-animate-css`
- `@base-ui/react`, `@shadcn/react`, `shadcn` (Base UI replaced Radix — see
  `adr/0031-base-ui-shadcn-adoption.md`)
- `class-variance-authority`, `cn`, `colord`
- `motion`, `embla-carousel-react`, `sonner`
- `recharts`
- `@fortawesome/*`
- `react-hook-form`, `@hookform/resolvers` (forms; resolver majors are usually isolated)
- `canvas-confetti`, `@types/canvas-confetti`, `ogl`, `qrcode.react`, `react-use`
- `schema-dts`

## Group 6: Git & Workflow Tools

- `lefthook`
- `@commitlint/*`

## Group 7: Other Dependencies

- `marked`, `sanitize-html`, `@types/sanitize-html`, `remark-gfm`
- `tslog`, `commander`
- `orval` (regenerate `packages/content-sdk/src/generated/**` afterwards)
- `path-to-regexp` (ESM-only since v9)
- `countries-and-timezones`, `emittery`, `favicons`
- `server-only`
- All other packages not covered above

## Never Upgrade Directly

- `workspace:*` / `workspace:^` internal `@maw/*` packages (versioned in-repo)
- `"catalog:"` references (change the `catalog:` entry instead)
- Generated artifacts: `packages/content-sdk/src/generated/**`, `next-env.d.ts`
  — regenerate, never hand-edit
