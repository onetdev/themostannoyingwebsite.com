# Content Module

Article and content display components for the website.

## Features

- **Article Service** - Centralized service for article data and URL generation
- **Content Components** - Reusable components for displaying articles in various formats
- **Content Types** - Re-exports all content API types (ArticleDatum, ArticleSearchResult, etc.)

## Components

- **`CoverPlaceholder`** - Placeholder component for missing article covers
- **`LargeCoverItem`** - Large format article card with cover image
- **`SmallCoverListItem`** - Compact article list item with small cover
- **`TextListItem`** - Text-only article list item
- **`PartitionalLockedContent`** - Content section with partial reveal/lock functionality

## Usage

```typescript
// Import article service
import { AppArticleService, ArticleDatum } from '@/modules/content';

// Get article URL
const url = AppArticleService.getUrl(article);

// Get asset URL
const imageUrl = AppArticleService.getAssetUrl('cover.jpg');

// Use content components
import { LargeCoverItem, SmallCoverListItem } from '@/modules/content';

// Display large article card
<LargeCoverItem article={article} />

// Display compact list item
<SmallCoverListItem article={article} />

// Use locked content
import { PartitionalLockedContent } from '@/modules/content';

<PartitionalLockedContent locked={true}>
  <p>This content is partially hidden</p>
</PartitionalLockedContent>

// Access content types
import type { ArticleSearchResult } from '@/modules/content';

const results: ArticleSearchResult = await searchArticles(query);
```

## Service Configuration

The `AppArticleService` is pre-configured with:
- Asset path: `/assets/articles/`
- Article URL pattern: `/articles/{slug}`
