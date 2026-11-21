# PR Review Checklist

Use this as a working checklist. Not every item applies to every PR; skip irrelevant items explicitly rather than silently. For instrumentation, analytics, or telemetry PRs, also use [instrumentation-review.md](instrumentation-review.md).

## 1. Scope and change shape

- [ ] Branch and base are identified; base is fetched and the diff uses the merge base (`base...HEAD`).
- [ ] Commit count, diffstat, and touched areas are recorded.
- [ ] Dirty worktree / untracked files are noted and excluded from the PR review unless requested.
- [ ] The PR's stated purpose and any linked issue/ADR are understood.
- [ ] The diff is grouped by boundary; mechanical changes are separated from behavior changes.
- [ ] The PR type and review depth are chosen (light / standard / deep).
- [ ] The review boundaries are stated: files not read, services not run, commands skipped.

## 2. Contract and documentation

- [ ] ADRs, schemas, and module READMEs touched by the PR are read.
- [ ] Public types, interfaces, config keys, routes, and data contracts are read before implementation details.
- [ ] Every explicit guarantee ("never", "always", "only", "defaults off", "idempotent") is listed as a review target.
- [ ] Documentation claims match the implementation.
- [ ] Examples in docs use APIs that still exist and signatures that still compile.
- [ ] Deprecated APIs were not reintroduced.
- [ ] Third-party behavior is verified against the installed package, not memory.
- [ ] Generated guidance/artifacts were not hand-edited.
- [ ] Breaking changes are called out, or the API stays backwards compatible.

## 3. Correctness and edge cases

- [ ] Main success path works.
- [ ] Empty / single-item / missing-data / null path works.
- [ ] Disabled / feature-flagged / suppressed path works.
- [ ] Error and partial-failure path works.
- [ ] Timeout, cancellation, and retry path works.
- [ ] Concurrency, double-submit, race, and rapid-repeat paths are covered.
- [ ] Boundary values, overflow, precision, and units are correct.
- [ ] State transitions are exhaustive; impossible states are not representable or are handled.
- [ ] Authorization is checked server-side, not only in the UI.
- [ ] Async work cannot mutate state after the component/request/job is gone.
- [ ] **Bug fix:** a regression test fails before the fix and passes after; the root cause is addressed, not just the symptom.
- [ ] **Refactor:** behavior and the public contract are preserved; unrelated behavior changes are split out.
- [ ] **Docs-only:** examples and commands are runnable, links resolve, and no generated artifact is hand-edited.
- [ ] `??` vs `||`, `tagName`, `closest`, `instanceof`, URL parsing, and numeric parsing assumptions are validated in the actual environments.
- [ ] Any `if` that combines 2+ booleans is named before the return, per repo rules.
- [ ] Functions stay within the parameter/complexity budget; iteration is not nested more than two levels.
- [ ] No `any`; types are explicit or narrowed without unsafe casts.

## 4. Security

- [ ] Authentication is required where expected, and authorization is enforced at the boundary.
- [ ] User input is validated and encoded for its sink (HTML, SQL, shell, URL, file path, template).
- [ ] No secrets, tokens, keys, or credentials in source, fixtures, logs, or error messages.
- [ ] Secret handling uses the project's configured mechanism; no new hardcoded fallback.
- [ ] CSRF, CORS, clickjacking, and cookie/session settings are appropriate for the change.
- [ ] Server-side request targets and file paths cannot be attacker-controlled without validation.
- [ ] File uploads validate type/size/content and cannot escape their intended location.
- [ ] Rate limiting / abuse controls exist for new public endpoints or expensive operations.
- [ ] Error responses do not leak internals, stack traces, SQL, or sensitive values.
- [ ] Dependency/CI changes do not introduce unpinned actions, broad permissions, or untrusted code execution.
- [ ] Cryptographic operations use the platform/library primitives; no custom crypto or insecure randomness.
- [ ] Redirects, deep links, and callback URLs are allowlisted.

## 5. Privacy and data protection

Trace **values**, not just field names:

- [ ] Each collected value is traced to every boundary: response, log, storage, cache, queue, third party, debug surface.
- [ ] A denylist of field names cannot be bypassed by renaming a field (`value` -> `optionValue`, `query` -> `queryKey`, etc.).
- [ ] Semantic identifiers that encode personal data are treated as personal data (birth date, gender, country, survey answers, consent, preferences, search terms).
- [ ] Credentials and payment data are excluded on every path, including programmatic and mirrored inputs.
- [ ] Query strings, fragments, and user-supplied text are not copied into logs or analytics unredacted.
- [ ] Debug globals, history buffers, and event buses are not exposed in production unless the PR explicitly accepts that risk.
- [ ] Consent / GPC / DNT / opt-out requirements are met for every transport, including third-party breadcrumbs.
- [ ] Retention, payload size, and sampling are considered.
- [ ] No secrets, tokens, or PII in console logs, test fixtures, docs, or error messages.

## 6. API, compatibility, and data/migration

