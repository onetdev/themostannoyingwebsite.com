# ADR 4: Use TailwindCSS for Styling

## Status
Accepted (Historical)

## Context
We need a styling solution that is fast, maintainable, and allows for rapid UI development while keeping the CSS bundle size small.

## Decision
We chose **TailwindCSS** (currently version 4) for styling throughout the project.

## Consequences
- **Pros**: Utility-first approach reduces the need for custom CSS files. Smaller production bundles due to purging unused styles. Consistent design system through configuration.
- **Cons**: Learning curve for utility class names. Can lead to long class strings in components if not managed properly.
