# checkbox

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/checkbox`

## Changed

- `packages/ui-lib/src/components/atoms/Checkbox.tsx` — swapped `@radix-ui/react-checkbox` for `@base-ui/react/checkbox`. Class hooks rewritten: `data-[state=checked]:` → `data-checked:`; `disabled:` → `data-disabled:` (Base UI Root renders a `<span>`, so the `:disabled` pseudo-class is dead code; per `class-mapping.md` we did not copy the registry's dead `disabled:` classes). `CheckboxProps` now extends `CheckboxPrimitive.Root.Props`.
- `packages/ui-lib/src/components/organisms/Field.tsx:123` — the FieldLabel checked-highlight selector `has-data-[state=checked]:` → `has-data-checked:` so it still matches the Base UI checkbox data attribute; stale "Radix relies on role=group" comment updated.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- Consumers (`VisualChaos.tsx`, `UserPreferences.tsx`, etc.) pass `checked={boolean}` and `onCheckedChange`; the callback now yields a strict `boolean`, which their handlers already accept — no edits needed.
- `Field.tsx` is otherwise a hand-rolled component, not a Radix Form; only the checkbox data-attribute selector changed.

## Behavior changes

- `onCheckedChange` value type narrows from `boolean | "indeterminate"` to `boolean` (indeterminate is now a separate `indeterminate` prop — unused here).
- The hidden input is always rendered by Base UI; form submission behavior is unchanged for these usages.

## Verify by hand

- Toggle each settings checkbox (screensaver, dead pixel, sticky video, ads, dark mode, adult filter) and confirm checked styling + the FieldLabel highlight updates.
- Tab to a checkbox and press Space; confirm toggle and focus ring.
