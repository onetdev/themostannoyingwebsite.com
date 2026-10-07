# accordion

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/accordion`

## Changed

- `packages/ui-lib/src/components/organisms/Accordion.tsx` — `Content` → `Panel`. Trigger disabled hooks `disabled:` → `aria-disabled:`; open-state selector `[&[data-state=open]>svg]` → `[&[data-panel-open]>svg]`. Panel keeps `overflow-hidden text-sm`; the height animation moved to the inner div: `h-(--accordion-panel-height) … data-ending-style:h-0 data-starting-style:h-0` with `transition-[height]` (was `--radix-accordion-content-height` keyframes).
- `packages/ui-lib/src/components/organisms/Accordion.stories.tsx` — removed `type="single" collapsible` (Base UI single mode is always collapsible; `multiple` is the opt-in).
- `apps/web/src/features/funding/components/DonationPage/DonationFaq.tsx` — removed `type="single" collapsible`.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- `FAQ_ITEMS` and all item values are unchanged; the uncontrolled single-open default matches the previous `type="single" collapsible`.
- `Icon` chevron rotation is driven by the new `data-panel-open` hook.

## Behavior changes

- `type`/`collapsible`/`orientation` props are dropped. Single mode is always collapsible (Base UI); no consumer relied on non-collapsible single mode.
- Height animation is now a CSS transition against `--accordion-panel-height` rather than tw-animate keyframes.

## Verify by hand

- Open/close the donation FAQ items: chevron rotates, panel animates smoothly, only one stays open.
- Keyboard: Tab to a trigger, Enter/Space toggles; disabled trigger (if any) still focusable-ish per `aria-disabled`.
