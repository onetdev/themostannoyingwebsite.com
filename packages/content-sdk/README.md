# @maw/content-sdk

The official Content SDK for **The Most Annoying Website**.

This package provides a strongly-typed HTTP client powered by **`ky`**, with full runtime Zod validation and companion TypeScript types generated from the remote Headless Content API OpenAPI/Swagger specification (`https://content.themostannoyingwebsite.com/docs/json`).

---

## 📦 Features

- **Resource-Oriented Client**: Ergonomic namespaces: `client.articles`, `client.authors`, `client.pages`, `client.tags`, `client.images`, `client.health`, `client.locales`, `client.translations`, `client.pools`, `client.survey`, `client.prizeWheel`, `client.newsletter`, `client.spamSample`.
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

The base URL defaults to `https://content.themostannoyingwebsite.com` and can be
overridden with the `NEXT_PUBLIC_CONTENT_API_URL` environment variable. This
works in the browser, on the server, and in build scripts, since Next.js inlines
`NEXT_PUBLIC_*` variables at build time.

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
console.log(article.author.name); // resolved author byline (AuthorRef)
console.log(article.translations); // [{ lang: 'de', slug: '...', title: '...' }]
```

### Authors

```typescript
// List authors with their public byline, persona, and biography
const { items } = await client.authors.list({ lang: 'en', limit: 20 });

// Fetch a single author by slug
const author = await client.authors.getBySlug('rage-farmer', { lang: 'en' });

console.log(author.name, author.persona, author.about);
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

### Pools & Dedicated Content

Generic string pools are flat string arrays; structured content lives behind dedicated
resources. Both are always complete and cacheable (no pagination or randomization).

```typescript
// Catalog of available string pools, then a single pool's items
const catalog = await client.pools.getCatalog('en');
const { items: names } = await client.pools.getByType('en', 'names');

// Structured resources (stable IDs + API-supplied behavior)
const { questions } = await client.survey.getQuestions('en');
const { segments } = await client.prizeWheel.getSegments('en'); // weight + starred
const { steps } = await client.newsletter.getSteps('en');
const { samples } = await client.spamSample.list('en');
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

By default the spec is pulled from the deployed Content API. Point it at a local
`pnpm dev` server (or any other spec) without editing the config:

```bash
CONTENT_OPENAPI_URL=http://localhost:3000/docs/json \
  pnpm --filter @maw/content-sdk generate
```

---

## 🧪 Testing

```bash
pnpm --filter @maw/content-sdk test
pnpm --filter @maw/content-sdk check-types
pnpm --filter @maw/content-sdk lint
```
