# Disruptions Feature

A core collection of intrusive glitches and browser-behavior-altering experiences designed to test the user's patience.

## Key Highlights

### Page Title Manipulation
- **Glitched Titles**: Randomly replaces parts of the page title with nonsensical characters or text that can cause slight vertical overflow.
- **Marquee Title**: Causes the page title to scroll horizontally across the browser tab.
- **Inactive State Glitch**: Alternates the page title between different messages when the browser tab is not focused, trying to lure the user back.

### Navigation and Interaction
- **Navigation History Clutter**: Custom hook `useNavigationHistoryClutter` that pushes duplicate navigation items to the browser history, making it difficult for users to use the "Back" button to leave the site.
- **Context Menu Disable**: Hook `useDisableContextMenu` intercepts right-click events and displays a frustrating alert instead of the standard menu.
- **Prevent Leaving**: Intercepts tab-close attempts and displays a persistent "Are you sure?" prompt.

### UI Glitches
- **Dead Pixel**: A single, interactive pixel on the screen that looks like hardware failure. Clicking it triggers an achievement.
- **Global Sticky Video**: A non-dismissible, autoplaying video player that follows the user throughout the site.
- **Screensaver**: A full-screen overlay that triggers after inactivity, featuring two variants:
  - **Maze**: A procedurally generated 90s-style maze.
  - **Bouncing Logo**: A DVD-style logo that bounces off screen edges.

## Important Note

Browser security and rate limits (especially for page title changes) might cause some of these features to behave inconsistently across different environments.

## Out of Scope

- **Actually Malicious Behavior**: All disruptions are cosmetic and easily cleared by closing the browser tab or reloading the page.
- **Persistent Malware**: No permanent changes are made to the user's system or browser settings.
