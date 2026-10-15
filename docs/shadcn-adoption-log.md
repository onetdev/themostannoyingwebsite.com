# shadcn Adoption Log

This document tracks the incremental adoption of shadcn/ui components in
`@maw/ui-lib` (see
[ADR 31](../adr/0031-base-ui-shadcn-adoption.md)) and, crucially, the behavior that
each replacement drops so we can deliberately reintroduce it.

> **Why a log?** This site is *intentionally* annoying. Friction, jank and animation
> are features, not bugs. Replacing hand-rolled UI with shadcn must not silently
> delete them. Every dropped behavior lands here, and any that is intentional is
> re-added on top of the shadcn component.

## Registry conventions

When adding a component to `packages/ui-lib`:

1.  It is already configured for the **`base-vega`** style (Base UI). Verify with
    `npx shadcn@latest info -c packages/ui-lib` → `links.ui` must be
    `.../bases/base/ui/...`.
2.  Add it, then normalize the generated file:
    - `import { cn } from "cn"` → the package `utils` alias (e.g. `../../utils`);
    - `IconPlaceholder` / `lucide-react` → the FontAwesome `Icon` wrapper
      (`../atoms`);
    - `@/registry/...` imports → relative package paths;
    - hardcoded strings (e.g. `sr-only` labels) → `next-intl`.
3.  Export it from the matching `components/{atoms,molecules,organisms}/index.ts`.
4.  Add a Storybook story under `apps/ui-docs` if it is a reusable primitive.
5.  Never `add` a name that already exists in `packages/ui-lib` — it would overwrite
    a hand-tuned component.
