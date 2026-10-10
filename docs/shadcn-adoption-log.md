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

## Behavior-loss register

Status legend: ⬜ pending · 🟡 reintroduced as a wrapper · 🟢 preserved (no behavior lost)
· ✅ intentionally dropped · ⛔ regression to fix.

| Ref | Area | shadcn component | Behavior at risk | Intentional? | Reintroduction plan | Status |
| --- | ---- | ---------------- | ---------------- | ------------ | ------------------- | ------ |
| BEH-01 | Chat trigger (`support/…/ChatBubble/ChatBubbleTrigger`) | `Button` + `Badge` | Unread-counter shake animation (framer-motion) | Yes | Trigger kept as-is; shake preserved | 🟢 |
| BEH-02 | Chat panel (`support/…/ChatBubble/ChatBubble`) | `MessageScroller` | Spring open/close transition (`AnimatePresence`) | Yes | Panel wrapper kept; animation preserved | 🟢 |
| BEH-03 | Chat history | `MessageScroller` | Force scroll-to-bottom whenever the panel opens | Yes | `defaultScrollPosition="end"` + `autoScroll` | 🟢 |
| BEH-04 | Chat messages | `Message` / `Bubble` / `Marker` | Timestamp shown only when owner changes or gap > 5 min | Yes | `shouldBubbleShowTime` kept, rendered via `MessageFooter` | 🟢 |
| BEH-05 | Chat history | `Marker` | "Agent is typing" indicator shown until the next user message | Yes | `showTyping` kept, rendered as a ghost `Bubble` | 🟢 |
| BEH-06 | Chat trigger | — | Favicon unread badge (`useFaviconBadge`) | Yes | Component-agnostic, kept as-is | 🟢 |
| BEH-07 | Rating dialog (`support/RatingDialog`) | `ToggleGroup` | Buttons 1–3 disabled, forced choice ≥ 4 | Yes | Kept `disabled` on low items | 🟢 |
| BEH-08 | Rating dialog | `ToggleGroup` | Selected item `scale-110` + ring | Yes | Kept via `aria-pressed:*` classes | 🟢 |
| BEH-09 | Billing cycle (`PlansPage/BillingCycleSelector`) | `ToggleGroup` | Ghost/default pill inside a muted track | Maybe | `ToggleGroup` in a muted track; selected uses `aria-pressed` (`bg-muted`) | 🟡 |
| BEH-10 | Comment replies (`comments/CommentItem`) | `Collapsible` | Replies render **instantly** (no height animation) | No | `Collapsible` without transition classes stays instant | 🟢 |
| BEH-11 | Paywall reveal (`content/PartitionalLockedContent`) | `Collapsible` | Deliberately janky incremental reveal | Yes | Keep the custom reveal; do not smooth it | ⬜ |
| BEH-12 | Cancellation reasons (`CancellationPage/steps/ReasonsStep`) | `RadioGroup` + `Field` | Clicking a reason selects **and** advances the step | Yes | Keep the click-through handler | ⬜ |
| BEH-13 | Survey bar (`FlaimSurveyPage/ProgressBar`) | `Progress` | Time-driven auto-shrink (not value-driven) | Yes | Keep the animation-driven bar if `Progress` cannot express it | ⬜ |
| BEH-14 | Urgency countdown (`PlansPage/UrgencyCountdown`) | `Badge` | `animate-pulse` while active | Yes | Kept the pulse class on `Badge` | 🟢 |
| BEH-15 | Adblocker bar (`marketing/AdblockerSuspectBar`) | `Alert` | Sticky `-bottom-3`, `FadeIn` slide-in | Yes | Keep positioning/animation wrapper | ⬜ |
| BEH-16 | Beggar banner (`funding/BeggarBanner`) | `Alert` / `Button` | Sticky positioning + raw close button | Yes | Sticky kept; close is now `Button` | 🟢 |
| BEH-17 | Cookie consent (`app/…/CookieConsent`) | `Alert` / `Button` | Always-on sticky banner, no dismiss control | Yes | Kept the grant-flag behavior; OK is now `Button` | 🟢 |
| BEH-18 | Pain slider (`AppHeader/…/PainLevelSelector`) | `Slider` | Custom `SliderRail` gradient + firefly particles + clamp labels | Yes | Keep rail/particles as an overlay layer | ⬜ |
| BEH-19 | Debug store (`monitoring/…/StoreInspector`) | `Textarea` | `resize-none`, mono font, fixed min height | No | Re-applied via `className` | 🟢 |
| BEH-20 | Context menu (`disruptions/useDisableContextMenu`) | `AlertDialog` or `toast` | Rude native `alert()` on right-click | Yes | Decide: keep native alert or restyle | ⬜ |

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
- **Not done**: `Progress` sub-parts (`ProgressTrack`/`Indicator`/`Label`/`Value`)
  were skipped because the current single-component `Progress` renders its own
  track/indicator; splitting it would change its public shape for no current
  consumer. `LoaderDots` is kept as-is alongside the new `Spinner` until a
  consumer migrates.

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
