# Wheel of Fortune Module

Fake wheel of fortune modal that appears to offer prizes but is designed to be maximally annoying.

## Features

- **Fake Prize Wheel** - Animated wheel spinner with fake prize options
- **Modal Experience** - Full-screen modal takeover
- **Controlled by Experience Flags** - Can be toggled on/off

## Components

- **`WheelOfFortuneHost`** - Main component that manages the wheel modal display

## Usage

```typescript
import { WheelOfFortuneHost } from '@/modules/wheel-of-fortune';

function Layout() {
  const wheelOfFortune = useExperienceFlagsStore(
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

The wheel is controlled by the `wheelOfFortune` experience flag. When enabled, it appears as a modal overlay offering fake prizes and promotions.

## Purpose

Part of the annoying website experience, the wheel of fortune creates an interruption similar to aggressive marketing popups, but with an intentionally frustrating twist.