6.  **The shadcn Tailwind utility layer is imported, not vendored.** `shimmer`,
    `scroll-fade-*`, `no-scrollbar` and the `data-*` variants ship in the `shadcn`
    package's `tailwind.css`, which `src/styles/global.css` imports directly so
    `@maw/ui-lib/global.css` stays the single entry point. Do not copy them into
    `src/styles/base/` — a local copy silently diverges from upstream (the removed
    `base/shimmer.css` was exactly that, and the hand-port had already dropped
    `scroll-fade`, leaving `MessageScroller`'s `scroll-fade-b` a no-op).

## Behavior-loss register

Status legend: ⬜ pending · 🟡 reintroduced as a wrapper · 🟢 preserved (no behavior lost)
· ✅ intentionally dropped · ⛔ regression to fix.

| Ref | Area | shadcn component | Behavior at risk | Intentional? | Reintroduction plan | Status |
| --- | ---- | ---------------- | ---------------- | ------------ | ------------------- | ------ |
| BEH-01 | Chat trigger (`support/…/ChatBubble/ChatBubbleTrigger`) | `Button` + `Badge` | Unread-counter shake animation (framer-motion) | Yes | Trigger kept as-is; shake preserved | 🟢 |
| BEH-02 | Chat panel (`support/…/ChatBubble/ChatBubble`) | `MessageScroller` | Spring open/close transition (`AnimatePresence`) | Yes | Panel wrapper kept; animation preserved | 🟢 |
| BEH-03 | Chat history | `MessageScroller` | Force scroll-to-bottom whenever the panel opens | Yes | `defaultScrollPosition="end"` + `autoScroll` | 🟢 |
| BEH-04 | Chat messages | `Message` / `Bubble` / `Marker` | Timestamp shown only when owner changes or gap > 5 min | Yes | Grouping kept for bot messages; user messages now show the demo's "Delivered" receipt | 🟡 |
| BEH-05 | Chat history | `Marker` | "Agent is typing" indicator shown until the next user message | Yes | `showTyping` kept, now rendered via `Marker` | 🟢 |
| BEH-06 | Chat trigger | — | Favicon unread badge (`useFaviconBadge`) | Yes | Component-agnostic, kept as-is | 🟢 |
| BEH-07 | Rating dialog (`support/RatingDialog`) | `ToggleGroup` | Buttons 1–3 disabled, forced choice ≥ 4 | Yes | Kept `disabled` on low items | 🟢 |
| BEH-08 | Rating dialog | `ToggleGroup` | Selected item `scale-110` + ring | Yes | Kept via `aria-pressed:*` classes | 🟢 |
| BEH-09 | Billing cycle (`PlansPage/BillingCycleSelector`) | `ToggleGroup` | Ghost/default pill inside a muted track | Maybe | `ToggleGroup` in a muted track; selected uses `aria-pressed` (`bg-muted`) | 🟡 |
| BEH-10 | Comment replies (`comments/CommentItem`) | `Collapsible` | Replies render **instantly** (no height animation) | No | `Collapsible` without transition classes stays instant | 🟢 |
| BEH-11 | Paywall reveal (`content/PartitionalLockedContent`) | `Collapsible` | Deliberately janky incremental reveal | Yes | Keep the custom reveal; do not smooth it | ⬜ |
| BEH-12 | Cancellation reasons (`CancellationPage/steps/ReasonsStep`) | `RadioGroup` + `Field` | Clicking a reason selects **and** advances the step | Yes | Keep the click-through handler | ⬜ |
| BEH-13 | Survey bar (`FlaimSurveyPage/ProgressBar`) | `Progress` | Time-driven auto-shrink (not value-driven) | Yes | Keep the animation-driven bar if `Progress` cannot express it | ⬜ |
| BEH-14 | Urgency countdown (`PlansPage/UrgencyCountdown`) | `Badge` | `animate-pulse` while active | Yes | Kept the pulse class on `Badge` | 🟢 |
| BEH-15 | Adblocker bar (`marketing/AdblockerSuspectBar`) | `Alert` | Floating glass card, `FadeIn` slide-in | Yes | Custom floating shell kept; `Alert` still does not express it | ⬜ |
| BEH-16 | Beggar banner (`funding/BeggarBanner`) | `Alert` / `Button` | Sticky positioning + raw close button | Yes | Sticky kept; close is now `Button` | 🟢 |
| BEH-17 | Cookie consent (`app/…/CookieConsent`) | `Alert` / `Button` | Always-on sticky banner, no dismiss control | Yes | Kept the grant-flag behavior; OK is now `Button` | 🟢 |
| BEH-18 | Pain slider (`AppHeader/…/PainLevelSelector`) | `Slider` | Custom `SliderRail` gradient + firefly particles + clamp labels | Yes | Keep rail/particles as an overlay layer | ⬜ |
| BEH-19 | Debug store (`monitoring/…/StoreInspector`) | `Textarea` | `resize-none`, mono font, fixed min height | No | Re-applied via `className` | 🟢 |
| BEH-20 | Context menu (`disruptions/useDisableContextMenu`) | `AlertDialog` or `toast` | Rude native `alert()` on right-click | Yes | Decide: keep native alert or restyle | ⬜ |
| BEH-21 | Crypto donation (`funding/DonationPage/CryptoDonationButton`) | `Popover` | Permanent wallet QR cards replaced by on-demand popovers | Yes | Trigger buttons; QR, network and copy action live inside the popover | 🟢 |

## Phase 1 review notes

Adopted existing ui-lib primitives: `Textarea` (debug store), `Separator`
(achievements reset, article comments), `Badge` (urgency countdown), `Card` (spam
sample), `Button` (cookie consent, beggar banner close).

The audit also proposed some swaps that were **reviewed and deliberately not
applied**, to avoid degrading intentional design:

| Item | Audit suggestion | Why kept custom |
| ---- | ---------------- | --------------- |
| `AdblockerSuspectBar` | `Alert` | Full-bleed sticky error bar; `Alert`'s card/compound-grid layout does not express it. Revisit if a dedicated `Banner` primitive lands. |
| `BeggarBanner` | `Alert` | Same full-bleed sticky banner; only the close control was adopted as `Button`. |
| `UpsellStep` promo box | `Alert` | Intentional loud, dotted-border promo; `role="alert"` is semantically wrong for static copy and the layout fights `text-2xl`. |
| `AchievementToast` | `Button` | Bespoke notification surface (gradient trophy, progress overlay); `Button` base icon sizing/whitespace would fight it. |
| `WheelOfFortuneTrigger` | `Button` | Decorative animated protruding tab; `Button` would override the wiggle/offset design. |
| `HotThingsPage` play control | `Button` | Large centered video overlay affordance; `Button` base sizing conflicts. |
| `CryptoWallet` copy action | `CopyMarker` | **Audit correction**: `CopyMarker` intercepts `copy` events to append attribution to a text selection — it is not a copy-to-clipboard button, so it cannot replace this action. |

## Phase 2 review notes

Adopted `Bubble`, `Message`, `Marker` and `MessageScroller` from the registry
(base-vega) and rebuilt the support chat on them. `MessageScroller` now owns
scroll follow and jump-to-latest, so the manual `scrollIntoView` effect is gone.

- **`Attachment` not added**: the support chat is text-only, so there is no use
  case yet. It stays available in the registry and can be added when attachments
  land.
- **`useInteractOutside` retained**: Base UI exposes no standalone dismissable
  primitive, so the small document-click hook is kept for the panel instead of a
  bespoke fork. Revisit if the panel moves onto `Popover`/`Sheet`.
- **i18n**: `MessageScrollerButton`'s jump-to-latest label is supplied by the app
  (`support.chatBubble.jumpToLatest`); the library keeps an English `sr-only`
  fallback, matching other ui-lib defaults.

## Phase 3 review notes

Adopted the `Switch` atom for every boolean preference (dark mode, reduced
motion, sound, adult filter, and the four pain-preference sections). The
`Checkbox` remains for the read-only grants and mandatory-experience rows, which
are informational checkmarks rather than toggles.

- **No behavior lost**: the preference checkboxes were always controlled with a
  boolean, so the `indeterminate` branch of `setFlagIndeterminate` was never
  reachable. The store API is untouched and still accepts `'indeterminate'`.

## Phase 4 review notes

Adopted `Collapsible` (comment replies), `Empty` (no-search-results state),
`Spinner` (captcha loader) and `ToggleGroup` (billing-cycle selector, rating
dialog). `Toggle` and `Slider` were added to the library; `Slider` has no
consumer yet.

Deliberately deferred:

| Item | Suggested | Why |
| ---- | --------- | --- |
| Pain slider (`AppHeader/…/PainLevelSelector`) | `Slider` | BEH-18: the custom `SliderRail` gradient, clamp labels and firefly particles are the design. A `Slider` would have to be layered transparently over the rail; the native range input stays until that is designed on purpose. |
| `monitoring/…/EventHistory` payload | `ScrollArea` | Debug-only; the chat scroll container is already owned by `MessageScroller`, so there is no meaningful second consumer yet. |

## Phase 5 review notes

- Exported `buttonVariants` and `navigationMenuTriggerStyle` so consumers can
  compose them.
- Added the missing `checkbox-indicator` `data-slot`.
- **Progress** was initially left monolithic and later ported to the compound
  `ProgressTrack`/`Indicator`/`Label`/`Value` — see "Registry drift audit".
  `LoaderDots` is kept as-is alongside the new `Spinner` until a consumer
  migrates.

## Phase 6 review notes

Restyled the chat popup to match the shadcn chat demo:

- **Header**: added a subtitle line and a "new chat" reset button (`rotate`
  icon) beside close. `useChatBubbleHistory` gained `reset()`, which reseeds the
  initial bot message and clears the unread counter.
- **Avatars**: `MessageAvatar` + `AvatarFallback` emoji (bot 🤖 / user 🙂); no new
  assets.
- **Bubbles**: user is `default` (primary), bot is `muted`.
- **Status**: user messages show a "Delivered" receipt; bot messages keep the
  relative timestamp.
- **Typing**: the "agent is typing" note now uses `Marker`.
- **Composer**: rounded container with an auto-growing `Textarea` and a circular
  send (↑) button. The demo's attach (+) button was dropped and the 👍
  `BubbleReactions` were removed for now.
- **Icons**: `arrowUp` added to the ui-lib `Icon` map.

## Phase 7 review notes

Reworked the settings page onto the shadcn `Field` composition:

- **`SettingsField`** is now built from `Field`/`FieldLabel`/`FieldTitle` with a
  `children(id)` render prop, so every control is wired to its label via
  `id`/`htmlFor`. This restores the association the previous bespoke row had
  dropped: clicking a row label toggles the control again, and Base UI derives
  the control's accessible name from the label (`useAriaLabelledBy`).
- **`InfoTooltip`** atom added: the help trigger is now a real, labelled
  `<button>` instead of a bare info `<svg>`. Fixes the invalid `type="button"`
  applied to an `<svg>` and the Base UI `nativeButton` dev warning, and gives
  screen readers a name for the help control.
- Read-only rows set `data-disabled` on `Field` (plus `disabled` on the control)
  per the shadcn disabled demo; permission rows use the `value` variant (a
  `FieldTitle`/value pair) instead of overloading the removed `reverse` prop.
- The four `PainPreferences` categories now use `FieldSet`/`FieldLegend`/
  `FieldGroup` in place of `<section>`/`<h3>`; the legend keeps the previous
  uppercase category styling via `className`.
- e2e: the settings POM's pain-preference locators were stale (still querying
  `role="checkbox"` after the Phase 3 `Switch` migration, so the count was 0 and
  the toggle test was vacuous). They now use `role="switch"` with the current
  copy, plus a new test asserting a row label toggles its control.
