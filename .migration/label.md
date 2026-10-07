# label

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to a native `<label>`

## Changed

- `packages/ui-lib/src/components/atoms/Label.tsx` — there is no Base UI Label primitive, so the wrapper now renders a native `<label>` with the identical class list (`ComponentProps<"label">`). Added a scoped `// biome-ignore lint/a11y/noLabelWithoutControl` because this is a generic wrapper: consumers either pass `htmlFor` or nest the control, so the rule cannot be satisfied at the definition site.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on this file): clean.

## Left alone

- `FieldLabel` composes `Label`; it continues to render a label and pass `htmlFor` where needed.
- `FieldTitle` renders a `div` (unchanged).

## Behavior changes

- Loses Radix's double-click text-selection suppression; the class list already includes `select-none`, so this is preserved.

## Verify by hand

- Confirm FieldLabels still associate with their inputs (clicking the label focuses the control) in the auth/support forms.
- Confirm label styling (`text-sm font-medium`) is unchanged.
