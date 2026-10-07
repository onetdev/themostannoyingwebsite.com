# dialog

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/dialog`

## Changed

- `packages/ui-lib/src/components/organisms/Dialog.tsx` — `Overlay` → `Backdrop`, `Content` → `Popup` (centered modal: no Positioner). Animations restated as transitions (`data-starting-style`/`data-ending-style` opacity+scale; overlay opacity). Close-button `data-[state=open]:` → `data-open:`. `DialogFooter`'s `asChild` → `render={<Button … />}` with the label moved to children. Prop types now `DialogPrimitive.Root/Trigger/Portal/Close/Backdrop/Popup/Title/Description.Props`.
- `packages/ui-lib/src/components/organisms/Dialog.stories.tsx` — `DialogTrigger asChild` → `render`.
- `apps/web/src/features/achievements/components/ResetAchievements.tsx` — `DialogTrigger`/`DialogClose` migrated to `render={<Button … />}` (requires the migrated Button).

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- `ResetAchievements` keeps its controlled `open`/`onOpenChange={setIsOpen}`; the new `onOpenChange(open, eventDetails)` signature is backward-compatible with a single-arg setter.
- `Sheet.tsx` has its own report (it reuses the Dialog primitive).

## Behavior changes

- `forceMount` → `keepMounted` (Portal); outside/escape dismissal handlers consolidate into `onOpenChange` reasons (none used here).
- Animations are CSS transitions rather than tw-animate keyframes.
- Focus return / initial focus defaults follow Base UI (first tabbable; return to trigger on close).

## Verify by hand

- Open the reset-achievements dialog: overlay fades, panel fades/scales, Escape and outside-click close it, focus returns to the trigger.
- Close button and cancel/confirm buttons all work; confirm runs the reset action.
