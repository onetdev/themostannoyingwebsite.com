# @maw/content-sdk

The official Content SDK for **The Most Annoying Website**.

This package provides a strongly-typed HTTP client powered by **`ky`**, with full runtime Zod validation and companion TypeScript types generated from the remote Headless Content API OpenAPI/Swagger specification (`https://content.themostannoyingwebsite.com/docs/json`).

---

## 📦 Features

- **Resource-Oriented Client**: Ergonomic namespaces: `client.articles`, `client.pages`, `client.tags`, `client.images`, `client.health`.
- **Ky HTTP Engine**: Built-in prefix URL handling, automatic query serialization, timeouts, and configurable exponential retry.
- **Next.js App Router Compatible**: Pass Next.js fetch options (`next: { revalidate, tags }`, `cache`) directly in request options.
- **Typed Error Hierarchy**: Automatic translation of OpenAPI error responses into `ContentApiNotFoundError`, `ContentApiValidationError`, `ContentApiCorsError`, `ContentApiServerError`.
- **Runtime Zod Validation**: Responses are validated at runtime against generated Zod schemas.
- **Image Variant Helpers**: Utilities to select default or best resolution/format image variants (`getDefaultImageVariant`, `getBestImageVariant`, `getImageVariantUrl`).
- **Swagger Code Generation**: Powered by **Orval** (`pnpm generate`).

---

## 🚀 Quick Start

### Instantiating the Client

```typescript
import { ContentApiClient, createContentClient } from '@maw/content-sdk';

// Default configuration (points to https://content.themostannoyingwebsite.com)
const client = createContentClient();

// Or with custom options
const customClient = new ContentApiClient({
  baseUrl: 'https://content.themostannoyingwebsite.com',
  timeoutMs: 10_000,
  retry: 2,
  headers: {
    'X-Client-Id': 'web-app',
  },
});
```

---

## 📖 API Usage

### Articles

```typescript
// List articles with query parameters
const { items, total } = await client.articles.list({
  lang: 'en',
  limit: 10,
  offset: 0,
  is_featured: true,
  tag: 'tech',
  q: 'annoying',
});

// Fetch article by slug (includes available translation alternates)
const article = await client.articles.getBySlug('how-to-win-every-argument', {
  lang: 'en',
});

console.log(article.title);
console.log(article.translations); // [{ lang: 'de', slug: '...', title: '...' }]
```

### Pages

```typescript
// List static pages
const pages = await client.pages.list({ lang: 'en' });

// Get static page by slug
const page = await client.pages.getBySlug('privacy-policy', { lang: 'en' });
```

### Tags & Images

```typescript
// List tag taxonomy with counts
const tags = await client.tags.list({ lang: 'en' });

// List image assets and responsive dimensions
const images = await client.images.list({ limit: 20 });
```

### Health Check

```typescript
// Basic root health
const health = await client.health.check();

// Detailed v1 API & database health
const apiHealth = await client.health.apiCheck();
```

---

## 🖼️ Image Helpers

```typescript
import {
  getDefaultImageVariant,
  getBestImageVariant,
  getImageVariantUrl,
} from '@maw/content-sdk';

const featuredImage = article.featured_image;

// Get the default variant marked by the API
const defaultVariant = getDefaultImageVariant(featuredImage);

// Get the best variant matching criteria (e.g. format, min/max width)
const highResAvif = getBestImageVariant(featuredImage, {
  minWidth: 1200,
  format: 'avif',
});

// Directly get a variant URL
const bannerUrl = getImageVariantUrl(featuredImage, 'lg');
```

---

## ⚠️ Error Handling

Errors returned by the remote Content API are automatically parsed into typed exception classes:

```typescript
import {
  ContentApiError,
  ContentApiNotFoundError,
  ContentApiValidationError,
  ContentApiCorsError,
  ContentApiServerError,
} from '@maw/content-sdk';

try {
  const article = await client.articles.getBySlug('non-existent');
} catch (error) {
  if (error instanceof ContentApiNotFoundError) {
    console.error('Article not found (404):', error.message);
  } else if (error instanceof ContentApiValidationError) {
    console.error('Invalid request params (400):', error.zodIssues);
  } else if (error instanceof ContentApiServerError) {
    console.error('Server error (5xx):', error.status, error.message);
  } else if (error instanceof ContentApiError) {
    console.error('Content API error:', error.code, error.message);
  }
}
```

---

## 🛠️ Code Generation

To fetch the latest OpenAPI JSON from the remote server and regenerate Zod schemas:

```bash
pnpm --filter @maw/content-sdk generate
```

---

## 🧪 Testing

```bash
pnpm --filter @maw/content-sdk test
pnpm --filter @maw/content-sdk check-types
pnpm --filter @maw/content-sdk lint
```
