# Dependency Groups

Divide dependencies into logical groups to manage updates and testing iteratively.

## Group 1: Next.js Ecosystem
- `next`
- `react`
- `react-dom`
- `@next/*`
- `next-intl`
- `next-sentry`
- `@sentry/nextjs`
- `@tanstack/react-query`
- `@vercel/analytics`
- `next-themes`
- `zod`
- `zustand`
- `inversify`
- `reflect-metadata`

## Group 2: TypeScript & Tooling
- `typescript`
- `@types/*`
- `tsx`
- `ts-node`
- `ts-jest`
- `@biomejs/biome`
- `prettier`
- `turbo`
- `pnpm`
- `swc`
- `@swc/*`
- `symlink-dir`

## Group 3: Storybook
- `storybook`
- `@storybook/*`
- `storybook-static`

## Group 4: Testing
- `jest`
- `@jest/*`
- `@testing-library/*`
- `jest-environment-jsdom`
- `playwright`
- `@playwright/test`
- `msw`

## Group 5: UI & Styling
- `tailwindcss`
- `@tailwindcss/*`
- `postcss`
- `autoprefixer`
- `framer-motion`
- `lucide-react`
- `clsx`
- `tailwind-merge`
- `classnames`
- `class-variance-authority`
- `@fortawesome/*`
- `@radix-ui/*`
- `radix-ui`
- `embla-carousel-react`
- `sonner`
- `tw-animate-css`

## Group 6: Git & Workflow Tools
- `husky`
- `lint-staged`
- `@commitlint/*`
- `cz-conventional-changelog`

## Group 7: Other Dependencies
- All other packages not covered in the groups above.
