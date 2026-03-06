# Static Article Store

This package currently acts as a temporary asset store for articles. Once the volume of content becomes a bottleneck, it will be replaced by a proper headless CMS solution.

## Usage

Indexes must be generated for both production and development builds:
```bash
pnpm run build:index
```

To enable JSON schema support in VS Code, run:
```bash
pnpm run build:schema
```

## How to add a new article

Create a folder following this naming pattern:

`{lang-code}-{article-id}-{title-slug}`

- `lang-code`: A supported 2-character locale code.
- `article-id`: An incremental numeric ID.
- `title-slug`: The URL-friendly version of the title.

Inside this folder, create a `data.yml` file containing the article's metadata. Date/time must follow the ISO 8601 format.

```yaml
title: The title of an article
intro: A brief introduction for the article.
publishedAt: 2024-10-10T14:49:00Z
contentFormat: markdown # options: markdown | html (default is markdown)
coverImage: my-article-cover.webp
content: |
  Intro paragraph.

  ### A little header

  Another paragraph.
```

If you specify a `coverImage`, the file must exist in the `data/assets` directory. Thumbnails will be automatically generated during the index build process.

## Managing front page and highlights

To manage featured content, edit (or create) `{lang-code}-meta.json` and add the corresponding folder names:

```json
{
  "on-cover": [
    "en-666-your-article-slug"
  ],
  "highlighted": [
    "en-666-your-article-slug"
  ]
}
```
