# Obstruction Decor Module

Visual obstructions and annoying decorative elements that interfere with normal browsing.

## Features

### Dead Pixel
- **`DeadPixelHost`** - Renders a fake "dead pixel" on the screen
- Appears as a small, permanently visible dot that users might mistake for a monitor issue

### Sticky Video
- **`GlobalStickyVideoHost`** - Sticky video element that follows scroll
- Obstructs content while scrolling through the page

## Usage

```typescript
// Use in layout or pain point decorator
import { DeadPixelHost, GlobalStickyVideoHost } from '@/modules/obstruction-decor';

function Layout() {
  const deadPixel = usePainPreferencesStore(state => state.deadPixel);
  const stickyVideo = usePainPreferencesStore(state => state.stickyVideo);

  return (
    <div>
      {deadPixel && <DeadPixelHost />}
      {stickyVideo && <GlobalStickyVideoHost />}
      {children}
    </div>
  );
}
```

## Configuration

Both components are controlled by pain point flags:
- `deadPixel` - Enables/disables the dead pixel
- `stickyVideo` - Enables/disables the sticky video

These flags can be toggled through the settings UI to control the level of annoyance.

## Purpose

These components are intentionally designed to frustrate users as part of "the most annoying website" pain points. They provide visual interference without blocking actual functionality.
