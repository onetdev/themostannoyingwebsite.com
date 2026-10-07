# avatar

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/avatar`

## Changed

- `packages/ui-lib/src/components/atoms/Avatar.tsx` — swapped `Avatar`/`Image`/`Fallback` to `@base-ui/react/avatar`; prop types now `AvatarPrimitive.Root.Props` / `.Image.Props` / `.Fallback.Props`. `AvatarBadge`/`AvatarGroup`/`AvatarGroupCount` are plain `span`/`div` and were left as-is.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on this file): clean.

## Left alone

- Consumers (`CommentItem.tsx`) use `Avatar` + `AvatarFallback` only; no `delayMs` call sites exist, so the `delayMs` → `delay` rename requires no consumer edits.
- `AvatarImage` is exported but currently unused.

## Behavior changes

- None functional. `Avatar.Image`'s `delayMs` prop is renamed to `delay` (no call sites).

## Verify by hand

- Render a comment avatar with a fallback; confirm sizing (`sm`/default/`lg`) and rounded clipping.
- If an image URL is supplied, confirm it swaps in and the fallback hides.
