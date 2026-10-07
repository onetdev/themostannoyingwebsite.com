# separator

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/separator`

## Changed

- `packages/ui-lib/src/components/atoms/Separator.tsx` — swapped to the callable `Separator` primitive (no `.Root`). Dropped the `decorative` prop (no Base UI equivalent; Base UI's separator is always semantic). Kept the existing `data-[orientation=…]` classes, which still match Base UI's `data-orientation` attribute.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on this file): clean.

## Left alone

- `Field.tsx` (`FieldSeparator`) and all `Separator` call sites use only `className`, so they were untouched.
- Table/Card separators are unaffected.

## Behavior changes

- `decorative` is dropped. Any caller that relied on `decorative={false}` (purely visual rule, `role="none"`) would now get a semantic `role="separator"`; no caller in the repo passes it.

## Verify by hand

- Check horizontal separators (settings card, comment list) and any vertical separator; confirm 1px sizing and color.
- Screen reader: separators announce as separators (expected Base UI default).
