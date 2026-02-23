---
description: Initialize a new module following clean architecture patterns
argument-hint: <module-name> [complexity]
---

Initialize a new module with clean architecture structure, dependency injection setup, and proper integration.

## Arguments
- `$1`: Module name (required, kebab-case, e.g., "user-notifications")
- `$2`: Complexity level (optional, default: `standard`)
  - `minimal`: Presentation layer only (for simple UI features)
  - `standard`: Presentation + basic domain structure (most common)
  - `full`: Complete clean architecture with all layers (complex business logic)

## Process

### 1. **Pre-Analysis Phase**

Before creating any files, perform thorough analysis:

1. **Validate Module Name**
   - Check if `$1` is provided, error if missing
   - Validate kebab-case format (lowercase, hyphens only)
   - Check if module already exists at `apps/web/modules/{module-name}`
   - If exists, error: "Module '{module-name}' already exists"

2. **Analyze Existing Modules**
   - List all existing modules in `apps/web/modules/`
   - Read at least 2 existing module structures for reference
   - Identify common patterns:
     - Directory structure conventions
     - File naming patterns
     - Import/export patterns
     - DI registration patterns
   - Display findings: "Found {count} existing modules: {names}"

3. **Determine Complexity**
   - If `$2` not provided, default to `standard`
   - Validate `$2` is one of: `minimal`, `standard`, `full`
   - Display: "Creating module with '{complexity}' complexity"

4. **Check Integration Points**
   - Read `apps/web/src/providers/DependencyProvider.tsx`
   - Identify where new module init should be added
   - Check `apps/web/tsconfig.json` for path aliases
   - Verify `@/features/*` path mapping exists

5. **Create Todo List**
   - Use TodoWrite tool to create comprehensive task list
   - Base tasks on complexity level and analysis findings
   - Display: "Created {count} tasks for module initialization"

### 2. **Module Structure Creation**

Based on complexity level, create appropriate structure:

#### Minimal Complexity
```
{module-name}/
├── presentation/
│   ├── components/
│   │   └── .gitkeep
│   └── index.ts
├── index.ts
├── init.ts
└── README.md
```

#### Standard Complexity
```
{module-name}/
├── domain/
│   ├── entities/
│   │   └── index.ts
│   ├── repositories/
│   │   └── index.ts
│   └── index.ts
├── infrastructure/
│   └── index.ts
├── presentation/
│   ├── components/
│   │   └── .gitkeep
│   └── index.ts
├── index.ts
├── init.ts
├── types.ts
└── README.md
```

#### Full Complexity
```
{module-name}/
├── domain/
│   ├── entities/
│   │   └── index.ts
│   ├── repositories/
│   │   └── index.ts
│   ├── value-objects/
│   │   └── index.ts
│   ├── errors.ts
│   └── index.ts
├── infrastructure/
│   ├── repositories/
│   │   └── index.ts
│   └── index.ts
├── application/
│   ├── services/
│   │   └── index.ts
│   ├── use-cases/
│   │   └── index.ts
│   └── index.ts
├── presentation/
│   ├── components/
│   │   └── .gitkeep
│   ├── pages/
│   │   └── index.ts
│   └── index.ts
├── index.ts
├── init.ts
├── types.ts
└── README.md
```

### 3. **File Content Generation**

Generate proper content for each file based on patterns from existing modules:

**index.ts** (root)
```typescript
// Export all layers
export * from './domain';
export * from './infrastructure';
export * from './application';
export * from './presentation';
```

**init.ts**
```typescript
import { Container } from 'inversify';
// Import services and repositories as needed
// import { DI } from './types';

export const init = (di: Container) => {
  // Register dependencies here
  // Example:
  // di.bind(DI.ServiceName).to(ServiceClass).inSingletonScope();
};
```

**types.ts** (if needed)
```typescript
export const DI = {
  // Define DI symbols here
  // Example:
  // ServiceName: Symbol.for('{ModuleName}Service'),
  // RepositoryName: Symbol.for('{ModuleName}Repository'),
};
```

