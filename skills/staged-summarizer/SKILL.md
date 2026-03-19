---
name: staged-summarizer
description: Generates high-quality summaries of currently staged work using Conventional Commits with a 100-character line limit. Use when the user wants to summarize what is ready to be committed.
---

# Staged Summarizer

## Overview

This skill provides a standardized workflow for summarizing staged changes into clear, concise Conventional Commits messages. It enforces a strict 100-character line limit and lowercase subject lines.

## Guidelines

- **Format**: `<type>(<scope>): <subject>`
- **Line Limit**: Maximum 100 characters per line. Wrap the body as needed.
- **Tense**: Use the imperative, present tense ("add", not "added").
- **Case**: The subject line must be lowercase.
- **Read-only**: Only summarize changes that are already staged. Do not add unstaged files to the stage. If no changes are staged, report that and exit.
- **Reference**: See [references/conventional-commits.md](references/conventional-commits.md) for the full specification and allowed types.

## Tools

- **Summarize Script**: Run `node skills/staged-summarizer/scripts/summarize_staged.cjs` to get the diff of staged changes.

## Workflow

1. **Get Staged Changes**: Run the `summarize_staged.cjs` script to see what is staged.
2. **Determine Type & Scope**: Choose the most appropriate Conventional Commit type (e.g., `feat`, `fix`, `chore`) and identify the relevant scope (e.g., `ui`, `core`, `auth`).
3. **Draft Summary**:
   - Write a subject line under 100 characters in lowercase.
   - If the change is complex, add a body separated by a blank line.
   - Ensure every line in the body is wrapped at 100 characters.
4. **Final Review**: Confirm the summary accurately reflects "why" the change was made, not just "what" changed, and matches the project style.

## Examples

**Good**:
`feat(auth): add login rate limiting to prevent brute force`

**Good (with body)**:
```
refactor(ui): update button component to use tailwind 4 tokens

- this migration ensures consistent spacing and color usage across the
  entire application, following the new design system standards.
- another line of changes.
```

**Bad**:
`Fixed the bug in the login page.` (Non-conventional, past tense, period at end)
