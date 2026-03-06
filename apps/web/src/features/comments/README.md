# Comments Feature

Provides a procedurally generated, deterministic comment section for any content context that has a constant identifier (like a slug).

## Key Highlights

- **CommentSection Component**: A high-level component that can be easily plugged into any article or page. It manages its own state and renders a tree structure of comments.
- **Seeded Comment Generation**: Uses a stable, deterministic algorithm (via `SeededRandom`) to ensure the same slug and publish date always result in the same set of comments across different user sessions.
- **CommentService**: An injectable service (using `inversify`) that handles the logic of gathering comment pools and generating tree structures with nested replies.
- **Localized Comment Pools**: Maintains separate pools of comment templates for each supported language (e.g., `en`, `hu`), ensuring that comments match the user's current locale.
- **Dynamic Reply Simulation**: Includes a reply form that allows users to "post" replies. These are currently added to the local UI state but do not persist.

## Internals

- `SeededRandom`: A custom utility located in `@maw/utils/random` that ensures reproducibility in comment generation.
- `pools`: Key-value map of comment templates categorized by locale and context.

## Out of Scope

- **Backend Persistence**: Comments are not stored on a server.
- **Real-Time Interaction**: No real users are interacting through the comment section.
- **Moderation**: Since comments are pre-determined, there is no need for moderation logic.
