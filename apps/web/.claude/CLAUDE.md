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

**Reference:** `/src/features/auth/schemas/user.ts`

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

**Reference:** `/src/features/auth/schemas/gender.ts`

#### Config Pattern

```typescript
// schemas/app-config.ts
import { z } from 'zod';
import { AppThemeSchema } from './app-theme';
import { DonationConfigSchema } from '@/features/donation/schemas';

export const AppConfigSchema = z.object({
  defaultColorScheme: AppThemeSchema,
  donation: DonationConfigSchema,
  deploymentMeta: DeploymentMetaSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
```

**Reference:** `/src/schemas/app-config.ts`

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
// app/[locale]/(public)/donate/page.tsx
import { getTranslations } from 'next-intl/server';
import { DonationPage } from '@/features/donation/components/DonationPage';

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

**Reference:** `/src/app/[locale]/(public)/donate/page.tsx`

**Client Component Example:**

```typescript
// features/donation/components/DonationCalculator.tsx
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
- Feature hooks: `features/[feature-name]/hooks/`
- Shared hooks: `hooks/`

**Naming:** Always start with `use`

**Application Hook Example:**

```typescript
// features/donation/hooks/useDonationBalance.ts
import { useMemo } from 'react';
import { useDonationService } from '../services';
import { useAppConfig } from '@/contexts/AppConfig';

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

**Reference:** `/src/features/donation/hooks/useDonationBalance.ts`

### Form Patterns

**Use Zod + react-hook-form + @hookform/resolvers**

**Schema Factory:**

```typescript
// features/auth/schemas/login-form.ts
import { z } from 'zod';
import { ZodTranslator } from '@/types';

export function getLoginFormDataSchema(t: ZodTranslator) {
  return z.object({
    email: z.email({ message: t('form.validation.error.emailInvalid') }),
    password: z.string().min(1, { message: t('form.validation.error.required') }),
    captcha: getCaptchaEmojiDataSchema(t),
    remember: z.boolean().optional(),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormDataSchema>>;
```

**Form Hook:**

```typescript
// features/auth/hooks/useLoginForm.ts
'use client';

import { useForm } from 'react-hook-form';
import { useAuthService } from './useAuthService';
import { getLoginFormDataSchema, LoginFormData } from '../schemas';
import { useZodFormValidator } from '@/hooks';

export function useLoginForm({ onSuccess }: { onSuccess?: (user: User) => void }) {
  const authService = useAuthService();
  const resolver = useZodFormValidator(getLoginFormDataSchema);
  const methods = useForm<LoginFormData>({ resolver });

  const onSubmit = async (data: LoginFormData) => {
    const result = await authService.login(data);
    if (result.success && result.data) {
      onSuccess?.(result.data);
    } else {
      methods.setError('root', { message: result.error?.message });
    }
  };

  return { ...methods, onSubmit };
}
```

**Form Component:**

```typescript
// features/auth/components/LoginForm/LoginForm.tsx
'use client';

import { FormProvider } from 'react-hook-form';
import { Button, Input, FormError } from '@maw/ui-lib';
import { useLoginForm } from '../../hooks/useLoginForm';

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

**Reference:** `/src/features/auth/schemas/login-form.ts` and `/src/features/auth/hooks/useLoginForm.ts`

### Context Providers

**Standard Context Pattern:**

```typescript
// contexts/AppConfig.tsx
'use client';

import { createContext, useContext, PropsWithChildren } from 'react';
import { AppConfig } from '@/schemas/app-config';

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

**Reference:** `/src/contexts/AppConfig.tsx`

### State Management with Zustand

**Store Pattern:**

