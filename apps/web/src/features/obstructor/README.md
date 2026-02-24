# Obstructors Feature

Obstructors are visual elements designed to block content and force the user to interact with them or wait them out.

## Key Components
- **Bouncing Logo Screensaver**: A fullscreen overlay featuring a bouncing logo, mimicking old DVD players but serving only to block the view.
- **Maze Screensaver**: A high-effort distraction that uses WebGL shaders and textures to render a maze that obstructs the entire page.
- **Global Sticky Video**: A video element that likely follows the user or stays pinned, covering important content.
- **Dead Pixel**: Simulates dead pixels on the screen to annoy the user and make them think their hardware is failing.

## Technical Implementation
Uses Framer Motion for animations and custom GLSL shaders for the Maze screensaver to maximize "visual annoyance" and resource usage.
