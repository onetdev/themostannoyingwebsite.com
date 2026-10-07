# navigation-menu

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/navigation-menu`

## Changed

- `packages/ui-lib/src/components/organisms/NavigationMenu.tsx` — heavily restructured. The Radix `Viewport` child is replaced by a `NavigationMenuPositioner` (`Portal > Positioner > Popup > Viewport`); the Root forwards `align` to it and no longer takes a `viewport` prop. `Indicator` → `Icon` (dropped; the base registry exports `NavigationMenuIndicator` over `Icon`, but no consumer used it, so it was removed). Trigger open hooks `data-[state=open]` → `data-popup-open`. Content motion classes (`data-[motion^=from-]`) replaced with `data-starting-style`/`data-ending-style` transitions; obsolete `group-data-[viewport=false]` classes removed. Link active hooks `data-[active=true]:` → `data-active:`. Popup styling moved from the old Viewport to the new Popup with `--popup-height/width` / `--positioner-*` / `--available-width` vars.
- `apps/web/src/app/[locale]/(public)/_components/AppHeader/AppNavigationDesktop.tsx` — removed `viewport={false}`; `NavigationMenuLink asChild` → `render={<Link … />}` with `active={active}` instead of manual `data-active`/`aria-current` (Base UI Link derives both).

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- `NavigationMenuLink` is used as a plain link in the app header (no triggers/content); the always-rendered positioner renders nothing while closed.
- `dir` is still passed; Base UI reads direction from the DOM attribute (the layouts set it on `<html>`), so this is redundant but harmless.

## Behavior changes

- `viewport` boolean prop dropped; content is always positioned via the shared Positioner/Viewport.
- Hover delay: Radix default 200ms → Base UI default 50ms (flagged; unchanged from the primitive default, not overridden).
- `NavigationMenuViewport`/`NavigationMenuIndicator` exports removed (unused); `NavigationMenuPositioner` added.
- `NavigationMenuLink.active` now drives `data-active` + `aria-current` internally.

## Verify by hand

- Desktop header nav renders both lists, links are clickable, `data-active` bold styling applies to the current route, RTL layout is correct.
- Storybook: trigger opens a positioned popup with the content, hover/escape/outside-click behavior.
