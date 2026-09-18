# Conventional Commits Reference Specification

The repository follows the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) standard, enforced via `@commitlint/config-conventional` and Lefthook git hooks.

## Format Structure

```
<type>(<optional-scope>): <subject>

[optional body]

[optional footer(s)]
```

## Commit Types

| Type | Description |
| :--- | :--- |
| `feat` | A new feature or capability |
| `fix` | A bug fix |
| `chore` | Maintenance, dependencies, tooling, or build tasks |
| `refactor` | Code restructuring without fixing bugs or adding features |
| `docs` | Changes to documentation or markdown guides |
| `style` | Formatting, whitespace, or style changes with no code logic impact |
| `perf` | Changes aimed specifically at improving runtime performance |
| `test` | Adding or updating unit, integration, or E2E tests |
| `ci` | Modifications to CI workflows, actions, and pipeline configs |

## Scope Guidelines

Scope should provide quick context regarding where the change occurred.

1. **Monorepo Packages**:
   - `web`: Changes in `apps/web/`
   - `ui-lib`: Changes in `packages/ui-lib/`
   - `content-sdk`: Changes in `packages/content-sdk/`
   - `logger`: Changes in `packages/logger/`
   - `utils`: Changes in `packages/utils/`
   - `ui-docs`: Changes in `apps/ui-docs/`

2. **Domain / Feature Scopes**:
   - If changes are isolated to a single feature within `apps/web/src/features/<feature>`, use that feature name (e.g., `disruptions`, `auth`, `captcha`, `i18n`).

3. **Infrastructure Scopes**:
   - `deps`: Dependency version upgrades (`package.json`, lockfile)
   - `adr`: Architecture Decision Records (`adr/`)
   - `skills`: Agent skill definitions (`.agents/skills/`)
   - `git-hooks`: Hook configuration (`lefthook.yml`, commitlint)
   - `ci`: GitHub Actions workflows

4. **Multi-Scope / Broad Changes**:
   - Scope is **optional**. If changes span across multiple packages or are repo-wide, omit the scope (e.g. `feat: implement dark mode tokens`, `chore: format codebase with biome`).

## Header Rules

- **Tense & Mood**: Imperative, present tense (`add`, not `added` or `adds`).
- **Case**: The subject must start with lowercase.
- **Punctuation**: No trailing period (`.`).
- **Length**: Maximum 100 characters for the full header line.

## Optional Body Guidelines

- **When to Use**: Use a body when a single line is insufficient to explain *why* the change was made, or when notable architectural implications or trade-offs need to be captured.
- **Conciseness**: Avoid micro-explaining small mechanical edits, formatting changes, or individual renames. Focus strictly on important aspects, design rationale, and broader implications.
- **Separation**: Must be separated from the header by an empty line.
- **Formatting**:
  - Can use bullet points (`- `) or concise paragraphs.
  - Every line must be wrapped at or under 100 characters.
  - Explain intent, trade-offs, or migration notes.

## Breaking Changes

If introducing a breaking change:
- Append `!` after type/scope (e.g., `feat(content-sdk)!: rename client methods`).
- Or include `BREAKING CHANGE: <description>` in the body/footer.
