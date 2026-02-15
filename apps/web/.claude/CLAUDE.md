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

### Clean Architecture with 4 Layers

This project follows **Clean Architecture** with explicit layer separation:

```
module/
├── domain/           # Business rules, entities, value objects, interfaces
├── application/      # Use cases, services, hooks, forms
├── infrastructure/   # Implementations, API clients, repositories
└── presentation/     # React components, pages, UI
```

**Dependency Rule:** Inner layers (domain) never depend on outer layers (presentation).

**Reference:** `/apps/web/src/modules/README.md` contains architecture diagrams

### Two Module Types

1. **Kernel Module** (`/src/kernel/`)
   - Core shared functionality
   - Cross-cutting concerns
   - Example: navigation, app config, shared providers

2. **Feature Modules** (`/src/modules/*/`)
   - Self-contained features
   - Each follows the 4-layer structure
   - Examples: `auth`, `donation`, `content`, `chat-bubble`

---

## Module Organization

### Standard Module Structure

```
modules/my-feature/
├── domain/
│   ├── entities/
│   │   ├── my-entity.ts         # Zod schema + type
│   │   └── index.ts             # Barrel export
│   ├── repositories/
│   │   ├── MyRepository.ts      # Interface definition
│   │   └── index.ts
│   ├── value-objects/
│   │   ├── my-enum.ts           # Value object with Zod
│   │   └── index.ts
│   └── index.ts
├── application/
│   ├── services/
│   │   ├── MyService.ts         # Business logic service
│   │   ├── MyService.test.ts    # Co-located tests
│   │   ├── useMyService.ts      # Hook to access service
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useMyData.ts         # Business logic hooks
│   │   └── index.ts
│   ├── forms/
│   │   ├── my-form.schema.ts    # Zod validation schema
│   │   ├── useMyForm.ts         # Form hook
│   │   └── index.ts
│   └── index.ts
├── infrastructure/
│   ├── repositories/
│   │   └── MyRepositoryImpl.ts  # Concrete implementation
│   └── index.ts
├── presentation/
│   ├── MyPage.tsx               # Main page component
│   ├── MyForm.tsx               # Form component
│   ├── components/              # Page-specific components
│   │   ├── MyWidget.tsx
│   │   └── index.ts
│   └── index.ts
├── init.ts                      # DI container registration
├── types.ts                     # DI symbols
└── index.ts                     # Module barrel export
```

### Module Registration

Every module must be registered in the DI container:

**File:** `/src/providers/DependencyProvider.tsx`

```typescript
import { init as initMyFeature } from '@/modules/my-feature/init';

const container = useMemo(() => {
  const container = new Container();
  initMyFeature(container);
  // ... other modules
  return container;
}, []);
```

Important: Just for visibility, module init must be defined even if it's just an empty function.

### Barrel Exports

**Every folder must have an `index.ts` that re-exports public APIs.**

```typescript
// modules/auth/index.ts
export * from './application';
export * from './domain';
export * from './infrastructure';
export * from './presentation';
```

**Benefits:**
- Clean import paths: `import { User } from '@/modules/auth'`
- Explicit public API surface
- Easy refactoring

**Rule:** Never deep-import from other modules. Use barrel exports.

```typescript
// ✅ Good
import { User, useAuthService } from '@/modules/auth';

// ❌ Bad
import { User } from '@/modules/auth/domain/entities/user';
```

---

## TypeScript Patterns

### Zod as Single Source of Truth

**All type definitions must come from Zod schemas.**

#### Entity Pattern

```typescript
// domain/entities/user.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(8),
});

export type User = z.infer<typeof UserSchema>;
```

**Reference:** `/src/modules/auth/domain/entities/user.ts`

#### Value Object Pattern

```typescript
// domain/value-objects/gender.ts
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

**Reference:** `/src/modules/auth/domain/value-objects/gender.ts`

#### Config Pattern

```typescript
// domain/entities/app-config.ts
import { z } from 'zod';

const AppThemeList = ['light', 'dark'] as const;

export const AppThemeSchema = z.enum(AppThemeList);
export type AppTheme = (typeof AppThemeList)[number];