**README.md**
```markdown
# {Module Name} Module

[Brief description of what this module does]

## Overview

This module implements:
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Structure

[Describe the module's architecture and key components]

## Usage

[Provide examples of how to use the module]

## Integration

[Explain how this module integrates with the rest of the application]
```

**Layer index.ts files**
```typescript
// Export all entities/repositories/components from this layer
```

### 4. **Integration Steps**

1. **Update DependencyProvider**
   - Read current `DependencyProvider.tsx`
   - Add import: `import { init as init{PascalCase} } from '@/features/{module-name}/init';`
   - Add init call in container creation: `init{PascalCase}(container);`
   - Add comment if needed to guide where new modules should be registered
   - Display: "✓ Updated DependencyProvider.tsx"

2. **Verify Path Aliases**
   - Confirm `@/features/*` mapping exists
   - If missing, warn user to update tsconfig.json
   - Display: "✓ Path aliases verified"

### 5. **Post-Creation Verification**

1. **File System Check**
   - Verify all expected files were created
   - Check file permissions
   - Display created structure tree
   - Display: "✓ Created {count} files and {count} directories"

2. **Type Checking**
   - Run `pnpm run check-types` to verify no TypeScript errors
   - If errors, display them and mark in todo list
   - Display: "✓ TypeScript compilation successful"

3. **Git Status**
   - Show git status of new files
   - Display: "New files ready for commit"

### 6. **Next Steps & Documentation**

Display helpful information for the developer:

```
✓ Module '{module-name}' initialized successfully!

Created structure:
[Display tree of created files]

Integration status:
✓ DependencyProvider updated
✓ TypeScript paths configured
✓ Ready for development

Next steps:
1. Review and update README.md with module-specific documentation
2. Define domain entities in domain/entities/ (if using standard/full)
3. Create repository interfaces in domain/repositories/ (if using standard/full)
4. Implement presentation components in presentation/components/
5. Register any DI bindings in init.ts
6. Import and use module components in your pages/layouts

Useful commands:
- Add this module to a page: import { ComponentName } from '@/features/{module-name}';
- Run type check: pnpm run check-types
- Run tests: pnpm run test

Example usage in a page:
import { ComponentName } from '@/features/{module-name}';

export default function Page() {
  return <ComponentName />;
}
```

## Complexity Level Guidelines

### When to use `minimal`
- Simple UI components without business logic
- Static content or presentational modules
- No data persistence or complex state
- Examples: modals, overlays, decorative elements

### When to use `standard`
- Moderate complexity with some business logic
- Requires domain models and repositories
- May need services but not complex use cases
- Examples: user profiles, notifications, comments
- **This is the recommended default for most modules**

### When to use `full`
- Complex business logic requiring use cases
- Multiple domain entities with relationships
- Advanced state management needs
- Examples: authentication, payment processing, order management

## Important Notes

- **Always analyze first**: The pre-analysis phase is mandatory - never skip it
- **Pattern consistency**: Match existing module patterns found during analysis
- **Clean architecture**: Follow the layered structure from modules/README.md
- **Dependency injection**: Use inversify container for DI when needed
- **Type safety**: All files should have proper TypeScript types
- **Documentation**: README.md should be descriptive and helpful
- **Git ready**: New module should be ready to commit after creation

## Error Handling

If any step fails:
1. Display clear error message
2. Show what was completed successfully
3. Provide guidance on how to fix the issue
4. Update todo list to reflect blocking issue
5. Do not proceed with dependent tasks

## Examples

### Example 1: Simple UI Module
```
/init-module notification-toast minimal
```
Creates a minimal module for toast notifications with presentation layer only.

### Example 2: Standard Feature Module (Default)
```
/init-module user-preferences
```
Creates a standard module with domain and presentation layers.

### Example 3: Complex Business Module
```
/init-module payment-processing full
```
Creates a full clean architecture module with all layers.

## Common Issues

- **Module already exists**: Check modules directory, maybe you meant to extend it?
- **TypeScript errors**: Usually path aliases, verify tsconfig.json
- **DI registration fails**: Check init.ts and types.ts for proper symbols
- **Import errors**: Verify index.ts exports are correct in each layer
