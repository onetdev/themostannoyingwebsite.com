# select

2026-10-07 · hand transformation engine (legacy `new-york` style) · migrated to `@base-ui/react/select`

## Changed

- `packages/ui-lib/src/components/atoms/Select.tsx` — `Select` is now the bare `SelectPrimitive.Root` re-export (sidesteps the generic `Root.Props`). `Content` split into `Portal > Positioner > Popup`; positioning props (`side`/`sideOffset`/`align`/`alignOffset`/`alignItemWithTrigger`) are destructured and forwarded to the Positioner. Parts renamed: `Viewport` → `List`, `Label` → `GroupLabel`, `ScrollUp/DownButton` → `ScrollUp/DownArrow`. `Icon` uses `render` instead of `asChild`. Item anatomy is `ItemText` first, then `ItemIndicator render={<span …/>}`. Class rewrites: `max-h-(--available-height)`, `w-(--anchor-width)`, `origin-(--transform-origin)`; `position="popper|item-aligned"` → `alignItemWithTrigger` boolean (default `true`); `focus:` item styling → `data-highlighted:`.
- `apps/web/src/features/auth/components/_fields/CountryField.tsx` — added `items={countryOptions}` (Base UI renders raw values otherwise).
- `apps/web/src/features/auth/components/_fields/GenderField.tsx` — added `items={genderOptions}`.
- `apps/web/src/features/auth/components/_fields/PhoneNumberField.tsx` — added `items={phoneCountryOptions}`.
- `apps/web/src/features/auth/components/_fields/DateOfBirthField.tsx` — added `items={dateOfBirthMonth}` for the month (value ≠ label); widened the three change handlers to `string | null`.
- `apps/web/src/features/user/components/SettingsPage/UserPreferences.tsx` — added a language `items` array for the trigger label.
- `apps/web/src/features/user/components/SettingsPage/PainPreferences/VisualChaos.tsx` — added `items` for the variant and timeout selects; guarded the `null` value before `parseInt`.
- `apps/web/src/features/user/.../AppLanguageSwitcher.tsx` (and `apps/web/src/hooks/useLanguageSwitcher.ts`) — `onLanguageChange` widened to accept `AppLocale | null` (Base UI passes `null` when nothing is selected).

Leftover scan (`grep -n "radix-ui\|@radix-ui"` on these files): clean.

## Left alone

- `AppLanguageSwitcher` keeps its custom `SelectValue` node (flag + label); Base UI renders a `children` node verbatim, so no `items` were needed there.

## Behavior changes

- **`SelectValue` now renders the raw value unless `items` is supplied** — each consumer above was given `items`, otherwise the trigger would show codes ("en", "US") instead of labels.
- `onValueChange` widens to `(value, eventDetails)` and can pass `null`; handlers were widened/guarded.
- `position` prop dropped; `alignItemWithTrigger` exposed instead. The popper translate hacks were replaced by native positioning.
- Default `sideOffset` kept at `0`.

## Verify by hand

- Open the language switcher, country, gender, phone country-code, date-of-birth month, and screensaver selects: the trigger shows the human label (not the raw code) after selecting, and the checked item shows the indicator.
- Keyboard: typeahead + arrow navigation work; Escape/outside click closes.