```typescript
// stores/user-preferences.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserPreferencesState {
  enableSound: boolean;
  adultFilter: boolean;
}

export interface UserPreferencesStateActions {
  setEnableSound: (enableSound: boolean) => void;
  setAdultFilter: (adultFilter: boolean) => void;
}

export interface UserPreferencesStore
  extends UserPreferencesState,
          UserPreferencesStateActions {}

const initialState: UserPreferencesState = {
  enableSound: true,
  adultFilter: true,
};

export const useUserPreferencesStore = create<UserPreferencesStore>()(
  persist(
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

**Reference:** `/src/stores/user-preferences.ts`

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

**2. Semantic Grouping Over Flat Key-Value**

Organize translations logically, grouping related keys under common namespaces.

**❌ Bad - Flat structure with repetitive prefixes:**

```json
{
  "donateMoneyUsageHeading": "What happens with the money?",
  "donateMoneyUsageDescription": "Your support helps...",
  "donateDisclaimerHeading": "Disclaimer"
}
```

**✅ Good - Semantic grouping:**

```json
{
  "donate": {
    "moneyUsageHeading": "What happens with the money?",
    "moneyUsageDescription": "Your support helps...",
    "disclaimer": "Disclaimer"
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

**Organize by feature area or logical group:**

```typescript
export default {
  app: {
    title: 'The Most Annoying Website',
    donate: {
      moneyUsageHeading: 'What happens with the money?',
      // ...
    }
  },
  navigation: {
    home: 'Home',
    // ...
  },
  common: {
    yes: 'Yes',
    // ...
  }
}
```

### Usage Patterns

**Server Components:**

```typescript
import { getTranslations } from 'next-intl/server';

export async function DonationPage() {
  const t = await getTranslations('app.donate');

  return (
    <div>
      <h2>{t('moneyUsageHeading')}</h2>
      <p>{t('moneyUsageDescription')}</p>
    </div>
  );
}
```

**Client Components:**

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function DonationForm() {
  const t = useTranslations('common');

  return (
    <form>
      <button type="submit">{t('submit')}</button>
    </form>
  );
}
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
// ❌ Before - flat structure
{
  "donateMoneyUsageHeading": "What happens with the money?",
  "donateMoneyUsageDescription": "Your support helps...",
  "donateDisclaimerHeading": "Disclaimer"
}
```

```json
// ✅ After - hierarchical structure
{
  "donate": {
    "moneyUsageHeading": "What happens with the money?",
    "moneyUsageDescription": "Your support helps...",
    "disclaimer": "Disclaimer"
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
- **Usage examples:** `/apps/web/src/features/donation/presentation/DonationPage.tsx`

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

**Global and feature-specific DI symbols:**

```typescript
// features/auth/types.ts
export const DI = {
  AuthService: Symbol.for('AuthService'),
  AuthRepository: Symbol.for('AuthRepository'),
};

// src/types.ts (Global)
export const DI = {
  CountryRepository: Symbol.for('CountryRepository'),
  KernelService: Symbol.for('KernelService'),
};
```

**Reference:** `/src/types.ts`, `/src/features/auth/types.ts`

### Feature Registration

**Each feature with services has an `init.ts` file:**

```typescript
// features/auth/init.ts
import { Container } from 'inversify';
import { FakeAuthRepository } from './repositories';
import { AuthService } from './services';
import { DI } from './types';

export const init = (di: Container) => {
  di.bind(DI.AuthRepository).to(FakeAuthRepository).inSingletonScope();
  di.bind(DI.AuthService).to(AuthService).inSingletonScope();
};
```

**Reference:** `/src/features/auth/init.ts`, `/src/providers/AppDependencyRegistry.tsx`

### Injectable Service Pattern

**Service with DI:**

```typescript
// features/auth/services/AuthService.ts
import { injectable, inject } from 'inversify';
import { DI, type AuthRepository } from '../types';

@injectable()
export class AuthService {
  @inject(DI.AuthRepository)
  private authRepo!: AuthRepository;

  login(data: LoginUseCaseParams) {
    return loginUseCase(this.authRepo, data);
  }
}
```

**Hook to access service:**

```typescript
// features/auth/hooks/useAuthService.ts
import { useDependencyContainer } from '@/contexts/DependencyContainer';

export const useAuthService = () => {
  const { container } = useDependencyContainer();
  return container.get<AuthService>(DI.AuthService);
};
```

**Reference:** `/src/features/auth/services/AuthService.ts`

### Utility Service Pattern (No DI)

**Simple service without dependencies:**

```typescript
// features/donation/services/DonationService.ts
export class DonationService {
  calculateBalance(config: DonationBalanceConfig): number {
    // Pure logic, no dependencies
  }
}

// Hook wrapper
export const useDonationService = (): DonationService => {
  return useMemo(() => new DonationService(), []);
};
```

**Reference:** `/src/features/donation/services/DonationService.ts`

**Rule:** Only use DI when a service has dependencies. For utility classes, use simple instantiation or factory functions.

### Repository Pattern

**Interface in types:**

```typescript
// features/auth/types.ts
export interface AuthRepository {
  authenticate(data: AuthenticationData): PromiseResult<User, AuthError>;
  // ...
}
```

**Implementation in repositories:**

```typescript
// features/auth/repositories/FakeAuthRepository.ts
import { injectable } from 'inversify';
import { type AuthRepository } from '../types';

@injectable()
export class FakeAuthRepository implements AuthRepository {
  async authenticate() {
    // Implementation
  }
}
```

**Reference:** `/src/features/auth/repositories/FakeAuthRepository.ts`, `/src/repositories/StaticCountryRepository.ts`

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
import { useZodFormValidator } from '@/hooks';              // App
import { User } from '../schemas';                          // Relative
```

### Import Rules

**✅ Do:**
- Use path aliases for global directories: `import { DI } from '@/types'`
- Keep relative imports within the same feature or directory.
- Use clean feature imports: `import { useAuthService } from '@/features/auth/hooks/useAuthService'`

**❌ Don't:**
- Use deep relative paths to jump between features: `import { X } from '../../auth/services/X'`
- Use long relative paths: `import { X } from '../../../../types'`


---

## Testing Standards

### Unit Tests with Jest

**Location:** Co-located with source files

**Naming:** `*.test.ts` or `*.test.tsx`

**Structure:**

```typescript
// DonationService.test.ts
import { DonationService } from './DonationService';

describe('DonationService', () => {
  let service: DonationService;

  beforeEach(() => {
    service = new DonationService();
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

**Reference:** `/src/features/donation/services/DonationService.test.ts`

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
text-foreground       // Main foreground color
bg-card               // Card background
text-card-foreground  // Text on card
bg-popover            // Popover background
```

#### Brand Colors
```typescript
// ✅ Preferred
bg-primary           // Primary brand color
bg-primary-alt       // Primary hover state
text-primary-foreground // Text on primary background

bg-secondary         // Secondary color
bg-tertiary          // Tertiary color
```

#### Status Colors
```typescript
// ✅ Preferred
bg-success           // Success state
text-success-foreground // Text on success background

bg-warning           // Warning state
bg-error             // Error state
text-error-foreground // Text on error background
```

#### Other Semantic Colors
```typescript
bg-dimmer            // Dimmer overlay
bg-border-primary        // Horizontal rule primary
bg-border-secondary      // Horizontal rule secondary
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
animate-flashing-invert-half // Flashing invert effect
animate-wiggle-15deg         // Wiggle animation (15deg)
animate-wiggle-8deg          // Wiggle animation (8deg)
animate-width-100-0          // Width transition 100→0% (reverse)
animate-gift-callout         // Gift callout animation
animate-hue-full-rotate      // Full hue rotation
```

**Reference:** `/packages/ui-lib/src/styles/base/animations.css`

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
    <div className="bg-card text-card-foreground rounded-lg p-4">
      <h2 className="text-primary text-2xl font-semibold">Title</h2>
      <p className="text-card-foreground">Content</p>
      <Button className="bg-primary text-primary-foreground">Submit</Button>
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
import { User } from '@/features/auth/schemas/user';
```

```typescript
// ✅ Good
import { User } from '@/features/auth/schemas';
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
  const t = await getTranslations('app.donate');

  return (
    <div>
      <h2>{t('moneyUsageHeading')}</h2>
      <p>{t('moneyUsageDescription')}</p>
      <button>{t('callToAction')}</button>
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
  "donateDisclaimer": "Disclaimer"
}
```

```json
// ✅ Good - hierarchical grouping
{
  "donate": {
    "moneyUsageHeading": "What happens with the money?",
    "moneyUsageDescription": "Your support helps...",
    "disclaimer": "Disclaimer"
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
features/my-feature/
├── components/
│   ├── UserProfile.tsx
│   └── UserList.tsx
```

```typescript
// ✅ Good - barrel export present
features/my-feature/
├── components/
│   ├── UserProfile.tsx
│   ├── UserList.tsx
│   └── index.ts    # export * from './UserProfile'; export * from './UserList';
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
    <div className="bg-card text-card-foreground">
      <h1 className="text-primary">Welcome</h1>
      <p className="text-card-foreground">Description</p>
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
git add src/features/auth/schemas/user.ts
git add src/features/auth/services/AuthService.ts
git commit -m "fix(auth): resolve user entity validation issue"
```

---

## Quick Reference Checklist

When creating a new feature:

- [ ] Create directory under `/src/features/my-feature/`
- [ ] Implement UI components in `components/`
- [ ] Implement custom hooks in `hooks/`
- [ ] Define Zod schemas and types in `schemas/`
- [ ] Implement business logic in `services/`
- [ ] Create `init.ts` for DI registration (even if empty)
- [ ] Create `types.ts` for DI symbols (if using DI)
- [ ] Register feature in `/src/providers/AppDependencyRegistry.tsx`
- [ ] Write unit tests for services (co-located `.test.ts`)
- [ ] Use `'use client'` only when necessary
- [ ] Use Server Components by default
- [ ] Follow naming conventions (PascalCase components, kebab-case files, camelCase hooks)
- [ ] Use Zod for all validation and type definitions
- [ ] Use semantic color tokens (`bg-primary`, `text-on-surface`) over generic colors (`bg-blue-500`, `text-white`)
- [ ] Extract all user-facing text to translation files (`/src/i18n/messages/en.ts`)
- [ ] Use hierarchical tree structure for related translations (not flat key-value)
- [ ] Never hardcode English text in components

---

## Additional Resources

**Documentation:**
- `/apps/web/src/features/README.md` - Architecture guide with diagrams
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
