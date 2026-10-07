# progress

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/progress`

## Changed

- `packages/ui-lib/src/components/atoms/Progress.tsx` — restructured to `Root > Track > Indicator`. Removed the manual `style={{ transform: translateX(-(100 - value)%) }}`; Base UI computes the indicator width itself. Root keeps the original `bg-primary/20 relative h-2 w-full overflow-hidden rounded-full` classes; Track is `relative flex h-full w-full items-center overflow-x-hidden`; Indicator is `bg-primary h-full transition-all`. `value` is passed through to Root.

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on this file): clean.

## Left alone

- Consumers `AchievementToast`, `AchievementCard`, `CaptchaDialog` pass `value={number}` and a `className`; no edits needed.
- `PasswordStrengthBar` is a bespoke component (no Progress primitive) and was not touched.

## Behavior changes

- `getValueLabel` → `getAriaValueText` (unused here). Indicator width is now primitive-driven instead of a CSS transform.

## Verify by hand

- Watch a progress bar animate (achievement toast, captcha dialog); confirm 0% renders empty and 100% full with no overflow.
- Indeterminate (`value` omitted) should not throw.
