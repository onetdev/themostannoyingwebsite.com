---
name: adr-writer
description: Drafting and managing Architectural Decision Records (ADRs). Use when deciding on new technologies, architectural patterns, or significant project changes to document the rationale and consequences.
---

# ADR Writer

Use this skill to maintain a historical record of architectural decisions in the `adr/` directory.

## Workflow

1.  **Identify the Next Number**: List the files in the `adr/` directory to determine the next sequential number (e.g., if `0008-xxx.md` is the last, use `0009`).
2.  **Gather Context**: Ensure you understand the problem, the options considered, and the final decision.
3.  **Draft the ADR**:
    - Use the template in `references/template.md`.
    - File naming convention: `NNNN-kebab-case-title.md`.
    - Content must be clear, objective, and emphasize **why** the decision was made over other alternatives.
4.  **Review Status**: Mark as `Proposed` initially unless the decision has already been implemented, in which case mark as `Accepted`.

## Principles

- **Immutability**: ADRs are historical records. If a decision changes, create a *new* ADR that supersedes the old one (update the old ADR's status to `Superseded by ADR NNNN`).
- **Focus on Consequences**: Always include both positive and negative consequences to provide a balanced view for future developers.
- **Context-First**: A decision without context is a mystery. Spend time explaining the "Why now?" and the constraints that led to the choice.
