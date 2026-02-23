# Browser Core Module

Core browser behavior modifications and annoying page title animations.

## Features

### Hooks
- **`useDisableContextMenu`** - Prevents right-click context menu
- **`useDisableNavigationPop`** - Blocks browser back/forward navigation

### Page Title Effects
Animated page title components for the browser tab:

- **`ArrayPagedTitle`** - Cycles through an array of title strings
- **`GlitchyTitle`** - Displays glitchy, corrupted text effect
- **`MarqueeTitle`** - Scrolling marquee animation in the title bar

### Utilities
- **`string_marquee`** - Utility function for creating marquee text with configurable width and gap

## Usage

```typescript
// Disable browser features
import { useDisableContextMenu, useDisableNavigationPop } from '@/features/browser-core';

function MyComponent() {
  useDisableContextMenu();
  useDisableNavigationPop();
  return <div>Right-click and back button disabled!</div>;
}

// Use page title animations
import { PageTitleHost } from '@/features/browser-core';

<PageTitleHost />

// Or individual title components
import { MarqueeTitle, GlitchyTitle } from '@/features/browser-core';

<MarqueeTitle enabled={true} text="Scrolling Title!" speedMs={1000} />
<GlitchyTitle enabled={true} text="Glitchy Text" />

// Use string marquee utility
import { string_marquee } from '@/features/browser-core';

const scrollingText = string_marquee("Hello World", timeIndex, {
  width: 30,
  gapLength: 5,
  gapChar: ' '
});
```

## Configuration

Title animations are controlled by pain point flags and can be toggled on/off through the settings UI.
