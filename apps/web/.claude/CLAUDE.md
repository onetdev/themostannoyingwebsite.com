# The Most Annoying Website - Coding Standards

This document describes coding patterns, architectural decisions, and conventions observed in this codebase. Follow these patterns when adding or modifying code.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Module Organization](#module-organization)
3. [TypeScript Patterns](#typescript-patterns)
4. [React & Next.js Conventions](#react--nextjs-conventions)
5. [Internationalization (i18n)](#internationalization-i18n)
6. [Dependency Injection](#dependency-injection)
7. [File & Folder Naming](#file--folder-naming)
8. [Import Patterns](#import-patterns)
9. [Testing Standards](#testing-standards)
10. [Styling & UI Patterns](#styling--ui-patterns)
11. [Common Anti-Patterns](#common-anti-patterns)

---

## Architecture Overview

### Modular Feature-Based Architecture

The project follows a modular architecture where logic is grouped by feature rather than technical layer. This minimizes coupling and makes it easier to navigate the codebase.

```
src/
├── app/              # Next.js App Router (pages and layouts)
├── features/         # Domain-specific features (e.g., auth, donation)
├── services/         # Global business logic and Kernel services
├── repositories/     # Global data access (repositories)
├── providers/        # React Context providers and DI registry
└── contexts/         # Context definitions and custom hooks
```

### Feature Modules (`/src/features/`)

Features are self-contained modules that encapsulate their own UI, logic, and data validation. A typical feature consists of:

- `components/`: UI components specific to the feature.
- `hooks/`: Custom React hooks for local state or logic.
- `services/`: Business logic and use cases.
- `schemas/`: Zod validation schemas and types.
- `repositories/`: Data access implementations (if specific to the feature).
- `init.ts`: Dependency Injection registration for the feature.
- `types.ts`: DI symbols and feature-specific type definitions.

---

## Feature Organization

### Standard Feature Structure

```
features/my-feature/
├── components/          # Feature-specific components
├── hooks/               # Feature-specific hooks
├── services/            # Business logic (often injectable)
├── schemas/             # Zod schemas (single source of truth for types)
├── repositories/        # (Optional) Feature-specific repositories
├── types.ts             # DI symbols
└── README.md            # Concise overview of the feature
```

### Feature Registration

Every feature with injectable services must be registered in the global dependency container:

**File:** `/src/providers/AppDependencyRegistry.tsx`

```typescript
import { DI } from '@/features/my-feature/types';

export function AppDependencyContainer({ children }: PropsWithChildren) {
  const container = useMemo(() => {
    const container = new Container();
    // Register global services
    container.bind(DI.YourService).to(YourServiceImplementation).inSingletonScope();
    
    return container;
  }, []);
  // ...
}
```

### Import Rules

- **Prefer Feature-Level Imports**: Features should ideally expose their public API via their internal folders.
- **Path Aliases**: Use `@/features/my-feature` for clean imports.
- **Encapsulation**: Avoid deep imports between features where possible. Use the `services` layer for cross-feature logic.

---

## TypeScript Patterns

### Zod as Single Source of Truth

**All type definitions must come from Zod schemas.**

#### Entity Pattern

```typescript
// features/auth/schemas/user.ts
import { z } from 'zod';
import { GenderSchema } from './gender';

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nickname: z.string().min(1).optional(),
  username: z.string().min(8),
  consentNewsletter: z.boolean(),
  consentPrivacyPolicy: z.boolean(),
  gender: GenderSchema.optional(),
  // ...
});

export type User = z.infer<typeof UserSchema>;
```

#### Value Object Pattern

```typescript
// features/auth/schemas/gender.ts
import { z } from 'zod';

export const GenderList = [
  'female',
  'male',
  'other',
  'alien',
  'robot',
  'cyborg',
] as const;

export const GenderSchema = z.enum(GenderList);

export type Gender = (typeof GenderList)[number];
```

#### Config Pattern

```typescript
// schemas/app-config.ts
import { z } from 'zod';
import { DonationConfigSchema } from '@/features/donation/schemas';

export const AppConfigSchema = z.object({
  defaultColorScheme: AppThemeSchema,
  donation: DonationConfigSchema,
  deploymentMeta: DeploymentMetaSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
```

### Interface vs Type

**General pattern:**
- **`type`**: For Zod-inferred types, unions, mapped types
- **`interface`**: For object shapes that might be extended (contexts, services)

```typescript
// Type for Zod inference
export type User = z.infer<typeof UserSchema>;

// Interface for extensible structures
export interface NavigationProviderContextType {
  navigatePush: (param: NavigationParams) => void;
  navigateReplace: (param: NavigationParams) => void;
  pathFor: (param: NavigationParams) => string;
}
```

### Naming Conventions

**Types & Interfaces:**
- PascalCase: `User`, `AuthService`, `CountryRepository`
- Descriptive suffixes: `*Repository`, `*Service`, `*Schema`, `*Context`, `*Type`

**Constants:**
- UPPER_SNAKE_CASE for true constants
- PascalCase for readonly lists: `GenderList`, `AppThemeList`

---

## React & Next.js Conventions

### Server Components by Default

**Default to Server Components. Only use Client Components when necessary.**

### Page Component Pattern (Lean Pages)

**`page.tsx` files should be lean.** They should handle data fetching, metadata, and routing, but delegate the UI rendering to a dedicated "Page" component.

**1. Feature-Level Page Components:**
If the page is the primary entry point for a feature, move the UI to the feature's `components/` directory (e.g., `SettingsPage`, `AdminPage`).

**2. Page-Specific Components:**
If the page UI is unique to that route and not reusable elsewhere, create a `_components/` directory next to the `page.tsx` (e.g., `_components/HomePage.tsx`).

**Example (Lean Page):**

```typescript
// app/[locale]/(public)/settings/page.tsx
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageLayout } from '@/app/_components/PageLayout';
import { SettingsPage } from '@/features/user/components/Settings';

export async function generateMetadata({ params }: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.settings' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return (
    <PageLayout activeItem="settings" role="main">
      <SettingsPage />
    </PageLayout>
  );
}
```

### When to use `'use client'`

- Need React hooks (`useState`, `useEffect`, `useContext`)
- Browser APIs (localStorage, window, document)
- Event handlers requiring interactivity
- Third-party client-only libraries

### Custom Hooks

**Location:**
- Feature hooks: `features/[feature-name]/hooks/`
- Shared hooks: `hooks/`

**Naming:** Always start with `use`

### Form Patterns

**Use Zod + react-hook-form + @hookform/resolvers**

- Define schema with Zod.
- Use `FormProvider` to share form state.
- Co-locate form hooks with features.

### State Management with Zustand

**Store Pattern:**
- Use `create()` from `zustand`.
- Use `persist` middleware for local storage.
- Define State and Actions interfaces separately.

---

## Internationalization (i18n)

This project uses **next-intl** for internationalization with a strict no-hardcoded-text policy.

### Core Principles

1. **Zero Hardcoded English**: All user-facing text MUST be extracted to translation files.
2. **Semantic Grouping**: Organize translations logically, grouping related keys under common namespaces (e.g., `app.donate.moneyUsageHeading`).

### Usage

- **Server Components**: Use `getTranslations` from `next-intl/server`.
- **Client Components**: Use `useTranslations` from `next-intl`.

---

## Dependency Injection

### InversifyJS Pattern

- **Symbols**: Define symbols in `types.ts` (e.g., `DI.AuthService`).
- **Registration**: Register in the feature's `init.ts` and call it in `AppDependencyRegistry.tsx`.
- **Injection**: Use `@injectable()` on classes and `@inject(DI.Symbol)` for dependencies.
- **Hook Access**: Use a custom hook (e.g., `useAuthService`) to retrieve the service from the container.

---

## File & Folder Naming

### TypeScript Files

- **Components (TSX)**: PascalCase (e.g., `LoginForm.tsx`)
- **Utilities/Schemas (TS)**: kebab-case or camelCase (e.g., `login-form.schema.ts`)
- **Hooks**: camelCase starting with `use` (e.g., `useLoginForm.ts`)
- **Tests**: Match source file + `.test.ts` (e.g., `generateTree.test.ts`)

### Folders

- **Features**: kebab-case (e.g., `user-profile/`)
- **Layers**: camelCase or kebab-case (e.g., `use-cases/`, `services/`)

---

## Import Patterns

- **Path Aliases**: Always use `@/` for internal paths.
- **Import Order**: External → Workspace (`@maw/*`) → Internal (`@/*`) → Relative.
- **Encapsulation**: Avoid deep relative imports between features.

---

## Testing Standards

### Unit Tests with Jest

- **Location**: Co-located with source files.
- **Naming**: `*.test.ts`.
- **Focus**: Business logic, use cases, utility functions, schemas.

### E2E Tests with Playwright

- **Location**: `/apps/web/e2e/tests/`.
- **Naming**: `*.spec.ts`.

---

## Styling & UI Patterns

### TailwindCSS 4 & Design System

- **Prefer Semantic Tokens**: Use custom utility classes (defined in `/packages/ui-lib/src/styles/themes/index.css`) over generic Tailwind colors.
- **Backgrounds**: `bg-background`, `bg-card`, `bg-popover`.
- **Brand**: `bg-primary`, `bg-secondary`, `bg-tertiary`.
- **Status**: `bg-success`, `bg-error`, `bg-warning`.
- **Animations**: Use project-defined animations (e.g., `animate-flashing-invert-half`).

### UI Library

Always use components from **`@maw/ui-lib`** (e.g., `Button`, `Input`, `PageHeadline`) to ensure visual consistency.

---

## Common Anti-Patterns

- ❌ **Hardcoded English Text**: Always use `next-intl`.
- ❌ **Deep Imports**: Always use barrel exports and feature-level entry points.
- ❌ **Complex Page Components**: Extract UI to "Page" components in features or `_components`.
- ❌ **Manual Validation**: Always use Zod schemas.
- ❌ **`any` Types**: Always define proper TypeScript types/interfaces.
- ❌ **Generic Colors**: Prefer semantic design system tokens.

---

## Quick Reference Checklist

- [ ] UI extracted from `page.tsx` to a dedicated component.
- [ ] Zod schemas used as the single source of truth for types.
- [ ] No hardcoded English text (using `next-intl`).
- [ ] Feature registered in DI container (if applicable).
- [ ] Unit tests added for new services/logic.
- [ ] Semantic Tailwind tokens used for styling.

---

## Additional Resources

- **Next.js 16**, **React 19**, **TypeScript 5.9**, **TailwindCSS 4**.
- `apps/web/src/features/README.md` - Architecture guide.
- `apps/web/e2e/README.md` - E2E testing guide.
