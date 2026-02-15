# Gift Module

Interactive gift pain points including DILF finder, surveys, adblocker detection, and surprise elements.

## Features

### DILF Finder
- **`DilfPage`** - Main DILF discovery page
- **`DilfFinder`** - Interactive DILF search interface
- **`DilfClickOverlay`** - Click interaction overlay with data-driven hotspots

### Surveys & Interactions
- **`FlaimSurvey`** - Phone survey component with question flow
- **Flaim Survey Questions** - Domain entity for survey question data

### Gift Components
- **`OneByOneGift`** - Sequential gift reveal component
- **`ContainerGiftFlaps`** - Animated gift container with opening flaps

### Adblocker Detection
- **`useAdblockerDetector`** - Hook to detect if user has adblocker enabled
- **`AdblockerSuspectBar`** - Warning bar displayed when adblocker suspected

## Usage

```typescript
// Use DILF page
import { DilfPage } from '@/modules/gift';

<DilfPage />

// Use Flaim survey
import { FlaimSurvey } from '@/modules/gift';

<FlaimSurvey className="w-full" />

// Detect adblocker
import { useAdblockerDetector, AdblockerSuspectBar } from '@/modules/gift';

function MyComponent() {
  useAdblockerDetector(); // Starts detection

  return (
    <div>
      <AdblockerSuspectBar /> {/* Shows when detected */}
      <YourContent />
    </div>
  );
}

// Use gift components
import { ContainerGiftFlaps, OneByOneGift } from '@/modules/gift';

<ContainerGiftFlaps />
<OneByOneGift />
```

## Routes

- `/dilf` - DILF finder page
- `/flaim-a-phone` - Phone survey page

## Configuration

Adblocker detection works by attempting to load a fake ad element and checking if it's blocked. The detection respects pain point flag settings.