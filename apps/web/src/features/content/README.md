# Content feature

Acts as the internal bridge for managing and displaying dynamic site content.

## Key highlights

- **ArticleItemPage**, **SearchPage**, and **HotThingsPage** components for App Router integration.
- **Article item rendering**:
  - Displaying MDX content and applying local formatting
  - Configuring and displaying comments section.
- **Integrates** and proxies requests to the **`@maw/content-api`** package.
  - **!IMPORTANT! Content will be extracted into a separate repo in the near future)**
- **Article service** allows to access and filter articles across the whole app.

Designed to separate pure content delivery from UI-specific application logic.

## Out of scope

- Real comment section
