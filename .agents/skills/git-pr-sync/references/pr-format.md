# Pull Request Format & Guidelines

This document outlines the standard format for Pull Requests in this repository.

## PR Title

Always use the **Conventional Commits** format for the PR title:
- `<type>(<optional-scope>): <subject>` (e.g., `feat(web): make app header sticky`, `fix(auth): prevent session timeout glitch`)
- Imperative tense, lowercase subject, no trailing period.
- If the PR touches multiple scopes or repo-wide items, omit scope: `chore: upgrade project dependencies`.

## Principles: High Signal & Conciseness

- **Focus on Decisions & Implications**: Highlight the primary motivation, key architectural decisions, and broader system implications.
- **Avoid Over-Explaining Trivialities**: Do not recount mechanical changes, trivial renames, import adjustments, or formatting fixes.
- **Synthesize Information**: Group related changes logically under crisp, informative bullet points.

## PR Body Structure

The body must follow the structure defined in [`.github/pull_request_template.md`](../../../../.github/pull_request_template.md):

### 1. `## Summary`
- 1–2 paragraphs providing a clear narrative of what the branch accomplishes, why it was needed, and any architectural context.
- Link related issue(s) if applicable (`Closes #123`, `Fixes #456`).

### 2. `## Key Changes`
Keep **only** the subsections that are relevant to this PR, omitting unused categories:
- `### 🚀 Features` (User-facing capabilities or new developer features)
- `### 🐛 Fixes` (Bug fixes, edge case corrections, regression repairs)
- `### 🧹 Chores & Refactors` (Tooling, dependencies, refactors, structural cleanup)
- `### 🧪 Tests` (Unit, integration, or E2E test suites added/updated)
- `### 📚 Documentation` (ADRs, guides, rules, README updates)

Use bullet points with bold sub-headers or concise descriptions explaining the change and the modified components/paths.

### 3. `## Impact`
Must contain all three fields:
- **User-facing**: End-user UX/UI changes, behaviour changes, or `None`.
- **Developer-facing**: Architectural patterns, API changes, DX impact, or `None`.
- **Risk**: Qualitative risk assessment (`Low`, `Medium`, `High`) along with rationale and blast radius considerations.

### 4. `## Checklist`
Mark applicable items completed with `[x]`:
- `[x] Tests updated and passing locally`
- `[x] Documentation updated (if applicable)`
- `[x] Localization extracted (if applicable)`

### 5. `## Screenshots & Videos`
- Include for UI changes when available.
- Omit this section entirely for non-visual/backend/tooling changes.
