# ADR 38: Three-State Theme Preference Selector with System Default

## Status
Accepted (supersedes the binary header toggle from [ADR 27](0027-theme-management-wrksz-themes.md))

## Context
Dark mode shipped as a binary switch: the header rendered `DarkModeToggle`, the
settings page rendered a "Dark mode" switch, and the document default was a
hardcoded `dark` color scheme. Both controls could only express `light` or
`dark`, so a visitor had no way to follow the operating system preference — the
only behavior most users expect from a modern theme control.

`@wrksz/themes` already models the selection and the resolved scheme separately:
`theme` is the stored preference and may be `"system"`, while `resolvedTheme` is
always `"light"` or `"dark"` after hydration. The library also listens to
`prefers-color-scheme` changes while the preference is `"system"` and reapplies
the scheme without a reload. None of that surface was reachable through a
boolean switch.

Two constraints shape the change:

- **The preference must be visible, not just resolved.** A selector built on
  `resolvedTheme` would silently collapse "system, currently dark" into "dark"
  and lose the third state.
- **`<html data-theme>` must hold a concrete scheme.** The design system's
  Tailwind variants (`dark:` / `light:`) and token files select on
  `[data-theme="light"]` / `[data-theme="dark"]`; writing `"system"` there would
  match neither. The server cannot know the OS preference, so the pre-paint
  bootstrap script remains the authority.

## Decision
Replace both binary controls with a three-state selector and make `system` the
default.

1.  **Preference model.** `AppThemeSchema` and the global `AppTheme` type become
    `'light' | 'dark' | 'system'`. `config.defaultColorScheme` becomes
    `'system'` and is passed unchanged to `ThemeProvider.defaultTheme` (the
    library resolves it via `matchMedia`).
2.  **SSR attribute.** `getInitialThemeAttribute()` (`apps/web/src/core/theme`)
    omits `data-theme` when the default is `system`, so the root tokens apply
    until the library's pre-paint script writes the resolved scheme. Explicit
    `light` / `dark` defaults still render their attribute server-side.
3.  **Design-system control.** `DarkModeToggle` is replaced by `ThemeSelect` in
    `packages/ui-lib`, composed from the existing Base UI `Select` primitives so
    it matches the language switcher and settings selects. It is fully
    prop-driven (`value`, `onValueChange`, `text`, optional `displayOnlyIcon`)
    and never imports the theme library. The header uses `displayOnlyIcon` and
    the settings page renders the full icon + label trigger. The trigger always
    shows a static theme glyph (`faCircleHalfStroke`), while each option keeps
    its own state icon (monitor / sun / moon); the popup enforces a minimum
    width and never wraps its labels on compact triggers.
4.  **App bridge.** `useThemeSwitcher(section)` wraps `useTheme`, exposes the raw
    `theme` (falling back to `"system"` before hydration so server and first
    client render match), maps the translated labels, and emits
    `ui.select-open` with `control: 'navigation:theme'` like the language
    switcher. Option picks are captured by annotating the popup
    (`data-track-control` / `data-track-section`), so `ui.select` carries the
    chosen `optionValue`. The trigger's accessible name includes the active
    preference because the header shows only the static glyph. Both the header
    adapter (`AppThemeSelect`) and `UserPreferences` consume the hook.
5.  **Translations.** `common.themeSwitch` gains `system` / `light` / `dark` /
    `label`; the settings label becomes "Theme". English is the bundled
    reference, so other locales fall back until the Content API is synced.

## Consequences
- **Pros**: Visitors can follow the OS preference, and an explicit choice still
  wins and persists under the existing `theme` storage key.
- **Pros**: The settings UI now shows the actual three-state preference instead
  of inferring it from the resolved scheme; the header exposes it through the
  menu and the trigger's accessible name.
- **Pros**: `ui-lib` remains theme-library agnostic; only the thin hook knows
  about `@wrksz/themes`.
- **Cons**: Without JavaScript the document falls back to the design system's
  root (dark) tokens, because the server cannot resolve `system`. Supporting
  no-JS system preference would require `prefers-color-scheme` token fallbacks.
- **Cons**: The header trigger deliberately does not expose the active
  preference until the menu opens; the settings trigger's label resolves after
  hydration.
- **Cons**: Replacing the component touches Storybook docs and the E2E locator
  contract; both are updated with the change.
