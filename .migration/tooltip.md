# tooltip

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/tooltip`

## Changed

- `packages/ui-lib/src/components/atoms/Tooltip.tsx` — `Content` rewritten to `Portal > Positioner > Popup`; `side`/`sideOffset`/`align`/`alignOffset` are destructured and forwarded to the Positioner (the FORWARD rule). Provider `delayDuration` → `delay`. CSS var `--radix-tooltip-content-transform-origin` → `--transform-origin`. `data-[state=…]` animation keyframes restated as `data-starting-style`/`data-ending-style` opacity+scale transitions. Arrow kept as the rotated-square style with per-side offsets inside the Popup.
- `packages/ui-lib/src/components/atoms/Tooltip.stories.tsx` — `TooltipTrigger asChild` → `render`.
- `apps/web/src/app/[locale]/(public)/_components/AppHeader/PainLevelSelector/PainLevelSelector.tsx` — trigger migrated to `render={<button … />}` (content moves to children).
- `apps/web/src/features/support/components/ChatBubble/HistoryOverlay.tsx` — trigger migrated to `render={<span … />}`.
- `apps/web/src/features/user/components/SettingsPage/SettingsField.tsx` — trigger migrated to `render={<Icon … />}`.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- The global `TooltipProvider` in `apps/web/src/bootstrap/ClientRootProviderContainer.tsx` needed no edit (no `delayDuration`/`skipDelayDuration` passed).
- `AppLanguageSwitcher`/`Select` tooltips are unrelated.

## Behavior changes

- Enter/exit animation moved from tw-animate keyframes to CSS transitions (`data-starting-style`/`data-ending-style`); the per-side slide classes were dropped (they were inert without `animate-in`).
- `delayDuration` → `delay`. Provider default here remains `0` (unchanged from the previous default), so tooltips stay instant.
- Default `sideOffset` kept at `0` (Base UI default) to preserve the existing look rather than adopting the registry's `4`.

## Verify by hand

- Hover the pain-level info icon, the `*` disclaimer in the chat HUD, and the settings info icon: tooltip appears instantly with no offset jump, arrow points at the trigger on all four sides.
- Non-button triggers (span/icon) still receive hover/focus; no `nativeButton` warning.
