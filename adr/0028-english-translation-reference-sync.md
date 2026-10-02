# ADR 28: English Translation Reference Sync to the Content API

## Status
Accepted

## Context
ADR 22 made the headless Content API the runtime source for non-English translations
while keeping bundled English as the reference shape and fallback. The Content API
also stores its own English copy so translators have a source of strings, but the two
copies are maintained by hand and had already drifted: `languageDetector` was stored
outside the bundle (so `translations/{lang}?namespace=languageDetector` returned 404),
stale variant arrays (`disruptions.titleExperience.*`) lingered, and `app.logoShort`
had gone missing.

We need a deterministic, low-friction way to keep the Content API's English reference
mirrored from the web bundle as the app evolves, without granting the Content API a
cross-repository write token.

## Decision

1.  **The web English bundle is the source of truth, organized by namespace.** Every
    top-level key in `apps/web/src/i18n/messages/en/index.ts` is a namespace. The
    formerly inlined app-level keys (`app`, `navigation`, `userField`, `gender`,
    `share`, `social`, `messages`, `contextMenu`, `language`, `themeSwitch`) now live
    inside the `common` namespace, so the entry point is a pure namespace map.
    `metadata` and `languageDetector` are ordinary namespaces.

2.  **A canonical snapshot is published by the web repo.** A CI job writes
    `apps/web/translation-reference.json` as
    `{ schemaVersion, hash, namespaces }` on pushes to the tracked branch that touch
    the English bundle. `hash = sha256(canonicalJson(namespaces))`, where
    `canonicalJson` sorts object keys lexicographically (UTF-16), preserves array
    order, drops `undefined`, and emits no whitespace. The string is built directly
    rather than via `JSON.stringify(sortedObject)`, because JavaScript enumerates
    integer-like keys (`"15"`, `"60"`, `"300"`) numerically, which would make the hash
    language-dependent.

3.  **The Content API mirrors namespaces one directory per namespace per locale.**
    `src/ui-translations/namespaces/<ns>/<lang>.ts` holds each namespace; the
    `captcha` directory was renamed `humanVerification`; `languageDetector` became a
    normal namespace whose strings use the `{language}` placeholder. Locale entry
    points (`messages/<lang>/index.ts`) are generated from the namespace files so
    adding or removing a namespace is a pure file operation.

4.  **Sync is a 30-minute poll, not a push.** A scheduled GitHub Action in the
    Content API repo fetches the public snapshot, compares its `hash` to
    `.sync/source.json`, and only then runs the differ. It opens or updates a PR with
    the repo's own `GITHUB_TOKEN` (`contents: write`, `pull-requests: write`), so no
    cross-repo PAT or GitHub App is required. Authenticity comes from polling a fixed
    public ref; the hash provides integrity and idempotency.

5.  **Removals are auto-applied inside the sync PR.** Namespace and key removals
    (including stale namespaces) are applied directly to every locale, and the PR
    review is the safety gate. A mass-removal guard aborts a sync that would delete
    more than a configurable threshold (or any namespace) unless `--force` is passed.

6.  **`.sync/source.json` is the state.** It stores the last applied `hash` and a
    `namespace -> key -> valueHash` map, which is what makes the semantic diff
    possible; the single bundle hash only signals *that* something changed.

7.  **Translation backlog is reported, auto-translation is deferred.** The PR body
    lists added/changed keys and the per-locale untranslated keys. Automatic
    translation of new keys is out of scope for now; the differ already produces the
    data a future job would consume.

## Consequences
- **Pros**: One source of truth for UI translation shape and English copy; the API
  reference can no longer silently drift.
- **Pros**: No long-lived cross-repo secret; the Content API only reads a public file
  and opens a PR against itself.
- **Pros**: Namespace add/remove is mechanical because locale entry points are
  generated.
- **Pros**: Auto-prune keeps stale keys and dead namespaces out of every locale, and
  the mass-removal guard prevents a bad ref from wiping translations.
- **Pros**: Folding `languageDetector` into the bundle fixes a latent 404 and unifies
  the translation workflow.
- **Cons**: The `common` consolidation changes runtime key paths
  (`navigation.home` -> `common.navigation.home`), a broad mechanical change that must
  land in the web and Content API repos together.
- **Cons**: Scheduled workflows can be delayed and are disabled after 60 days of repo
  inactivity; a manual `workflow_dispatch` is the fallback.
- **Cons**: Removal is destructive and relies on PR review rather than an automated
  grace period.
- **Cons**: Untranslated keys fall back to English at runtime until translated, so the
  reported backlog has no automated remediation yet.
