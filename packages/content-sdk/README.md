# @maw/content-sdk

The official Content SDK for **The Most Annoying Website**.

This package provides strongly-typed Zod schemas, TypeScript types, and endpoint descriptors generated directly from the remote Headless Content API OpenAPI/Swagger specification (`https://content.themostannoyingwebsite.com/docs/json`).

It replaces `@maw/content-api` as content data is migrated to a standalone headless repository.

---

## 📦 Features

- **Zod Schemas**: Full runtime schema validation for articles, pages, tags, images, parameters, and error responses.
- **Inferred TypeScript Types**: Zero-maintenance static types generated from Zod schemas (`Language`, `ArticleItem`, `ArticleDetail`, `PageItem`, etc.).
- **OpenAPI Contract Types**: Full TypeScript OpenAPI `paths` definitions generated via `openapi-typescript`.
- **Swagger Generator Task**: Single-command codegen that fetches the live Swagger/OpenAPI spec, updates local cache, and regenerates types and schemas.
- **Offline Resilient**: Generator automatically falls back to cached `spec/openapi.json` if the network is unavailable.

---

## 🚀 Usage

```typescript
import {
  ArticleItemSchema,
  ArticleDetailSchema,
  GetArticlesQuerySchema,
  type ArticleItem,
  type ArticleDetail,
  type GetArticlesQuery,
  ENDPOINTS,
} from '@maw/content-sdk';

// Validate query parameters with defaults
const query: GetArticlesQuery = GetArticlesQuerySchema.parse({
  lang: 'en',
  limit: 10,
});

// Validate article payload
const article: ArticleItem = ArticleItemSchema.parse(rawApiData);
```

You can also import directly from subpath exports:

```typescript
import { ArticleItemSchema } from '@maw/content-sdk/schemas';
import type { ArticleItem, paths } from '@maw/content-sdk/types';
```

---

## 🛠️ Code Generation

To fetch the latest Swagger/OpenAPI JSON and regenerate types and Zod schemas:

```bash
# Using pnpm in package
pnpm generate

# Or from workspace root
pnpm --filter @maw/content-sdk generate
```

### Options & Environment Variables

- `CONTENT_API_SPEC_URL`: Override the remote Swagger JSON endpoint.
- `--url <url>`: CLI flag to specify a custom OpenAPI spec URL.
- `--spec <path>`: CLI flag to specify the local spec file path (defaults to `./spec/openapi.json`).
- `--output <dir>`: CLI flag to specify the output directory for generated files.
- `--no-fetch`: Skip network fetch and build strictly from cached `spec/openapi.json`.

---

## 🧪 Testing & Validation

```bash
pnpm --filter @maw/content-sdk test
pnpm --filter @maw/content-sdk check-types
pnpm --filter @maw/content-sdk lint
```
