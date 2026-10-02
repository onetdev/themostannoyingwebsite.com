# ADR 28: English Translation Reference Sync to the Content API

## Status
Accepted

## Context
ADR 22 made the headless Content API the runtime source for non-English translations
while keeping bundled English as the reference shape and fallback. The Content API
also stores its own English copy so translators have a source of strings. To keep the
two from drifting silently, the web app needs to expose its English bundle in a form
the Content API can consume.

An earlier revision of this decision had the web repo publish a generated
`apps/web/translation-reference.json` snapshot that the Content API polled. That
required committing a generated file, a bot commit to `main`, a cross-repo artifact
contract, and a hand-maintained `schemaVersion` field. Instead, the Content API should
own detection, pulling, and extraction, reading the web source directly with no
published artifact and no cross-repo write token.

## Decision

1.  **The web English bundle is the source of truth, organized by namespace.** Every
    top-level key in `apps/web/src/i18n/messages/en/index.ts` is a namespace. The
    formerly inlined app-level keys (`app`, `navigation`, `userField`, `gender`,
    `share`, `social`, `messages`, `contextMenu`, `language`, `themeSwitch`) live
    inside the `common` namespace, so the entry point is a pure namespace map.
    `metadata` and `languageDetector` are ordinary namespaces. Every namespace holds
    only JSON-serializable data.

2.  **The web repo publishes nothing.** There is no `translation-reference.json`, no
    export script, and no sync workflow in the web repo. A co-located contract test
    (`apps/web/src/i18n/messages/en/index.test.ts`) asserts the entry stays a pure
    namespace map of JSON-serializable data.

3.  **The Content API detects and extracts the reference itself.** On a schedule and
    on `workflow_dispatch`, it resolves the head SHA of the web repo `main`, downloads
    the source tarball at that SHA (`codeload.github.com/.../tar.gz/<sha>`), bundles
    `apps/web/src/i18n/messages/en/index.ts` with `esbuild` (aliasing `@` to
    `apps/web/src`), and evaluates the default export into a
    `{ hash, namespaces }` reference. It validates that the values are pure data.

4.  **Detection is content-hash based.** The Content API recomputes the hash with its
    own canonical hasher (`src/ui-translations/sync/canonical.ts`) and compares it to
    the `hash` stored in `.sync/source.json`. When unchanged, it does nothing. On
    change it diffs against the stored state and applies the result. Because hashing
    has a single owner, no schema version crosses the repo boundary.

5.  **Asymmetry is a warning, not an error.** If the recomputed hash differs from the
    stored hash but the semantic diff is empty (canonicalization drift), the Content
    API logs a warning instead of failing or opening a PR.

6.  **`.sync/source.json` is the state.** It stores the last applied web `sourceSha`,
    the bundle `hash`, and a `namespace -> key -> valueHash` map, which is what makes
    the semantic diff possible; the bundle hash only signals *that* something changed.

7.  **Sync is pull-based and needs no cross-repo credential.** The web repo is public,
    so the Content API reads source with its own `GITHUB_TOKEN` and opens its sync PR
    with the repo's own `GITHUB_TOKEN` (`contents: write`, `pull-requests: write`). No
    cross-repo PAT or GitHub App is required.

8.  **Removals are auto-applied inside the sync PR.** Namespace and key removals
    (including stale namespaces) are applied directly to every locale, and the PR
    review is the safety gate. A mass-removal guard aborts a sync that would delete
    more than a configurable threshold (or any namespace) unless `--force` is passed.

9.  **Translation backlog is reported, auto-translation is deferred.** The PR body
    lists added/changed keys and the per-locale untranslated keys. Automatic
    translation of new keys is out of scope for now; the differ already produces the
    data a future job would consume.

## Consequences
- **Pros**: One source of truth for UI translation shape and English copy; the API
  reference can no longer silently drift.
- **Pros**: No generated artifact in the web repo, no bot commits to `main`, and no
  `schemaVersion` field to maintain.
- **Pros**: No long-lived cross-repo secret; the Content API only reads a public repo
  and opens a PR against itself.
- **Pros**: The consumer owns detection, extraction, and hashing, so the contract is a
  single entry module.
- **Pros**: Folding `languageDetector` into the bundle fixes a latent 404 and unifies
  the translation workflow.
- **Cons**: The Content API now depends on the web bundle's file layout and TypeScript
  syntax. The bundle must stay a pure namespace map of data; the web contract test
  guards this.
- **Cons**: The `common` consolidation changes runtime key paths
  (`navigation.home` -> `common.navigation.home`), a broad mechanical change that must
  land in the web and Content API repos together.
- **Cons**: Scheduled workflows can be delayed and are disabled after 60 days of repo
  inactivity; a manual `workflow_dispatch` is the fallback.
- **Cons**: Removal is destructive and relies on PR review rather than an automated
  grace period.
- **Cons**: Untranslated keys fall back to English at runtime until translated, so the
  reported backlog has no automated remediation yet.
