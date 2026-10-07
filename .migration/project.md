# project — Radix UI → Base UI migration

2026-10-07 · whole-project · strategy: hand transformation engine (legacy `new-york` style; no `base-<style>` registry pair exists, so wrappers were rewired in place with their original Tailwind classes preserved) · verdict: complete

## Dependency swap

- **Added** `@base-ui/react@^1.8.0` to `packages/ui-lib/package.json` (resolved 1.8.0).
- **Removed** `radix-ui@^1.6.7` and `@radix-ui/react-checkbox@^1.3.11` from `packages/ui-lib/package.json` after the last wrapper was migrated.
- `pnpm-lock.yaml` regenerated; it now contains zero `radix` entries and `require.resolve("radix-ui")` / `require.resolve("@radix-ui/react-checkbox")` both fail from `packages/ui-lib`. (Extraneous directories may linger in the pnpm virtual store; they are unreferenced.)
- No other workspace depends on Radix.

## Wrappers migrated (15)

Atoms: `button`, `badge`, `checkbox`, `separator`, `avatar`, `progress`, `label`, `tooltip`, `select`.
Organisms: `accordion`, `dialog`, `sheet`, `radio-group`, `tabs`, `navigation-menu`.

Each has a per-component report in `.migration/<component>.md`.

### No Base UI counterpart (hand replacements)

- `Label` → native `<label>` (with a scoped biome-ignore for the generic-wrapper case).
- `AspectRatio`, `VisuallyHidden`, `Direction` are not present in this repo, so nothing to do.

## Intentionally untouched (not Radix)

- `command` (cmdk), `drawer` (vaul), `sonner` (Sonner toaster), `carousel`/`peek-carousel` (embla), `chart` (recharts), `input-otp`, `calendar` (react-day-picker). None exist in this repo except `Sonner.tsx`, `Carousel.tsx`, `PeekCarousel.tsx`, `Chart.tsx`, which were left as-is.

## App-code sweep

18 files in `apps/web` updated (no `ui-docs` call sites needed edits):

- `asChild` → `render` (+ `nativeButton={false}` for non-button render targets): `AppHeader`, `ErrorFallback`, `CommentSection`, `DonationPage`, `ContactForm`, `ResetAchievements`, `AppNavigationDesktop`, `PainLevelSelector`, `HistoryOverlay`, `SettingsField`, plus the `ui-lib` stories for Tooltip/Dialog/Sheet.
- `Accordion type="single" collapsible` → removed (`DonationFaq`).
- `NavigationMenu viewport={false}` → removed; `NavigationMenuLink` now uses the `active` prop (`AppNavigationDesktop`).
- Select label rendering: `items` added so the trigger shows labels instead of raw values (`CountryField`, `GenderField`, `PhoneNumberField`, `DateOfBirthField`, `VisualChaos` ×2, `UserPreferences`). `SelectValue` in `AppLanguageSwitcher` uses a custom children node and needed no `items`.
- `onValueChange` widening (`string | null`): `useLanguageSwitcher.onLanguageChange` widened to accept `AppLocale | null`; `DateOfBirthField` handlers widened; `VisualChaos` guards `null` before `parseInt`.
- `Checkbox` checked-highlight selector in `Field.tsx`: `has-data-[state=checked]:` → `has-data-checked:`.

## Verification

- `pnpm check-types` (turbo, 8 packages): **pass**.
- `biome check` on every changed file: **clean**.
- `pnpm build` (turbo, web + ui-docs + ui-lib): **pass** (`3 successful, 3 total`, ~1m34s).

## Flagged behavior deltas (not patched)

- Tabs now use Base UI's manual activation default (Radix was automatic) and activate the first tab by default.
- NavigationMenu hover delay default is 50ms (was 200ms); `viewport` prop is gone.
- Enter/exit animations were restated as CSS transitions (`data-starting-style` / `data-ending-style`) instead of tw-animate keyframes.
- `asChild` is removed from `Button`/`Badge` and every trigger/close part.
- `SelectValue` renders raw values unless `items` is supplied.
- `decorative` (Separator), `delayDuration` (Tooltip), Accordion `type`/`collapsible`, and `dir` on menu roots are dropped.

## Wrappers remaining on Radix

0 — the ui directory (`packages/ui-lib/src/components`) contains no Radix imports.
