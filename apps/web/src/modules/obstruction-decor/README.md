# Obstruction Decor Module

Visual obstructions and annoying decorative elements that interfere with normal browsing.

## Features

### Dead Pixel
- **`DeadPixelHost`** - Renders a fake "dead pixel" on the screen
- Appears as a small, permanently visible dot that users might mistake for a monitor issue

### Sticky Video
- **`StickyVideoExperienceHost`** - Sticky video element that follows scroll
- Obstructs content while scrolling through the page

## Usage

```typescript
// Use in layout or experience decorator
import { DeadPixelHost, StickyVideoExperienceHost } from '@/modules/obstruction-decor';

function Layout() {
  const deadPixel = useExperienceFlagsStore(state => state.deadPixel);
  const stickyVideo = useExperienceFlagsStore(state => state.stickyVideo);

  return (
    <div>
      {deadPixel && <DeadPixelHost />}
      {stickyVideo && <StickyVideoExperienceHost />}
      {children}
    </div>
  );
}
```

## Configuration

Both components are controlled by experience flags:
- `deadPixel` - Enables/disables the dead pixel
- `stickyVideo` - Enables/disables the sticky video

These flags can be toggled through the settings UI to control the level of annoyance.

## Purpose

These components are intentionally designed to frustrate users as part of "the most annoying website" experience. They provide visual interference without blocking actual functionality.