- **`Checkbox`** synced to the current `base-vega` item: 16px default (`size-4`
  instead of the ui-lib 20px `md`), the `[&>svg]:size-3.5` check sizing, the
  expanded `after:-inset-*` hit area, and the `Field` disabled/focus integration
  (`group-has-disabled/field:opacity-50`, `group-has-[:focus-visible]/field-label:*`).
  The unused custom `size` variant (`sm`/`md`/`lg`) was dropped to match upstream.
  The check sizing uses `[&>svg]:size-3.5!`: FontAwesome injects `.svg-inline--fa`
  (`width: 1.25em; height: 1em`) as an **unlayered** stylesheet at runtime, and
  unlayered styles outrank Tailwind's `@layer utilities`, so without `!` the check
  overflowed the 16px box. This affects any fixed-size FA icon inside a Tailwind
  utility; revisit globally if more icons need the override.
- **Checkbox check-in animation (deliberate deviation).** The registry indicator is
  `transition-none`; we add a subtle scale/fade via Base UI's transition status —
  `transition-[scale,opacity] duration-150 data-starting-style:scale-75
  data-starting-style:opacity-0 data-ending-style:scale-75 data-ending-style:opacity-0`.
  Base UI keeps the indicator mounted until the exit transition completes.

## Phase 8 review notes

