# badge

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `useRender` + `mergeProps`

## Changed

- `packages/ui-lib/src/components/atoms/Badge.tsx` — replaced `Slot`/`asChild` with Base UI's `useRender` + `mergeProps` (`useRender.ComponentProps<"span">`). Kept every existing class and the `data-slot="badge"` / `data-variant` attributes (moved into the `mergeProps` literal, cast to `ComponentProps<"span">` per the `data-*` excess-property pitfall). Polymorphism is now `render` instead of `asChild`.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on this file): clean.

## Left alone

- No consumers pass `asChild` to `Badge`, so no call-site edits were needed.

## Behavior changes

- `asChild` is replaced by `render` (breaking for any future/undetected external consumer). No runtime behavior change otherwise.

## Verify by hand

- Render a badge as a link (`render={<a />}`) and a plain badge; confirm classes, hover variants, and `data-variant` are intact.
- Confirm `mergeProps` does not warn about `className`/`data-*` merge ordering.
