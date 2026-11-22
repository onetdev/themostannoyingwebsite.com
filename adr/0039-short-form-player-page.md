# ADR 39: Short-Form Player Page

## Status

Accepted

Complements [ADR 31](0031-base-ui-shadcn-adoption.md) (Base UI primitives) and
[ADR 37](0037-user-interaction-telemetry.md) (player interactions are tracked as a
first-class surface).

## Context

The Content API now exposes localized short-form clips with vertical video
renditions, posters, localized subtitle tracks, cues, and translation alternates.
The web app needs a playback surface before it can list shorts on the home,
author, and search pages.

A player has different constraints from an article page:

- Browsers block unmuted autoplay unless the site has enough engagement or a user
  gesture. The player must still try to start with sound and recover cleanly when
  it cannot.
- A vertical feed needs one viewport-height slide per clip, lazy media mounting,
  and a single active video so the browser is not asked to decode the whole feed.
- The overlay controls must not slide away with a swipe, and the feed must remain
  usable when the Content API does not expose the shorts endpoint yet.
- The page must be shareable, crawlable, and describe itself with structured data
  (the project rule for every public page).

## Decision

1.  **The player is a dedicated route, not a modal.** `/{locale}/shorts/{slug}/`
    lives in the `(public)` group with a `fixed inset-0` shell. This keeps the
    global share-modal fallback usable and preserves the theme, intl, telemetry,
    and document-visibility providers. No `PageLayout` means no header or footer.

2.  **The route is dark-launchable.** `ShortService` degrades to empty/undefined
    results when the endpoint is unavailable, and `generateStaticParams` may
    return nothing. The player still works on-demand when the API exists; listing
    surfaces can add links in later PRs without breaking pages.

3.  **One vertical Embla carousel, one active video.** The feed uses the shared
    `Carousel` with `spacing={false}` and a full-height viewport. Only slides
    adjacent to the active index mount a `<video>`; the rest keep their poster.
    The active video plays, the previous one pauses, and the feed pauses when the
    document is hidden.

4.  **Sound-on first, muted fallback.** The active video starts unmuted. If
    `play()` rejects because of the autoplay policy, the player retries muted and
    shows an unmute prompt. `prefers-reduced-motion` starts paused with a play
    control. Clips loop (`loop`) instead of auto-advancing.

5.  **TikTok-style persistent chrome.** The top bar (close, sound), right rail
    (author, share, captions, fullscreen), lower third (author, title, summary,
    categories, AI disclosure), and progress bar stay visible. Only play/pause is
    transient; it stays visible while paused.

6.  **The URL follows the active slide.** Slide changes use
    `history.replaceState`, not an RSC navigation, so sharing reflects the clip on
    screen and the back button returns to the referring page.

7.  **Structured data and caching match articles.** The page emits a `VideoObject`
    plus a breadcrumb, declares self-canonical `hreflang` alternates from
    `translations`, uses `content:shorts` with a 1800 s revalidate, and is included
    in the sitemap grouped by `short_group`.

## Consequences

- **Pros**: A single shareable player URL; predictable playback lifecycle; no
  page-level chrome around the video; graceful rollout before the production API
  exposes shorts.
- **Pros**: The persistent chrome stays fixed during swipes because it is rendered
  once outside the carousel.
- **Cons**: Sound-on playback can still be downgraded to muted by the browser; the
  unmute prompt is part of the contract.
- **Cons**: `history.replaceState` means the browser back button skips individual
  swipes, which is the intended sharing behavior but not a full history stack.
- **Cons**: The shared `Carousel` needed a backwards-compatible `spacing` flag and
  a `viewportClassName` hook for the full-bleed vertical viewport.