Reworked the donation page and added the `Popover` atom to `@maw/ui-lib`
(`base-vega` port; `cn` import normalized, exported from `components/atoms`,
covered by a Storybook story).

- **Balance hero is borderless**: the counter sits in a plain `<section>` (no
  `Card`); the jar animation is a very faint backdrop (`opacity-5`) behind the FAQ
  in the right column.
- **Support grid**: a compact 2×2 grid of small secondary buttons below the
  balance hero — classic links plus `CryptoDonationButton`s whose QR codes,
  network and copy action open in a `Popover` (the always-visible `CryptoWallet`
  cards were removed — see BEH-21). The "other means" link sits underneath.
- **FAQ on the right**: the de-boxed `DonationFaq` occupies the second column
  beside the balance/support stack.
- **Neon arrow**: a decorative SVG (`NeonArrow`) points down from the balance
  hero at the support grid, with a stacked `drop-shadow` glow tinted by the theme
  primary token. It flickers (intentionally janky) and respects
  `prefers-reduced-motion`.
- **FAQ de-boxed**: `DonationFaq` lost its `Card` chrome and now renders a plain
  heading + `Accordion`.
- **Icons**: `@fortawesome/free-brands-svg-icons` added to the catalog and the
  `bitcoin`, `ethereum` and `paypal` marks exposed through the ui-lib `Icon` map.