export const AppConfigSchema = z.object({
  defaultColorScheme: AppThemeSchema,
  donation: DonationConfigSchema,
  deploymentMeta: DeploymentMetaSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
```

**Benefits:**
- Runtime validation
- Type inference (never duplicate types)
- Single source of truth
- Works seamlessly with forms

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

**Server Component Example:**

```typescript
// app/[locale]/donate/page.tsx
import { getTranslations } from 'next-intl/server';
import { DonationPage } from '@/modules/donation/presentation/DonationPage';

export const revalidate = 1800; // ISR

export async function generateMetadata({ params }: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.donate' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const t = await getTranslations();
  return <DonationPage />;
}
```

**Reference:** `/src/app/[locale]/donate/page.tsx`

**Client Component Example:**

```typescript
// presentation/components/DonationCalculator.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function DonationCalculator() {
  const t = useTranslations();
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
    </div>
  );
}
```

**When to use `'use client'`:**
- Need React hooks (`useState`, `useEffect`, `useContext`)
- Browser APIs (localStorage, window, document)
- Event handlers requiring interactivity
- Third-party client-only libraries

### Custom Hooks

**Location:**
- Business logic hooks: `module/application/hooks/`
- UI hooks: `module/presentation/hooks/` or inline
- Shared hooks: `kernel/application/hooks/`

**Naming:** Always start with `use`

**Application Hook Example:**

```typescript
// application/hooks/useDonationBalance.ts
import { useMemo } from 'react';
import { useDonationService } from '../services';
import { useAppConfig } from '@/kernel';

export function useDonationBalance(): number {
  const { donation } = useAppConfig();
  const donationService = useDonationService();

  const balance = useMemo(() => {
    return donationService.calculateBalance({
      costStartEpoch: donation.costStartEpoch,
      costDailyAvgInEuro: donation.costDailyAvgInEuro,
      totalDonationInEuro: donation.totalDonationInEuro,
    });
  }, [donation, donationService]);

  return balance;
}
```

**Reference:** `/src/modules/donation/application/hooks/useDonationBalance.ts`

### Form Patterns

**Use Zod + react-hook-form + @hookform/resolvers**

**Schema Factory:**

```typescript
// application/forms/login-form.schema.ts
import { z } from 'zod';
import { ZodTranslator } from '@/kernel';

export function getLoginFormSchema(t: ZodTranslator) {
  return z.object({
    email: z.string().email({ message: t('form.validation.error.emailInvalid') }),
    password: z.string().min(1, { message: t('form.validation.error.required') }),
    remember: z.boolean().optional(),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormSchema>>;
```

**Form Hook:**

```typescript
// application/forms/useLoginForm.ts
'use client';

import { useForm } from 'react-hook-form';
import { useAuthService } from '../services';
import { getLoginFormSchema, LoginFormData } from './login-form.schema';
import { useZodFormValidator } from '@/kernel';

export function useLoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const authService = useAuthService();
  const resolver = useZodFormValidator(getLoginFormSchema);
  const methods = useForm<LoginFormData>({ resolver });

  const onSubmit = async (data: LoginFormData) => {
    const result = await authService.login(data);
    if (result.success) {
      onSuccess?.();
    } else {
      methods.setError('root', { message: result.error?.message });
    }
  };

  return { ...methods, onSubmit };
}
```

**Form Component:**

```typescript
// presentation/LoginForm.tsx
'use client';

import { FormProvider } from 'react-hook-form';
import { Button, Input, FormError } from '@maw/ui-lib';
import { useLoginForm } from '../application/forms/useLoginForm';

export function LoginForm() {
  const form = useLoginForm({ onSuccess: () => console.log('Success!') });
  const { handleSubmit, onSubmit, register, formState: { errors } } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormError error={errors.root} />
        <Input type="email" {...register('email')} />
        <Input type="password" {...register('password')} />
        <Button type="submit">Login</Button>
      </form>
    </FormProvider>
  );
}
```

**Reference:** `/src/modules/auth/application/forms/` and `/src/modules/auth/presentation/LoginForm.tsx`

### Context Providers

**Standard Context Pattern:**

```typescript
// kernel/application/services/AppConfigContext.tsx
'use client';

import { createContext, useContext, PropsWithChildren } from 'react';
import { AppConfig } from '@/kernel/domain';

export const AppConfigContext = createContext<AppConfig | null>(null);

export function AppConfigProvider({
  children,
  config
}: PropsWithChildren<{ config?: AppConfig }>) {
  return (
    <AppConfigContext.Provider value={config ?? null}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error('useAppConfig must be used within AppConfigProvider');
  }
  return context;
}
```

**Key Elements:**
- `'use client'` directive
- Typed context with `createContext`
- Provider component
- Hook with error checking

**Reference:** `/src/kernel/application/services/AppConfigContext.tsx`

### State Management with Zustand

**Store Pattern:**

```typescript
// kernel/domain/stores/user-preferences.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserPreferencesState {
  enableSound: boolean;
  adultFilter: boolean;
}

