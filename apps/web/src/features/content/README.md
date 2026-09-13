# Content Feature

Acts as the internal bridge for managing and displaying dynamic site content, such as articles and search results.

## Key Highlights

- **ArticleItemPage**: A layout for rendering individual articles with server-rendered markdown. It handles local formatting, cover images, and embeds the `CommentSection`.
- **SearchPage & SearchForm**: Client-side search interface leveraging `@maw/content-sdk` to execute real-time queries against the headless Content API. Matching search terms are rendered via `renderMarkdown` with custom highlighting.
- **HotThingsPage**: A visual showcase of "hot" (annoying) content, often used to test UI disruption features in a dense content environment.
- **ArticleService**: Server-side service built on `@maw/content-sdk` providing article retrieval (`getBySlug`, `list`, `listAll`) with Next.js cache tags (`CONTENT_CACHE_TAGS`) and error resilience.
- **Content Formatting**: Uses CSS modules (`content.module.css` from `@maw/ui-lib`) and specialized typography rules to ensure content is readable but also visually consistent with the project's aesthetics.
- **PartitionalLockedContent**: A "paywall" component that intentionally obscures parts of an article, forcing users through frustrating interaction cycles.

## Remote Headless Content

Content is hosted externally by the headless Content API (`content.themostannoyingwebsite.com`) and fetched via `@maw/content-sdk`.

## Out of Scope

- **Content Creation Interface**: No CMS or admin UI for writing articles exists within this repo.
- **Dynamic Comments**: Real, user-submitted comments are not handled by this feature (see `comments` feature for the simulated version).
