# Gift Module

Interactive gift features and experiences for the application, including various surprise elements, surveys, and detection mechanisms.

## Overview

This module implements various gift-based interactions and features:

- **Adblocker detection** - Detects and responds to adblocker usage
- **DILF Finder** - Interactive DILF discovery experience with click overlays
- **Flaim Survey** - Survey functionality with domain-driven question entities
- **Container Gift Flaps** - Animated gift container interactions
- **One By One Gift** - Progressive gift reveal component

## Structure

The module follows clean architecture principles with the following layers:

### Domain Layer (`domain/`)

Core business entities and repository interfaces:

- **Entities**
  - `flaim-survey-question.ts` - Survey question domain entity

### Application Layer (`application/`)

Business logic, hooks, and use cases:

- **Hooks**
  - `useAdblockerDetector.tsx` - Hook for detecting adblocker presence

### Infrastructure Layer (`infrastructure/`)

Implementation details for data access and external services (currently empty, ready for repository implementations).

### Presentation Layer (`presentation/`)

UI components and pages:

- **Components**
  - `AdblockerSuspectBar.tsx` - Warning bar for suspected adblocker usage
  - `ContainerGiftFlaps.tsx` - Animated gift container with flaps
  - `DilfClickOverlay/` - Click interaction overlay for DILF finder
  - `DilfFinder.tsx` - DILF discovery interface component
  - `FlaimSurvey.tsx` - Survey presentation component
  - `OneByOneGift.tsx` - Sequential gift reveal component

- **Pages**
  - `DilfPage.tsx` - Main DILF feature page
