# Notification Module

Browser notification permission management with automatic requests and manual guidance.

## Features

- **Automatic Permission Request** - Requests notification permission after user scrolls
- **Smart Detection** - Only triggers if permission hasn't been asked before
- **Denied Flow** - Shows instructional modal when user denies permission
- **Permission Sync** - Automatically syncs with user grants store

## Components

- **`NotificationPermissionHost`** - Main host that manages permission flow
- **`ManualModal`** - Modal with instructions for manually enabling notifications

## Usage

```typescript
// Use the pain point host (recommended)
import { NotificationPermissionHost } from '@/modules/notification';

<NotificationPermissionHost scrollDistanceTrigger={400} />

// Use manual modal directly
import { ManualModal } from '@/modules/notification';

<ManualModal
  visible={showModal}
  onDismiss={() => setShowModal(false)}
/>
```

## Configuration

- **Scroll Distance**: Default 400px, configurable via prop
- **Pain Point Flag**: Can be toggled via `notifications` pain point flag
- **Translation Keys**: Modal content uses `notification.modal.title` and `notification.modal.description`

## Browser Behavior

The module uses browser permission utilities from `@/utils/permission`:
- `getNotificationPermissionState()` - Check current permission status
- `requestNotificationPermission()` - Request permission from user

Permission states:
- `'default'` - Not asked yet (module will trigger)
- `'granted'` - Already granted (module does nothing)
- `'denied'` - Previously denied (shows manual modal)
