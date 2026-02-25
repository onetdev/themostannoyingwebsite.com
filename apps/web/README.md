# MAW webapp

For project details, please see the [`README.md`](https://github.com/onetdev/themostannoyingwebsite.com/blob/develop/README.md) in the root folder of the project.

## App Structure

The application is organized into several distinct layers to ensure maintainability and testability:

- `src/app/`: Next.js App Router structure, handling global layouts, routing, and server-side metadata generation. **Lean Page Pattern**: Keep `page.tsx` files minimal; they should fetch data and define metadata, then delegate UI to dedicated "Page" components located in `src/features/*/components/` or a local `_components/` folder.
- `src/features/`: Domain-specific modules (e.g., `auth`, `donation`, `interferrer`). Each feature encapsulates its own components (including full-page UI), hooks, and utility logic. _See feature-specific READMEs for details on their responsibilities._
- `src/services/`: Business logic layer. Includes `KernelService`, which acts as a central hub for application logic, managed via Dependency Injection.
- `src/repositories/`: Data access layer, abstracting data fetching and persistence (e.g., `StaticCountryRepository`).
- `src/providers/` & `src/contexts/`: Global React providers for themes, i18n, and dependency injection containers.
- `src/stores/`: Lightweight state stores using Zustand for shared client-side state.

## How to Structure a Feature

When adding a new feature to `src/features/`, follow this standardized structure to maintain consistency:

```text
src/features/[feature-name]/
├── components/    # Feature-specific UI components
├── hooks/         # Custom React hooks for local feature logic
├── services/      # Business logic, often using Inversify for DI
├── schemas/       # Zod validation schemas for forms or data
├── types.ts       # TypeScript interfaces and types
└── README.md      # A concise overview of the feature
```

- **Barrel files**: Only export items intended for use outside the feature.
- **Aggregation**: For multi-file components, compose them within a separate folder and expose only the non-internal parts.
- **Encapsulation**: Keep feature-specific logic within its own directory to minimize coupling.
- **Dependency Injection**: Implement business logic in `services/` and register them if they need to be injectable or mocked.
- **Shared UI**: If a component is used by multiple features, move it to `src/app/_components/` or the `@maw/ui-lib` package.
- **Documentation**: Every feature must include a `README.md` providing a brief overview of its responsibilities.

## Monorepo Integration

The web app leverages several internal packages to maintain a clean separation of concerns:
- `@maw/ui-lib`: Shared design system containing Radix UI-based components and global styles.
- `@maw/content-api`: Internal API/SDK for managing and retrieving application content.
- `@maw/logger` & `@maw/utils`: Cross-project logging infrastructure and common TypeScript helpers.

## Key Architectural Patterns

1. Dependency Injection: Services and repositories are decoupled from UI components using InversifyJS tokens, facilitating easier mocking and testing.
2. Feature-Sliced Design: Logic is grouped by feature rather than type, reducing the cognitive load when working on specific domain areas like obstructor or
  newsletter.
3. Layered Data Flow: Components → Services → Repositories → Content API.
4. Comprehensive Testing: A dual-layer testing strategy using Jest for unit/integration logic and Playwright for end-to-end browser verification.
