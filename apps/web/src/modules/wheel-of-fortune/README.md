# Wheel of Fortune Module

Fake wheel of fortune modal that appears to offer prizes but is designed to be maximally annoying.

## Features

- **Fake Prize Wheel** - Animated wheel spinner with fake prize options
- **Modal Pain Point** - Full-screen modal takeover
- **Controlled by Pain Point Flags** - Can be toggled on/off

## Components

- **`WheelOfFortuneHost`** - Main component that manages the wheel modal display

## Usage

```typescript
import { WheelOfFortuneHost } from '@/modules/wheel-of-fortune';

function Layout() {
  const wheelOfFortune = usePainPreferencesStore(
    state => state.wheelOfFortune
  );

  return (
    <div>
      {wheelOfFortune && <WheelOfFortuneHost />}
      {children}
    </div>
  );
}
```

## Configuration

The wheel is controlled by the `wheelOfFortune` pain point flag. When enabled, it appears as a modal overlay offering fake prizes and promotions.

## Purpose

Part of the annoying website pain points, the wheel of fortune creates an interruption similar to aggressive marketing popups, but with an intentionally frustrating twist.
