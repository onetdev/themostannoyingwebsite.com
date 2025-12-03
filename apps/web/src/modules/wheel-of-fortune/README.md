# Wheel of Fortune Module

A fake wheel of fortune modal that appears to offer exciting prizes but is designed to be one of the most annoying website experiences.

## Overview

This module implements a spinning wheel game that:
- Shows up as a promotional popup modal
- Presents enticing prizes with fake asterisks 
- Uses weighted randomization to almost always give "absolutely nothing"
- Includes confetti animation for fake celebration
- Cannot be easily dismissed (annoying UX by design)

## Components

### `WheelOfFortuneHost.tsx`
- Main container component that manages the modal visibility
- Renders a floating trigger button and the modal overlay
- Uses `DimmerOverlay` for backdrop and modal management

### `ModalContent.tsx` 
- Core modal content with the wheel functionality
- Manages wheel state (ready, spinning, completed)
- Handles prize selection using weighted randomization
- Shows confetti animation when "winning"

### `WheelAnimationWrapper.tsx`
- Wrapper component for wheel spinning animations
- Manages animation states and timing
- Controls the visual spinning effect

### `DynamicWheelSvg.tsx`
- Dynamically generates the wheel SVG based on prizes
- Creates colored segments for each prize option
- Handles the visual representation of the wheel

## Usage

The module is automatically initialized and appears as part of the website's annoying experiences. No manual integration required - it's designed to pop up and interrupt the user experience.

## Annoying Features

- **Weighted against the user**: 86.2% chance of winning "nothing"
- **Fake prizes**: Most "good" prizes have asterisks indicating they're not real
- **Persistent modal**: Difficult to dismiss without interaction
- **False celebration**: Confetti plays even for terrible prizes
- **Interrupts browsing**: Appears at inconvenient times

This module perfectly embodies the website's goal of gathering the most annoying features of modern websites in one place.
