# radio-group

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/radio-group` + `@base-ui/react/radio`

## Changed

- `packages/ui-lib/src/components/organisms/RadioGroup.tsx` — group is the callable `RadioGroup` primitive (`RadioGroupPrimitive.Props`); item is `Radio.Root` + `Radio.Indicator` from `@base-ui/react/radio` (`RadioPrimitive.Root.Props`). `disabled:` → `data-disabled:` (Base UI Root renders a `<span>`, so `:disabled` is dead). Classes otherwise unchanged.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on this file): clean.

## Left alone

- No app consumers of `RadioGroup` were found, so no call-site edits.

## Behavior changes

- `orientation`, `dir`, `loop` are dropped (Base UI handles both axes and wraps focus automatically).
- Item renders a `<span>` + hidden input rather than a `<button>`; disabled styling is data-driven.

## Verify by hand

- If a radio group is rendered anywhere, arrow-key navigation moves selection across both axes and wraps; Space selects; focus ring shows.