## Phase 9 review notes

Revised the donation page after review:

- **Tier selector to the top right**: `SupportOptions` (the "Pick your poison" tiers plus the provider buttons) moved beside the hero instead of below the balance block.
- **FAQ above the comparison**: the de-boxed FAQ now sits above the before/after slider, and both are centered and width-capped (`max-w-2xl`) for readability.
- **Neon arrows removed**: the decorative `NeonArrow` SVG and its flicker stylesheet (Phase 8) were dropped as too distracting.
- **Jar animation removed**: the `JarAnimation` component, its `moneyJarAnimation` config and the `money-jar.lottie` asset were dropped along with the FAQ backdrop.
- **Impact stats tightened**: shorter charts (`h-[190px]`) and denser stat cards.
- **Native share**: the hero's "Share instead" now goes through the shared `useShareAction` hook (native sheet first, modal fallback).

## Registry drift audit

`pnpm audit:registry` (`packages/ui-lib/scripts/audit-registry-drift.ts`) diffs
every registry-backed component against the `base-vega` item for missing
exports, `data-slot` parts and `sideOffset`/`alignOffset` defaults. It found and
we fixed the following stale ports:

- **Tooltip**: arrow missing `translate-y`, `sideOffset` 0, no max width.
- **Select**: default `sideOffset` 0 (same class of bug as Tooltip).
- **Checkbox**: missing root `data-slot`.
- **Alert**: missing `AlertAction`.
- **Accordion**: missing `accordion-trigger-icon` slot.
- **Carousel**: `useCarousel` not exported.
- **NavigationMenu**: missing `NavigationMenuIndicator`.
- **Accordion**: the open/close height transition was on the inner wrapper while
  `data-starting-style`/`data-ending-style` are set on the `Panel`, so the height
  never animated. Moved the height/transition/variant classes onto the `Panel`
  (Base UI's documented pattern; `duration-200 ease-out`).
- **Progress**: ported from monolithic to the compound component.

The audit is not wired into `lint`/`test` (it needs network); run it on demand
or in CI.

## Phase checklist

- [x] **Phase 0** — Infra: `base-vega` style, registry conventions, this log, ADR 31.
- [x] **Phase 1** — Free wins with existing ui-lib components (Textarea, Separator,
      Button, Badge, Card; Alert and remaining raw buttons consciously deferred — see
      review notes).
- [x] **Phase 2** — Chat primitives (`Bubble`, `Message`, `MessageScroller`,
      `Marker`); `Attachment` and `useInteractOutside` retained — see Phase 2 notes.
- [x] **Phase 3** — `Switch`; settings toggles migrated.
- [x] **Phase 4** — `Collapsible`, `Empty`, `ToggleGroup`, `Spinner` adopted;
      `Slider` added but unused and `ScrollArea` deferred — see Phase 4 notes.
- [x] **Phase 5** — `buttonVariants` and `navigationMenuTriggerStyle` exported,
      checkbox indicator slot added; Progress sub-parts deferred — see notes.
- [x] **Phase 6** — Restyle the chat popup to the shadcn chat demo (avatars,
      delivered status, reactions, Marker typing, composer).
- [x] **Phase 7** — Settings page onto the shadcn `Field` composition
      (`SettingsField` id/`htmlFor` wiring, `InfoTooltip` atom, `FieldSet`/
      `FieldLegend`/`FieldGroup`, stale e2e locators fixed) — see Phase 7 notes.
- [x] **Phase 8** — Donation page rework + `Popover` atom (borderless balance
      hero, crypto QR popovers, neon arrows, de-boxed FAQ, brand icons) — see
      Phase 8 notes.
- [x] **Phase 9** — Donation page layout revision (tier selector top-right, FAQ
      above the comparison, arrows removed, impact stats tightened, native share)
      — see Phase 9 notes.
