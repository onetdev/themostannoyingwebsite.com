# sheet

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/dialog`

## Changed

- `packages/ui-lib/src/components/organisms/Sheet.tsx` — same Dialog primitive as `dialog`. `Overlay` → `Backdrop`, `Content` → `Popup` with `data-side={side}`. Slide-out keyframes replaced by transitions: per-side `data-ending-style`/`data-starting-style` translate-full plus opacity; durations preserved (`duration-500`, `duration-300` on close). `data-[state=open]:` on the close button → `data-open:`.
- `packages/ui-lib/src/components/organisms/Sheet.stories.tsx` — `SheetTrigger asChild` → `render`.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- `Dialog.tsx` has its own report. No app call sites use `Sheet` (stories only).

## Behavior changes

- `forceMount` → `keepMounted`; dismissal via `onOpenChange` reasons (unused here).
- Slide animations are CSS transitions driven by `data-starting-style`/`data-ending-style` and `data-side`, not tw-animate.

## Verify by hand

- Open the Sheet from each side (right/left/top/bottom): it slides in/out from the correct edge, overlay dims, Escape/outside-click close it, focus is trapped then returned.
