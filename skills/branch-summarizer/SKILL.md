---
name: branch-summarizer
description: Summarizing the current branch's work compared to another branch (e.g., origin/develop or origin/main). Use when you need a concise overview of changes, commit history, and file modifications between branches.
---

# Branch Summarizer

Use this skill to quickly understand the differences between the current branch and a target branch (e.g., `origin/develop`).

## Tools

- **Summarize Script**: Run `node skills/branch-summarizer/scripts/summarize_branch.cjs [target_branch]` to get a quick summary.
  - *Example*: `node skills/branch-summarizer/scripts/summarize_branch.cjs origin/main`

## Workflow

1.  **Identify Target Branch**: Default to `origin/develop` or `origin/main` unless the user specifies a different branch.
2.  **Run Summarize Script**: Use the provided script to gather commits and file changes.
3.  **Analyze and Summarize**:
    - Categorize changes by feature, fix, or chore based on the commit messages and files.
    - Provide a concise summary of the main changes and their impact.
4.  **Optional: Detailed Diff**: If requested, run `git diff <target>..HEAD` for a deeper look at the code changes.

## Best Practices

- **Conciseness**: Focus on the most significant changes; don't list every minor adjustment unless necessary.
- **Contextual**: Explain the "why" behind the changes if it's evident from the commits or project context.
- **Reference Targets**: Use remote tracking branches (e.g., `origin/develop`) to ensure the comparison is up-to-date with the shared codebase.