- [ ] Request/response schemas are backwards compatible, or the break is versioned and documented.
- [ ] Nullability, optionality, defaults, and error codes are explicit.
- [ ] Idempotency, pagination, filtering, sorting, and concurrency semantics are correct.
- [ ] Authorization and tenancy scoping are applied to every new query/endpoint.
- [ ] Schema changes include a migration path, not just a model edit.
- [ ] Migrations are reversible, or the rollback plan is documented.
- [ ] Backfills are batched, resumable, and safe under concurrent writes.
- [ ] Locks, indexes, and query plans are considered for large tables.
- [ ] Data consistency and foreign-key/constraint behavior are preserved.
- [ ] Cache keys and invalidation cover the new data shape.
- [ ] Retention, deletion, and export requirements are preserved.

## 7. UI, accessibility, and i18n (for UI changes)

- [ ] Loading, empty, error, disabled, and permission-denied states are rendered.
- [ ] Keyboard path works, not just pointer.
- [ ] Label click and other large hit targets work.
- [ ] Focus is managed on open/close/navigation; focus is not lost or trapped incorrectly.
- [ ] ARIA state matches visual/state behavior; live regions announce changes.
- [ ] Responsive layout and reduced-motion behavior are preserved.
- [ ] Portals/overlays are scoped and dismissible by Escape/outside click where expected.
- [ ] Custom components preserve the behavior of the standard component they replace.
- [ ] No hardcoded user-facing strings; translations and RTL are handled.
- [ ] Locale-aware routing, metadata, structured data, and indexability are preserved.
- [ ] If the PR adds instrumentation: annotation attributes do not alter layout, hit targets, or accessibility.

## 8. Performance and lifecycle

- [ ] No full-document scan, N+1 query, or repeated work on a hot path.
- [ ] Observers, listeners, timers, and rAF callbacks are cleaned up and cannot fire against stale state.
- [ ] Maps/sets/caches used for dedupe/history/memoization are bounded or cleared at the right boundary.
- [ ] High-frequency work is sampled, debounced, or batched before expensive serialization/I/O.
- [ ] Disabled builds/flags do not still install observers, listeners, or background work.
- [ ] Server bundles do not pull browser-only singletons/sinks solely to import a pure helper.
- [ ] Database queries use indexes and avoid unbounded result sets.
- [ ] Payload sizes are bounded and pagination is enforced.

## 9. Infrastructure, CI, and dependencies (if applicable)

- [ ] CI actions are pinned to immutable refs and use least-privilege permissions.
- [ ] Secrets are referenced, not printed; fork/pr permissions are safe.
- [ ] Environment parity and required configuration changes are documented.
- [ ] Caching, artifacts, and deploy steps have a rollback path.
- [ ] Dependency changes respect the catalog/lockfile and do not duplicate versions.
- [ ] Peer dependencies, licenses, and supply-chain risk were checked.
- [ ] Build/deploy commands still work from a clean checkout.
- [ ] No generated artifact or lockfile drift is left unexplained.

## 10. Tests and verification

- [ ] New behavior has co-located unit/integration coverage.
- [ ] Shared-module integrations are tested where behavior crosses a boundary.
- [ ] Tests cover the interaction the author is least likely to perform: error, disabled, keyboard, portal, concurrent, migration, rollback.
- [ ] Tests assert the important contract dimension, not only an easy value.
- [ ] Tests fail if the contract is violated, not just if the function throws.
- [ ] E2E/integration tests open the surfaces they claim to cover.
- [ ] Browser matrix cost is justified; DOM-only or logic-only suites can run on one browser.
- [ ] Tests are order-independent; module-level state is reset.
- [ ] Test names describe behavior, not implementation.
- [ ] Tests do not encode stale assumptions about third-party markup or APIs.
- [ ] Commands run are reported exactly, including skipped checks and why.

## 11. Overengineering and simplification

Ask for every new abstraction, event, endpoint, flag, or dependency:

- [ ] Is there a consumer **today**? If not, is the feature explicitly deferred?
- [ ] Does the contract promise more than the implementation delivers?
- [ ] Can a generic mechanism replace N bespoke implementations?
- [ ] Are there two mechanisms doing the same job?
- [ ] Are there dead events, states, flags, props, exports, or APIs?
- [ ] Is the surface area larger than the set of questions the team can answer?
- [ ] Is the UI/design-system change justified by the feature value?
- [ ] Is the test/integration matrix proportional to the risk?
- [ ] Can local-only or unused behavior be deferred until a consumer exists?
- [ ] Would removing the change leave any user-visible behavior unchanged? If yes, question the surface area.

## 12. Final report quality

- [ ] Findings are prioritized by real risk, not by file order.
- [ ] Every finding has `path:line` evidence, consequence, and a concrete fix.
- [ ] Unverified claims are marked as likely, with the evidence that would confirm them.
- [ ] Related findings are grouped instead of repeated.
- [ ] Nothing is called a blocker without a data/security/privacy/build/migration/main-path justification.
- [ ] Cleanup findings are separated from bugs.
- [ ] The report states what is solid, what was not run, and the recommended next step.
- [ ] No code was changed unless the user explicitly asked for fixes.
