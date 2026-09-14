# ADR 14: Design System Architecture with Atomic Design, Radix UI, and Storybook

## Status
Accepted

## Context
As the user interface grew, embedding reusable UI components directly inside application feature folders led to code duplication, inconsistent styling, and coupled design logic. We needed:
- A clear hierarchy for composing UI elements (from simple buttons to complex interactive widgets).
- Accessible, unstyled primitives for complex interactive components (dialogs, tooltips, checkboxes).
- An isolated environment where developers and designers can build, test, and document components without starting the main Next.js web application.

## Decision
We separated the presentation system into a dedicated shared package, **`@maw/ui-lib`**, and an isolated Storybook workspace, **`apps/ui-docs`**:

1. **Atomic Design Hierarchy**: `@maw/ui-lib/src/components` organizes components into:
   - `atoms/`: Basic building blocks (Badges, Buttons, Loaders, Typography).
   - `molecules/`: Simple functional units (Search inputs, Tooltips, Dialog triggers).
   - `organisms/`: Complex composite UI (Footers, Navigation bars, Modals).
   - `ui/`: Raw shadcn-based primitives built on top of **Radix UI**.
2. **Styling & Variance**: Styled with TailwindCSS 4, using `class-variance-authority` (CVA) for variant management and `tailwind-merge` (`cn` utility) for conflict-free class overrides.
3. **Isolated Documentation**: `apps/ui-docs` runs Storybook 10 with TailwindCSS and theme switching, providing visual isolation and documentation for every reusable component.

## Consequences
- **Pros**: Strong reusability across apps; accessible foundations out of the box via Radix UI; fast component development and testing in Storybook without Next.js server overhead.
- **Cons**: Requires moving back and forth between packages when building new feature-specific UI that needs shared primitives; requires maintaining component stories in `apps/ui-docs`.
