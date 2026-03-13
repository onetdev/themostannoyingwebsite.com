# AI Agent Guide - MAW Web App

This document provides specific instructions and context for AI agents working on the `apps/web` project.

---

## 🏗 Architecture & Key Locations

### Core Directories
- `src/app/`: Next.js App Router.
  - `bootstrap/`: Application root providers and DI container initialization.
- `src/core/`: Foundation logic.
  - `config/`: App configuration (environment, deployment meta).
  - `di/`: Dependency Injection core (InversifyJS setup, base symbols).
  - `events/`: Global event bus (Emittery).
  - `http/`: HTTP client and API abstractions.
  - `observability/`: Logging and monitoring (Sentry).
- `src/features/`: Domain-specific modules. **This is where most logic belongs.**
- `src/hooks/`: Shared, app-wide React hooks.
- `src/i18n/`: Internationalization.
  - `messages/`: Global translation bundles.
- `src/navigation/`: Localization-aware routing and navigation logic.
- `src/schemas/`: Shared Zod validation schemas.
- `src/services/`: Global business logic (e.g., `AppService`).
- `src/stores/`: Global state management (Zustand).

---

## 🌍 Internationalization (i18n)

We use `next-intl`. **NEVER hardcode user-facing strings.**

### 1. Global Messages (`src/i18n/messages/`)
Structured by language folders: `src/i18n/messages/{locale}/`
- `index.ts`: Aggregates all feature and global translations.
- `common.ts`: Shared UI strings (buttons, labels, common errors).
- `metadata.ts`: SEO titles and descriptions.
- `variants.ts`: Large arrays for shared UI elements (e.g., random names).

### 2. Feature Translations (`src/features/{feature}/i18n/`)
Two patterns allowed based on complexity:
- **Single File**: `i18n/{locale}.ts` (if only simple keys exist).
- **Directory**: `i18n/{locale}/` containing `index.ts` and `variants.ts` (if arrays/complex shapes are needed).

### 3. Usage in Services
If a Service needs random data (e.g., `CommentService.ts` needs a list of names):
- Put that data in `variants.ts`.
- Dynamic import it in the Service: `import(\`@/i18n/messages/${locale}/variants\`)`.
- **Why?** Keeps main bundles small and prevents loading all translations into the background service logic.

---

## 💉 Dependency Injection (InversifyJS)

1.  **Define Symbol**: In `features/{feature}/types.ts`, add to `DI` object.
2.  **Implementation**: Create class in `services/`, mark with `@injectable()`.
3.  **Registration**: 
    - Create `features/{feature}/init.ts` to bind the symbol to implementation.
    - Call this init function in `src/app/bootstrap/di.ts`.
4.  **Consumption**: Use `useService(DI.Symbol)` or create a dedicated hook `useMyService()`.


---

## 🛠 Common Tasks Workflow

### Adding a New Feature
1.  Create folder in `src/features/`.
2.  Define types and DI symbols in `types.ts`.
3.  Add Zod schemas in `schemas/`.
4.  Implement business logic in `services/`.
5.  Create UI in `components/`.
6.  Add translations in `i18n/`.
7.  Register in `src/app/bootstrap/di.ts`.

### Adding a New Page
1.  Create route in `src/app/`.
2.  Implement `generateMetadata` using `getTranslations({ locale, namespace: 'metadata.xxx' })`.
3.  Keep `page.tsx` lean; fetch data and pass to a Feature component.
4.  Wrap content in `PageLayout`.

---

## 📏 Standards & Linting

- **Formatting**: We use **Biome**. Run `pnpm lint:fix` before finishing.
- **Naming**: 
    - `PascalCase` for Components and Classes.
    - `kebab-case` for folders and non-component files.
    - `camelCase` for hooks.
- **CSS**: Use **TailwindCSS 4** semantic tokens (e.g., `text-primary`, `bg-background`). Avoid hex colors.
- **Icons**: Use FontAwesome via our UI library wrappers.

---

## 🧪 Testing

- **Unit**: Co-locate `*.test.ts` with logic. Use `jest`.
- **E2E**: Place in `e2e/tests/`. Use `playwright`.
- **Validation**: Every new feature or bug fix **MUST** have a corresponding test.

---

## ⚠️ Anti-Patterns to Avoid
- ❌ Putting UI logic in `page.tsx` (Move to `features/*/components/`).
- ❌ Directly importing `en.ts` for types (Use `AppTranslationShape` from `src/types.ts`).
- ❌ Using `any` (Define Zod schemas and infer types).
- ❌ Manual `fetch` calls (Use repositories or services).
