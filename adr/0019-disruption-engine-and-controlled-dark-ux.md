# ADR 19: Disruption Engine and Controlled Dark UX Architecture

## Status
Accepted

## Context
The core identity of "The Most Annoying Website" is to deliberately frustrate, confuse, and amuse users through anti-patterns and "Dark UX" designs (e.g., glitching page titles, unsolvable captchas, fake authentication facades, clipboard markers, navigation history spamming, right-click disabling, exit-intent traps, and idle screensavers).

However, without clear architectural governance, simulating hostile browser behaviors risks causing real damage:
- Memory leaks, browser lockups, or unresponsive tabs.
- Uncontrollable and cascading disruptions that make the site truly unvisitable or un-testable.
- Ethical hazards, such as creating permanent system modifications, tracking users maliciously, or creating genuine accessibility hazards without recourse.

## Decision
We established a **Controlled Dark UX Architecture** governed by the **Disruption Engine**:

1. **Declarative State & Central Control**:
   - All disruptions are toggled, measured, and configured via the centralized [`PainPreferencesStore`](/apps/web/src/stores/pain-preferences/pain-preferences.ts).
   - Disruptions are categorized in a public registry (`PUBLIC_PAIN_POINT_LIST`) and can be enabled, disabled, or modulated via an overall "pain level" slider.
2. **Top-Level Declarative Container**:
   - Disruptions are isolated and activated inside the [`ClientPainContainer`](/apps/web/src/app/bootstrap/ClientPainProvider.tsx).
   - Component glitches (`<PageTitleGlitch />`, `<CopyMarker />`) and behavioral hooks (`useNavigationHistoryClutter`, `useDisableContextMenu`, `usePreventLeaving`) check feature flags before executing.
3. **Ethical Boundaries**:
   - **Strictly Cosmetic & Non-Destructive**: No permanent changes to the user's browser, storage, or operating system are allowed.
   - **Fake Facades**: Authentication (`/user/login`, `/admin`), password reminders, and forms simulate failure locally in memory without sending bogus credentials to servers or managing real security sessions.
   - **User Override**: Users can disable individual or all disruptions at any time in `/settings`.

## Consequences
- **Pros**: Clear architectural separation between intentional chaos and application code; testable disruptions with isolated mocks; maintains ethical boundaries and browser safety; allows gamification through achievements.
- **Cons**: Requires continuous cross-browser testing as modern browser security updates and anti-spam heuristics periodically restrict tab manipulation (such as rapid `history.pushState` or dynamic `document.title` mutations).
