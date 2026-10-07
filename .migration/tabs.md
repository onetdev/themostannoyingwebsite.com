# tabs

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/tabs`

## Changed

- `packages/ui-lib/src/components/organisms/Tabs.tsx` — `Trigger` → `Tab`, `Content` → `Panel`. `data-[state=active]` → `data-active` throughout the cva/class strings; added `aria-disabled:` alongside `disabled:` on the tab. Root/List/Panel prop types updated; `orientation` still passed to Root.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on this file): clean.

## Left alone

- No app consumers of `Tabs` were found (no call sites to update).

## Behavior changes

- **Activation mode:** Radix defaulted to automatic activation; Base UI defaults to manual (selection follows focus only on Enter/Space). The base registry accepts this default and so does this wrapper — flagged, not patched. If automatic activation is desired, set `activateOnFocus` on `Tabs.List` (not added here).
- **Default tab:** Base UI activates the first tab by default (Radix had no default active tab).
- `data-state="active"` → `data-active`; panel hidden state is `data-hidden` (inverted polarity).

## Verify by hand

- Arrow-key through tabs: focus moves without switching (manual); Enter/Space activates. Confirm active styling and the line-variant underline.
