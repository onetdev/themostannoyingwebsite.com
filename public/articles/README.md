# Static article store

This folder contains all the assets for the articles - for now, temporarily. Once we have a proper content backend, this will disappear.

**IMPORTANT***: Since we need a few index data to be generated, `pnpm run gen-article-index` must be run for dist and dev builds.

## How to add new article?

Create a folder that has the following naming pattern:

`{lang-code}-{article-id}-{title-slug}`

- `lang-code` should be a supported locale code, 2 chars long
- `article-id` incremental number
- `title-slug` will be displayed in the URL when user opens an article

Within this folder, you will need to create `meta.json` which will contain the most important info about certain article. Date time format must be in ISO-8601.

```json
{
  "title": "The title of an article",
  "language": "en",
  "intro": "Simple intro for the article",
  "dateTime": "2024-10-10T14:49:00+0",
}
```

You'll also need to create a `content.html` which will be loaded for the article when opened, should be something like this:

```html
<p>
  Any multiline article
</p>
```

And lastly, you can optionally (but strongly recommended) a `cover.jpg` file that will represent your article.

## How to manage front page and article highlights

You only need to edit (or create) `{lang-code}-meta.json` and add folder names to the relevant part.

```json
{
  "on-cover": [
    "en-666-your-article-slug"
  ],
  "highlighted": [
    "en-666-your-article-slug"
  ],
}
```
