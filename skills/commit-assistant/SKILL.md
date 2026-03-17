---
name: commit-assistant
description: Generates high-quality commit messages following Conventional Commits with a 100-character line limit. Use when Gemini CLI needs to draft a commit message for staged or unstaged changes.
---

# Commit Assistant

## Overview

This skill provides a standardized workflow for generating commit messages that are clear, concise, and compliant with Conventional Commits. It enforces a strict 100-character line limit and lowercase subject lines.

## Guidelines

- **Format**: `<type>(<scope>): <subject>`
- **Line Limit**: Maximum 100 characters per line. Wrap the body as needed.
- **Tense**: Use the imperative, present tense ("add", not "added").
- **Case**: The subject line must be lowercase.
- **Reference**: See [references/conventional-commits.md](references/conventional-commits.md) for the full specification and allowed types.

## Workflow

1. **Analyze Changes**: Run `git status && git diff HEAD` (or `--staged`) to understand the intent and scope of the changes.
2. **Determine Type & Scope**: Choose the most appropriate Conventional Commit type (e.g., `feat`, `fix`, `chore`) and identify the relevant scope (e.g., `ui`, `core`, `auth`).
3. **Draft Message**:
   - Write a subject line under 100 characters in lowercase.
   - If the change is complex, add a body separated by a blank line.
   - Ensure every line in the body is wrapped at 100 characters.
4. **Final Review**: Confirm the message matches the project style and accurately reflects "why" the change was made, not just "what" changed.

## Examples

**Good**:
`feat(auth): add login rate limiting to prevent brute force`

**Good (with body)**:
```
refactor(ui): update button component to use tailwind 4 tokens

this migration ensures consistent spacing and color usage across the 
entire application, following the new design system standards.
```

**Bad**:
`Fixed the bug in the login page.` (Non-conventional, past tense, period at end)
