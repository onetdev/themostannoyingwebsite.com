---
name: branch-summarizer
description: Summarize the current branch compared to a target branch (e.g., origin/develop or origin/main). Use for concise overviews of changes, commit history, and file modifications.
license: MIT
---

# Branch Summarizer

## Overview

Use this skill to understand the differences between the current branch and a target branch (default: `origin/develop` or `origin/main`).

The output should provide a **clear, structured, high-signal summary** of what changed and why it matters.

## Guidelines

- **Format**: Use markdown
  - Highlight crucial information using **bold**
  - Use inline code for file names, symbols, and commands
- **Compare only committed changes**
  - Ignore staged and unstaged changes
- **Tense**: Use imperative, present tense ("add", not "added")
- **Avoid noise**
  - Do not list trivial changes (formatting, minor renames, etc.) unless part of a larger change
- **Do not repeat commit messages verbatim**
  - Summarize intent instead
- **Infer intent when needed**
  - If commit messages are unclear, use file changes and structure to deduce purpose
- **Reference**:
  - See `references/branch-summary-format.md` for extended specification (if applicable)

## Tools

- **Summarize Script**: Run `node skills/branch-summarizer/scripts/summarize_branch.cjs [target_branch]` to get a quick summary.
  - *Example*: `node skills/branch-summarizer/scripts/summarize_branch.cjs origin/main`

## Workflow

1.  **Identify Target Branch**: Default to `origin/develop` or `origin/main` unless the user specifies a different branch.
2.  **Run Summarize Script**: Use the provided script to gather commits and file changes.
3.  **Analyze and Summarize**:
    - Categorize changes by feature, fix, or chore based on the commit messages and files.
    - Provide a concise summary of the key changes and their impact.
    - Highlight user-facing, dev-facing and risk impacts
4.  **Optional: Detailed Diff**: If requested, run `git diff <target>..HEAD` for a deeper look at the code changes.

## Best Practices

- **Conciseness**: Focus on the most significant changes; don't list every minor adjustment unless necessary.
- **Contextual**: Explain the "why" behind the changes if it's evident from the commits or project context.
- **Reference Targets**: Use remote tracking branches (e.g., `origin/develop`) to ensure the comparison is up-to-date with the shared codebase.
