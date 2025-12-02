# Notification Module

Browser notification permission management with automatic permission requests and manual guidance.

## Overview

This module implements notification permission functionality:

- **Permission Request Flow** - Automatic permission request triggered by scroll distance
- **Manual Guidance Modal** - Instructional modal shown when permission is denied
- **Permission State Tracking** - Integration with user grants store
- **Experience-based Triggering** - Scroll-based trigger mechanism

## Structure

The module follows clean architecture principles with the following layers:

### Domain Layer (`domain/`)

Core business entities and repository interfaces (ready for future notification entities).

### Infrastructure Layer (`infrastructure/`)

Implementation details for data access and external services (ready for notification API implementations).

### Presentation Layer (`presentation/`)

UI components and experience hosts:

- **Components**
  - `ManualModal.tsx` - Modal with instructions for manually enabling notifications

- **Experience Hosts**
  - `NotificationPermissionExperienceHost.tsx` - Manages notification permission request flow

## Features

### Notification Permission Host

- **Automatic Request**: Requests browser notification permission after user scrolls specified distance
- **Initial State Detection**: Only triggers if permission state is 'default' (not yet asked)
- **Denied Flow**: Shows manual guidance modal if user denies permission
- **Permission Sync**: Automatically syncs permission state with user grants store
- **Experience Flag**: Respects global notification experience flag

### Manual Modal

- **Instructional Content**: Displays translated instructions for enabling notifications
- **Dimmer Overlay**: Full-screen dimmer for modal focus
- **Responsive Design**: Adapts to mobile and desktop viewports
- **Translation Support**: Uses i18n for multilingual support

### Permission State Management

The module integrates with:
- `@/utils/permission` - Browser permission API utilities
  - `getNotificationPermissionState()` - Get current permission state
  - `requestNotificationPermission()` - Request notification permission
- `@/kernel` - User grants store for permission tracking
- Experience flags store for feature toggles

## Integration

This module is registered in the DI container via `init.ts` and integrated through `DependencyProvider`.

The notification permission host typically appears in experience providers or layout components.

## Configuration

### Scroll Distance Trigger

Default scroll distance is 400px, but can be customized:

```typescript
<NotificationPermissionExperienceHost scrollDistanceTrigger={800} />
```

### Translation Keys

Required translation keys:

```json
{
  "notification": {
    "modal": {
      "title": "Enable Notifications",
      "description": "To receive notifications, please enable them in your browser settings."
    }
  },
  "common": {
    "dismiss": "Dismiss"
  }
}
```
