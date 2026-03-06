# Content Feature

Acts as the internal bridge for managing and displaying dynamic site content, such as articles and search results.

## Key Highlights

- **ArticleItemPage**: A layout for rendering individual articles using MDX. It handles local formatting, cover images, and embeds the `CommentSection`.
- **SearchPage & SearchForm**: Implements a simulated search experience with "Dark UX" delays and randomly shuffled results.
- **HotThingsPage**: A visual showcase of "hot" (annoying) content, often used to test UI disruption features in a dense content environment.
- **ArticleService Proxy**: Proxies requests to the `@maw/content-api` package, which houses the actual raw content and assets.
- **Content Formatting**: Uses CSS modules (`content.module.css` from `@maw/ui-lib`) and specialized typography rules to ensure content is readable but also visually consistent with the project's aesthetics.
- **PartitionalLockedContent**: A "paywall" component that intentionally obscures parts of an article, forcing users through frustrating interaction cycles.

## !IMPORTANT!

The actual content data is currently being extracted into a separate repository to simplify the main codebase.

## Out of Scope

- **Content Creation Interface**: No CMS or admin UI for writing articles exists within this repo.
- **Real-Time Indexing**: Search results are statically generated or filtered from pre-defined content lists.
- **Dynamic Comments**: Real, user-submitted comments are not handled by this feature (see `comments` feature for the simulated version).
