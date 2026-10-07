# button

2026-10-07 · hand transformation engine (legacy `new-york` style — no `base-<style>` registry pair) · migrated to `@base-ui/react/button`

## Changed

- `packages/ui-lib/src/components/atoms/Button.tsx` — replaced `Slot`/`asChild` with the real `ButtonPrimitive` from `@base-ui/react/button` (never a hand-rolled `useRender` wrapper). `ButtonProps` is now `ButtonPrimitive.Props & VariantProps<typeof buttonVariants>`. The `asChild` prop is gone; polymorphism is via Base UI's `render` (plus `nativeButton`).
- `apps/web/src/app/[locale]/(public)/_components/AppHeader/AppHeader.tsx` — icon link button migrated to `render={<Link … />} nativeButton={false}`.
- `apps/web/src/core/observability/react/ErrorFallback.tsx` — home link button migrated to `render`/`nativeButton={false}`.
- `apps/web/src/features/comments/components/CommentSection/CommentSection.tsx` — reply anchor migrated.
- `apps/web/src/features/funding/components/DonationPage/DonationPage.tsx` — both external-link buttons migrated.
- `apps/web/src/features/support/components/ContactForm.tsx` — mailto anchor button migrated (`disabled` now drives Base UI's aria-disabled for the non-native render target).
- `apps/web/src/features/achievements/components/ResetAchievements.tsx` — `DialogTrigger`/`DialogClose` now render `Button` (see `dialog`), which requires the Base UI button.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- Intentionally untouched non-Radix wrappers: `Sonner.tsx` (sonner), `Carousel.tsx`/`PeekCarousel.tsx` (embla), `Chart.tsx` (recharts).
- `Badge.tsx` has its own report (it also dropped `asChild`, but uses `useRender`, not the Button primitive).

## Behavior changes

- **Breaking:** the public `asChild` prop is removed. Call sites use `render`. When the rendered element is not a `<button>`, `nativeButton={false}` is required (set on all anchor/link call sites above).
- Disabled styling on anchor render targets still relies on the CSS `:disabled` pseudo-class and is therefore inert for `<a>` — this is pre-existing (Radix `Slot` behaved the same) and was not "fixed" here.

## Verify by hand

- Click a rendered-as-link button (header search icon, donation links, comment reply, contact send): navigation/mailto fires, focus ring shows, no console warning about `nativeButton`.
- Disabled contact send while the message is invalid: no navigation, anchor carries `aria-disabled`.
- Keyboard: Tab reaches each button; Enter/Space activate real buttons.