export interface UserPreferencesActions {
  setEnableSound: (enableSound: boolean) => void;
  setAdultFilter: (adultFilter: boolean) => void;
}

export interface UserPreferencesStore
  extends UserPreferencesState,
          UserPreferencesActions {}

const initialState: UserPreferencesState = {
  enableSound: true,
  adultFilter: true,
};

export const useUserPreferencesStore = create(
  persist<UserPreferencesStore>(
    (set) => ({
      ...initialState,
      setEnableSound: (enableSound) => set({ enableSound }),
      setAdultFilter: (adultFilter) => set({ adultFilter }),
    }),
    {
      name: USER_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
```

**Usage:**

```typescript
const { enableSound, setEnableSound } = useUserPreferencesStore();
```

**Reference:** `/src/kernel/domain/stores/user-preferences.ts`

---

## Internationalization (i18n)

This project uses **next-intl** for internationalization with a strict no-hardcoded-text policy.

### Core Principles

**1. Zero Hardcoded English in Components**

All user-facing text MUST be extracted to translation files. Components should never contain hardcoded English strings.

```typescript
// ❌ Bad - hardcoded English
export function DonationPage() {
  return (
    <div>
      <h2>What happens with the money?</h2>
      <p>Your support helps compensate the time and effort...</p>
    </div>
  );
}
```

```typescript
// ✅ Good - using translations
export function DonationPage() {
  const t = useTranslations();

  return (
    <div>
      <h2>{t('app.donate.moneyUsageHeading')}</h2>
      <p>{t('app.donate.moneyUsageDescription')}</p>
    </div>
  );
}
```

**2. Tree Structure Over Flat Key-Value**

Organize translations hierarchically, grouping related keys under common namespaces.

**❌ Bad - Flat structure:**

```json
{
  "topSupporters": "Top supporters",
  "topSupportersDescription": "Once this project actually starts...",
  "topSupporterKidney": "🥇 Kidney",
  "topSupporterLiver": "🥈 Liver",
  "topSupporterHeart": "🥉 Heart"
}
```

**✅ Good - Tree structure:**

```json
{
  "topSupporters": {
    "heading": "Top supporters",
    "description": "Once this project actually starts...",
    "kidney": "🥇 Kidney",
    "liver": "🥈 Liver",
    "heart": "🥉 Heart"
  }
}
```

**Benefits:**
- Better organization and discoverability
- Clear semantic grouping
- Easier to manage related translations
- Prevents key naming collisions

### Translation File Structure

**Location:** `/apps/web/src/i18n/messages/{locale}.ts`

**Example:** `/apps/web/src/i18n/messages/en.ts`

**Organize by feature area:**

```json
{
  "app": {
    "title": "The Most Annoying Website",
    "description": "...",
    "donate": {
      "description": "...",
      "moneyUsage": {
        "heading": "What happens with the money?",
        "description": "Your support helps..."
      },
      "topSupporters": {
        "heading": "Top supporters",
        "description": "Once this project...",
        "kidney": "🥇 Kidney",
        "liver": "🥈 Liver",
        "heart": "🥉 Heart"
      },
      "disclaimer": {
        "heading": "Disclaimer",
        "paragraph1": "This project is developed...",
        "paragraph2": "No legal, tax...",
        "paragraph3": "I comply with..."
      }
    }
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "donate": "Donate"
  },
  "common": {
    "yes": "Yes",
    "no": "No",
    "submit": "Submit"
  }
}
```

### Usage Patterns

**Server Components:**

```typescript
import { getTranslations } from 'next-intl/server';

export async function DonationPage() {
  const t = await getTranslations();

  return (
    <div>
      <h2>{t('app.donate.moneyUsage.heading')}</h2>
      <p>{t('app.donate.moneyUsage.description')}</p>
    </div>
  );
}
```

**Client Components:**

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function DonationForm() {
  const t = useTranslations();

  return (
    <form>
      <button type="submit">{t('common.submit')}</button>
    </form>
  );
}
```

**With Namespaces:**

```typescript
// Server
const t = await getTranslations('app.donate');
return <h2>{t('moneyUsage.heading')}</h2>;

// Client
const t = useTranslations('app.donate');
return <h2>{t('moneyUsage.heading')}</h2>;
```

**With Interpolation:**

```json
{
  "greeting": "Hello, {name}!",
  "itemCount": "You have {count} items"
}
```

```typescript
t('greeting', { name: 'Alice' })       // "Hello, Alice!"
t('itemCount', { count: 5 })           // "You have 5 items"
```

### Grouping Guidelines

**When to create a new group:**

1. **Related content** - Multiple keys that describe the same feature/section
2. **Shared prefix** - If you find yourself writing `prefix_key1`, `prefix_key2`, create `prefix: { key1, key2 }`
3. **Semantic relationship** - Keys that logically belong together

**Example transformation:**

```json
// ❌ Before - flat structure with repetitive prefixes
{
  "donateMoneyUsageHeading": "What happens with the money?",
  "donateMoneyUsageDescription": "Your support helps...",
  "donateDisclaimerHeading": "Disclaimer",
  "donateDisclaimerParagraph1": "This project is...",
  "donateDisclaimerParagraph2": "No legal advice...",
  "donateDisclaimerParagraph3": "I comply with..."
}
```

```json
// ✅ After - hierarchical structure
{
  "donate": {
    "moneyUsage": {
      "heading": "What happens with the money?",
      "description": "Your support helps..."
    },
    "disclaimer": {
      "heading": "Disclaimer",
      "paragraph1": "This project is...",
      "paragraph2": "No legal advice...",
      "paragraph3": "I comply with..."
    }
  }
}
```

### Common Patterns

**Headings and descriptions:**

```json
{
  "featureName": {
    "heading": "Feature Title",
    "description": "Feature description",
    "callToAction": "Click here"
  }
}
```

**Lists and variants:**

```json
{
  "prizes": {
    "first": "🥇 Gold",
    "second": "🥈 Silver",
    "third": "🥉 Bronze"
  },
  "messages": {
    "variant1": "Message one",
    "variant2": "Message two",
    "variant3": "Message three"
  }
}
```

**Form-related:**

```json
{
  "form": {
    "field": {
      "email": "Email",
      "password": "Password",
      "username": "Username"
    },
    "validation": {
      "error": {
        "required": "This field is required",
        "emailInvalid": "Invalid email address"
      }
    }
  }
}
```

### Reference Files

- **Translation files:** `/apps/web/src/i18n/messages/en.ts`
- **i18n config:** `/apps/web/src/i18n/`
- **Usage examples:** `/apps/web/src/modules/donation/presentation/DonationPage.tsx`

---

## Dependency Injection

### InversifyJS Pattern

**TypeScript Configuration Required:**

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### DI Symbols

**Every module defines DI symbols:**

```typescript
// modules/my-feature/types.ts
export const DI = {
  MyRepository: Symbol.for('MyRepository'),
  MyService: Symbol.for('MyService'),
};
```

**Reference:** `/src/kernel/types.ts`, `/src/modules/auth/types.ts`

### Module Registration

**Each module has an `init.ts` file:**

```typescript
// modules/my-feature/init.ts
import { Container } from 'inversify';
import { DI } from './types';
import { MyService } from './application/services/MyService';
import { MyRepositoryImpl } from './infrastructure/MyRepositoryImpl';

export const init = (di: Container) => {
  di.bind(DI.MyRepository).to(MyRepositoryImpl).inSingletonScope();
  di.bind(DI.MyService).to(MyService).inSingletonScope();
};
```

**No DI needed? Still export init:**

```typescript
// modules/my-feature/init.ts
import { Container } from 'inversify';

export const init = (_di: Container) => {
  // No DI bindings needed - utility class pattern
};
```

**Reference:** `/src/modules/donation/init.ts` (no DI), `/src/kernel/init.ts` (with DI)

### Injectable Service Pattern

**Service with DI:**

```typescript
// application/services/AuthService.ts
import { injectable, inject } from 'inversify';
import { DI } from '../../types';
import { AuthRepository } from '../../domain';

@injectable()
export class AuthService {
  @inject(DI.AuthRepository)
  private authRepository!: AuthRepository;

  async login(credentials: LoginCredentials) {
    return this.authRepository.authenticate(credentials);
  }
}

// Hook to access service
export const useAuthService = () => {
  const container = useDependencyContainer();
  return container.container.get(DI.AuthService) as AuthService;
};
```

**Reference:** `/src/kernel/application/services/KernelService.ts`

### Utility Service Pattern (No DI)

**Simple service without dependencies:**

```typescript
// application/services/DonationService.ts
export class DonationService {
  calculateBalance(config: DonationBalanceConfig): number {
    // Pure logic, no dependencies
  }
}

export const createDonationService = (): DonationService => {
  return new DonationService();
};

// Hook wrapper
export const useDonationService = (): DonationService => {
  return useMemo(() => createDonationService(), []);
};
```

**Reference:** `/src/modules/donation/application/services/DonationService.ts`

**Rule:** Only use DI when service has dependencies. For utility classes, use factory functions.

### Repository Pattern

**Interface in domain:**

```typescript
// domain/repositories/MyRepository.ts
import { MyEntity } from '../entities/my-entity';

export interface MyRepository {
  findAll: () => Promise<MyEntity[]>;
  findById: (id: string) => Promise<MyEntity | null>;
  save: (entity: MyEntity) => Promise<void>;
}
```

**Implementation in infrastructure:**

```typescript
// infrastructure/repositories/MyRepositoryImpl.ts
import { injectable } from 'inversify';
import { MyRepository, MyEntity } from '../../domain';

@injectable()
export class MyRepositoryImpl implements MyRepository {
  async findAll(): Promise<MyEntity[]> {
    // Implementation
  }

  async findById(id: string): Promise<MyEntity | null> {
    // Implementation
  }

  async save(entity: MyEntity): Promise<void> {
    // Implementation
  }
}
```

**Reference:** `/src/kernel/infrastructure/StaticCountryRepository.ts`

---

## File & Folder Naming

### TypeScript Files

**Components (TSX):**
- **PascalCase**: `LoginForm.tsx`, `AppHeader.tsx`, `DonationPage.tsx`

**Non-Component TypeScript:**
- **kebab-case** for multi-word: `login-form.schema.ts`, `string-marquee.ts`
- **camelCase** for utilities: `markdown.ts`, `network.ts`

**Hooks:**
- **camelCase** starting with `use`: `useLoginForm.ts`, `useDonationService.ts`

**Tests:**
- **Match source file** + `.test.ts`: `DonationService.test.ts`
- Co-located with source file

**Special Files:**
- `index.ts` - Barrel exports
- `init.ts` - DI registration
- `types.ts` - Type/symbol definitions
- `config.ts` - Configuration

### Folders

**Folders:**
- **kebab-case**: `browser-core/`, `chat-bubble/`, `wheel-of-fortune/`
- **camelCase** for layer subfolders: `use-cases/`, `value-objects/`

---

## Import Patterns

### Path Aliases

**Configured in `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/root/*": ["./*"],
      "@/modules/*": ["src/modules/*"],
      "@/kernel": ["src/kernel/index.ts"]
    }
  }
}
```

### Import Order

**General pattern (not strictly enforced):**

1. External packages (React, Next.js, third-party)
2. Workspace packages (`@maw/*`)
3. Internal app imports (`@/*`)
4. Relative imports (`./`, `../`)

**Example:**

```typescript
import { useForm } from 'react-hook-form';                  // External
import { Button } from '@maw/ui-lib';                       // Workspace
import { useZodFormValidator } from '@/kernel';             // App
import { User } from '../../domain';                        // Relative
```

### Import Rules

**✅ Do:**
- Use barrel exports: `import { User } from '@/modules/auth'`
- Use path aliases: `import { Config } from '@/kernel'`
- Keep relative imports within the same module

**❌ Don't:**
- Deep import from other modules: `import { User } from '@/modules/auth/domain/entities/user'`
- Long relative paths: `import { X } from '../../../../domain'`

---

## Testing Standards

### Unit Tests with Jest

**Location:** Co-located with source files

**Naming:** `*.test.ts` or `*.test.tsx`

**Structure:**

```typescript
// DonationService.test.ts
import { createDonationService, DonationService } from './DonationService';

describe('DonationService', () => {
  let service: DonationService;
  let mockTranslate: jest.Mock;

  beforeEach(() => {
    service = createDonationService();
    mockTranslate = jest.fn((key: string) => translations[key] || key);
  });

  describe('calculateBalance', () => {
    it('should calculate balance after 1 day', () => {
      const config = { /* ... */ };
      const result = service.calculateBalance(config, timestamp);
      expect(result).toBe(490);
    });

    it('should handle negative balance', () => {
      // Test implementation
    });
  });
});
```

**Reference:** `/src/modules/donation/application/services/DonationService.test.ts`

**Commands:**

```bash
pnpm test              # Run all tests
pnpm test:coverage     # With coverage
pnpm test:ci           # CI mode
```

### E2E Tests with Playwright

**Location:** `/apps/web/e2e/tests/`

**Naming:** `*.spec.ts`

**Reference:** `/apps/web/e2e/README.md`

**Commands:**

```bash
pnpm test:e2e          # Run E2E tests
npx playwright test --ui  # Interactive mode
```

### Test Coverage Strategy

**What to test:**
- Business logic in services (high priority)
- Use cases and domain logic
- Utility functions
- Form validation schemas

**What not to test:**
- UI component rendering (use E2E instead)
- Third-party library behavior
- Simple getters/setters

**Current coverage:** Service layer has test coverage. UI coverage is via E2E.

---

## Styling & UI Patterns

### Project-Defined Tailwind Classes

**IMPORTANT: Project-defined Tailwind classes are HIGHLY PREFERRED over generic Tailwind classes.**

This project uses a custom design system with semantic color tokens. Always use these custom classes for consistency and theme support.

---

**📍 AUTHORITATIVE SOURCE:** The complete list of all custom Tailwind utility classes is defined in:

**`/packages/ui-lib/src/styles/themes/index.css`**

This file contains:
- All custom color tokens (background, primary, secondary, tertiary, status colors)
- All custom animations and keyframes
- Custom CSS variables for sizes, transitions, and effects
- Theme definitions for light/dark modes

**Always check this file first** before creating new colors or animations.

---

### Custom Color Classes

Below is a summary of key semantic color tokens (full list in `/packages/ui-lib/src/styles/themes/index.css`):

#### Background & Surface
```typescript
// ✅ Preferred - Semantic tokens
bg-background         // Main background color
bg-surface           // Surface/card background
bg-surface-alt       // Alternative surface color
text-on-background   // Text on background
text-on-surface      // Text on surface
```

```typescript
// ❌ Avoid - Generic Tailwind colors
bg-white
bg-gray-100
text-gray-900
```

#### Primary Colors
```typescript
// ✅ Preferred
bg-primary           // Primary brand color
text-primary         // Primary text/links
text-primary-alt     // Primary hover state
text-on-primary      // Text on primary background
```

```typescript
// ❌ Avoid
bg-blue-500
text-blue-600
text-white
```

#### Secondary & Tertiary
```typescript
// ✅ Preferred
bg-secondary         // Secondary color
text-secondary       // Secondary text
text-on-secondary    // Text on secondary background

bg-tertiary          // Tertiary color
text-tertiary        // Tertiary text
text-on-tertiary     // Text on tertiary background
```

#### Status Colors
```typescript
// ✅ Preferred
bg-success           // Success state
text-on-success      // Text on success background

bg-warning           // Warning state
text-on-warning      // Text on warning background

bg-error             // Error state
text-on-error        // Text on error background
```

#### Other Semantic Colors
```typescript
bg-dimmer            // Dimmer overlay
bg-border-surface        // Horizontal rule on surface
bg-border-primary        // Horizontal rule primary
```

**Why prefer semantic tokens?**
- Theme support (light/dark mode)
- Consistent design system
- Easy refactoring (change color globally)
- Semantic meaning (not just color values)

### Custom Animations

**Project-defined animations in theme config:**

```typescript
// ✅ Use custom animations
animate-highlight            // Highlight animation
animate-flashing-invert-half // Flashing invert effect
animate-wiggle-15deg         // Wiggle animation (15deg)
animate-wiggle-8deg          // Wiggle animation (8deg)
animate-width-0-100          // Width transition 0→100%
animate-width-100-0          // Width transition 100→0%
animate-gift-callout         // Gift callout animation
animate-hue-full-rotate      // Full hue rotation
```

**Reference:** `/packages/ui-lib/src/styles/themes/index.css` lines 50-124

### UI Component Library

**Always use components from `@maw/ui-lib` when available:**

```typescript
import {
  Button,
  Input,
  Checkbox,
  FormError,
  FormFieldError,
  PageHeadline,
  Modal,
  Icon,
  Tooltip,
  // ... more
} from '@maw/ui-lib';
```

**Don't recreate existing UI components.** Check `/packages/ui-lib/src/components/` first.

### Component Styling Pattern

```typescript
// ✅ Good - Use semantic tokens
export function MyComponent() {
  return (
    <div className="bg-surface text-on-surface rounded-lg p-4">
      <h2 className="text-primary text-2xl font-semibold">Title</h2>
      <p className="text-on-surface">Content</p>
      <Button className="bg-primary text-on-primary">Submit</Button>
    </div>
  );
}
```

```typescript
// ❌ Bad - Generic Tailwind colors
export function MyComponent() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4">
      <h2 className="text-blue-600 dark:text-blue-400 text-2xl font-semibold">Title</h2>
      <p className="text-gray-800 dark:text-gray-200">Content</p>
      <Button className="bg-blue-500 text-white">Submit</Button>
    </div>
  );
}
```

**Notice:**
- No need for `dark:` variants when using semantic tokens (handled automatically)
- More readable and maintainable
- Consistent with design system

### When Generic Tailwind Classes Are OK

Generic Tailwind utilities are acceptable for:
- Layout: `flex`, `grid`, `gap-4`, `p-4`, `mx-auto`
- Sizing: `w-full`, `h-screen`, `max-w-lg`
- Typography: `text-sm`, `text-xl`, `font-semibold`
- Spacing: `mt-4`, `px-6`, `space-y-2`
- Display: `hidden`, `block`, `inline-flex`
- Positioning: `absolute`, `relative`, `top-0`
- Borders: `rounded-lg`, `border-2`
- Effects: `shadow-md`, `opacity-50`

**Rule of thumb:** If it's a color, use semantic tokens. If it's layout/spacing/structure, generic Tailwind is fine.

---

## Common Anti-Patterns

### ❌ Avoid: Direct Config Imports in Services

```typescript
// ❌ Bad - hardcoded import
import config from '@/config';

export class MyService {
  doSomething() {
    return config.someValue;
  }
}
```

```typescript
// ✅ Better - pass via constructor or DI
export class MyService {
  constructor(private config: AppConfig) {}

  doSomething() {
    return this.config.someValue;
  }
}
```

### ❌ Avoid: Deep Imports

```typescript
// ❌ Bad
import { User } from '@/modules/auth/domain/entities/user';
import { getLoginFormSchema } from '@/modules/auth/application/forms/login-form.schema';
```

```typescript
// ✅ Good
import { User, getLoginFormSchema } from '@/modules/auth';
```

### ❌ Avoid: Hardcoded English Text

**ALL user-facing text must be in translation files.**

```typescript
// ❌ Bad - hardcoded text
export function DonationPage() {
  return (
    <div>
      <h2>What happens with the money?</h2>
      <p>Your support helps compensate the time and effort...</p>
      <button>Donate Now</button>
    </div>
  );
}
```

```typescript
// ✅ Good - using translations
export async function DonationPage() {
  const t = await getTranslations();

  return (
    <div>
      <h2>{t('app.donate.moneyUsage.heading')}</h2>
      <p>{t('app.donate.moneyUsage.description')}</p>
      <button>{t('app.donate.callToAction')}</button>
    </div>
  );
}
```

### ❌ Avoid: Flat Translation Structure

**Use hierarchical tree structure for related translations.**

```json
// ❌ Bad - flat with repetitive prefixes
{
  "donateMoneyUsageHeading": "What happens with the money?",
  "donateMoneyUsageDescription": "Your support helps...",
  "donateTopSupportersHeading": "Top supporters",
  "donateTopSupportersDescription": "Once this project...",
  "donateTopSupportersFirst": "🥇 Gold",
  "donateTopSupportersSecond": "🥈 Silver"
}
```

```json
// ✅ Good - hierarchical grouping
{
  "donate": {
    "moneyUsage": {
      "heading": "What happens with the money?",
      "description": "Your support helps..."
    },
    "topSupporters": {
      "heading": "Top supporters",
      "description": "Once this project...",
      "first": "🥇 Gold",
      "second": "🥈 Silver"
    }
  }
}
```

### ❌ Avoid: Client Components When Not Needed

```typescript
// ❌ Bad - unnecessary 'use client'
'use client';

export function StaticContent() {
  return <div>Static content</div>;
}
```

```typescript
// ✅ Good - server component by default
export function StaticContent() {
  return <div>Static content</div>;
}
```

### ❌ Avoid: Manual Validation

```typescript
// ❌ Bad - manual validation
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

```typescript
// ✅ Good - Zod schema
export const EmailSchema = z.string().email();
```

### ❌ Avoid: `any` Types

```typescript
// ❌ Bad
const handleData = (data: any) => {
  // No type safety
};
```

```typescript
// ✅ Good
const handleData = (data: User) => {
  // Fully typed
};
```

### ❌ Avoid: Missing Barrel Exports

```typescript
// ❌ Bad - no index.ts in folder
modules/my-feature/
├── domain/
│   └── entities/
│       ├── user.ts
│       └── country.ts
```

```typescript
// ✅ Good - barrel export present
modules/my-feature/
├── domain/
│   └── entities/
│       ├── user.ts
│       ├── country.ts
│       └── index.ts    # export * from './user'; export * from './country';
```

### ❌ Avoid: Generic Color Classes Instead of Semantic Tokens

```typescript
// ❌ Bad - Generic Tailwind colors
export function Banner() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <h1 className="text-blue-600 dark:text-blue-400">Welcome</h1>
      <p className="text-gray-700 dark:text-gray-300">Description</p>
    </div>
  );
}
```

```typescript
// ✅ Good - Semantic tokens
export function Banner() {
  return (
    <div className="bg-surface text-on-surface">
      <h1 className="text-primary">Welcome</h1>
      <p className="text-on-surface">Description</p>
    </div>
  );
}
```

**Why this matters:**
- Semantic tokens automatically handle theme switching
- No need for `dark:` variants everywhere
- Consistent with design system
- Single source of truth for colors

### ❌ Avoid: Git add .

```bash
# ❌ Bad
git add .
git commit -m "fix: something"
```

```bash
# ✅ Good
git add src/modules/auth/domain/entities/user.ts
git add src/modules/auth/application/services/AuthService.ts
git commit -m "fix(auth): resolve user entity validation issue"
```

---

## Quick Reference Checklist

When creating a new feature:

- [ ] Create module under `/src/modules/my-feature/`
- [ ] Follow 4-layer structure: `domain/`, `application/`, `infrastructure/`, `presentation/`
- [ ] Define entities with Zod schemas in `domain/entities/`
- [ ] Define repository interfaces in `domain/repositories/`
- [ ] Implement services in `application/services/`
- [ ] Implement repository in `infrastructure/repositories/`
- [ ] Create React components in `presentation/`
- [ ] Add `index.ts` barrel exports in every folder
- [ ] Create `init.ts` for DI registration (even if empty)
- [ ] Create `types.ts` for DI symbols (if using DI)
- [ ] Register module in `/src/providers/DependencyProvider.tsx`
- [ ] Write unit tests for services (co-located `.test.ts`)
- [ ] Use `'use client'` only when necessary
- [ ] Use Server Components by default
- [ ] Import from barrel exports, not deep paths
- [ ] Follow naming conventions (PascalCase components, kebab-case files, camelCase hooks)
- [ ] Use Zod for all validation and type definitions
- [ ] Use semantic color tokens (`bg-primary`, `text-on-surface`) over generic colors (`bg-blue-500`, `text-white`)
- [ ] Extract all user-facing text to translation files (`/src/i18n/messages/en.ts`)
- [ ] Use hierarchical tree structure for related translations (not flat key-value)
- [ ] Never hardcode English text in components

---

## Additional Resources

**Documentation:**
- `/apps/web/src/modules/README.md` - Architecture guide with diagrams
- `/apps/web/e2e/README.md` - E2E testing guide
- `/README.md` - Project overview
- `/CONTRIBUTING.md` - Contribution guidelines

**Key Technologies:**
- **Next.js 16** - React framework (App Router)
- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **TailwindCSS 4** - Styling
- **Zod** - Runtime validation & type inference
- **InversifyJS** - Dependency injection
- **Zustand** - Client state management
- **next-intl** - Internationalization
- **react-hook-form** - Form handling
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **Turborepo** - Monorepo task runner
- **pnpm** - Package manager
