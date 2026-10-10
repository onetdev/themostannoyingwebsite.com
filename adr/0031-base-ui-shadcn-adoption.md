# ADR 31: Base UI shadcn Adoption and Behavior-Preserving Migration

## Status
Accepted

Amends the primitive-library and folder details of
[ADR 14](0014-design-system-atomic-radix-storybook.md); the atomic-design decision
there still stands.

## Context
`@maw/ui-lib` is the design system and the only place shadcn/ui is installed. Its
components were migrated from Radix to **Base UI** (`@base-ui/react`), but the shadcn
CLI configuration was left behind:

- `packages/ui-lib/components.json` still declared the legacy `new-york` style and no
  base, so the CLI resolved every registry item to the **Radix** `new-york-v4` build
  and would have re-introduced `radix-ui` on the next `add`.
- The registry is now base-aware (`radix-*`, `base-*`, `aria-*` styles), and the
  `style` field is what selects the base. There is no separate `base` property.

At the same time, the web app carries a growing amount of hand-rolled UI that
duplicates primitives shadcn already ships (the support chat bubble is the clearest
example), and the design system is missing several primitives the app needs
(`Switch`, `Collapsible`, `Empty`, `Slider`, `ToggleGroup`, `ScrollArea`, `Spinner`,
and the chat family `Bubble`/`Message`/`MessageScroller`).

Adopting shadcn components is not purely additive for this project: several
interactions are deliberately annoying (an intentional janky paywall reveal, an
advancing reason picker, animated chat affordances). A blind swap would silently
erase those behaviors.

## Decision

1.  **The design system stays the single install point.** All shadcn registry
    additions are made in `packages/ui-lib` and re-exported from `@maw/ui-lib`; feature
    code never imports registry files directly.

2.  **Target the `base-vega` style.** `components.json` uses `"style": "base-vega"`
    (the Base UI "New York" look), so additions match the existing Base UI library and
    never pull Radix. New registry items are always resolved base-first.

3.  **Registry items are post-processed on add.** The CLI does not understand this
    project's conventions, so every added file is normalized before committing:
    - rewrite `import { cn } from "cn"` to the package's `utils` alias;
    - replace `IconPlaceholder` / `lucide-react` icons with the FontAwesome
      `Icon` wrapper from `@/components/atoms`;
    - rewrite `@/registry/...` imports to relative package paths;
    - move any hardcoded user-facing strings (e.g. `sr-only` labels) into `next-intl`.

4.  **Adopt incrementally, by phase, without forking.** Hand-rolled UI is replaced with
    the shadcn component, composed rather than copied. New primitives get Storybook
    stories in `apps/ui-docs` like the rest of the library.

5.  **Preserve intentionally annoying behavior, but reintroduce it explicitly.** The
    project's whole point is to be annoying, so deliberate friction is a feature.
    When a swap changes behavior, the lost behavior is recorded in
    [`docs/shadcn-adoption-log.md`](../docs/shadcn-adoption-log.md) and, if intentional,
    re-added *on top of* the shadcn component (an animation wrapper, a controlled
    handler) rather than by forking the component.

6.  **`@shadcn/react` is the source of headless chat primitives.** The
    `message-scroller` registry item depends on the `@shadcn/react` package; it is
    added when the chat migration lands.

## Consequences
- **Pros**: One consistent Base UI foundation; no risk of re-introducing Radix or
  duplicating primitive libraries.
- **Pros**: Far less bespoke UI to maintain — messages, overlays, toggles, sliders and
  empty states come from a maintained source and stay themable via semantic tokens.
- **Pros**: The behavior log makes every intentional regression an explicit,
  reviewable decision instead of an accidental omission.
- **Cons**: Registry items require manual normalization on add (icons, `cn` alias,
  imports, i18n); there is no fully automated `shadcn add`.
- **Cons**: Re-introducing intentional behavior adds a thin wrapper layer over some
  primitives.
- **Cons**: Each adoption phase touches user-visible surfaces and needs Storybook and
  Playwright coverage to prove nothing was lost.
