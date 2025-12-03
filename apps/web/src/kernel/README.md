# Kernel Module

The Kernel module serves as the core foundation of the application, providing shared infrastructure, state management, and utilities that other modules depend on. It follows Clean Architecture principles with clear separation of concerns.

## Architecture

The kernel is organized into distinct layers:

### **Application Layer** (`/application`)
Business logic and orchestration layer:
- **Providers**: React context providers for DI container and navigation
- **Services**: Core application services (`KernelService`)
- **Use Cases**: Business logic operations (e.g., `get-countries`)
- **Hooks**: Reusable React hooks (`useZodFormValidator`)
- **Result**: Result type utilities for error handling

### **Domain Layer** (`/domain`)
Core business entities and state management:
- **Entities**: Core business objects and data structures
- **Repositories**: Abstract repository interfaces
- **Value Objects**: Immutable domain value types
- **Stores**: Zustand state management stores
  - `experience-flags.ts` - Manages annoying experience toggles
  - `user-grants.ts` - Handles user permissions and grants
  - `user-preferences.ts` - User preference management
  - `runtime.ts` - Runtime application state

### **Infrastructure Layer** (`/infrastructure`)
External dependencies and data access:
- **Static Data**: Country data, configuration files
- **Repository Implementations**: Concrete implementations of domain repositories

### **Presentation Layer** (`/presentation`)
UI components and presentation logic:
- **Settings**: Complete settings UI system
  - `ExperienceSettings.tsx` - Toggle annoying experiences
  - `MandatoryExperienceSettings.tsx` - Non-optional experiences
  - `PreferencesSettings.tsx` - User preference controls
  - `RuntimeSettings.tsx` - Runtime configuration UI
  - `UserGrantsSettings.tsx` - Permission management UI

## Key Features

### State Management (Zustand)
- Centralized state stores for cross-module communication
- Persistent user preferences and experience flags
- Runtime state management for dynamic behavior

### Dependency Injection
- Lightweight IoC container for service management
- Clean separation of concerns and testability
- Provider pattern for React component tree

### Settings System
- Complete settings UI for all user preferences
- Annoying experience toggles (core to the website's purpose)
- Mandatory experiences that cannot be disabled

### Form Validation
- Zod-based form validation with React Hook Form integration
- Type-safe validation schemas
- Consistent validation patterns across the app

## Usage

The kernel is automatically initialized and provides:
- Global state management through Zustand stores
- Settings UI components for user preferences
- Core services and utilities for other modules
- Form validation utilities and hooks

Other modules import kernel functionality as needed:

```typescript
// Import stores
import { useExperienceFlags } from '@/kernel/domain/stores';

// Import services
import { useKernelService } from '@/kernel/application/services';

// Import settings UI
import { ExperienceSettings } from '@/kernel/presentation/settings';
```

## Design Philosophy

The kernel embodies the application's core principle: **maximum annoyance through configurable experiences**. It provides the infrastructure to:
- Enable/disable various annoying website features
- Persist user "preferences" (which may be ignored)
- Manage the overall annoying experience state
- Provide consistent UI for fake settings that don't always work

This architecture ensures that annoying features can be systematically managed while maintaining clean, testable code.
