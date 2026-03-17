# ADR 7: Hybrid Internationalization Structure

## Status
Accepted

## Context
The application supports multiple languages and requires large amounts of "variant" data (e.g., hundreds of fake names or comment templates) for its annoying features. Loading these large arrays into the main UI translation bundle increases the initial load time and degrades performance.

## Decision
We will implement a hybrid structure for `next-intl` translation files:

1.  **Single File Pattern**: For simple features, use `i18n/{locale}.ts`.
2.  **Directory Pattern**: For complex features or global messages, use `i18n/{locale}/` containing an `index.ts` and a `variants.ts`.

**Variants Policy**: Large arrays or complex shapes intended for direct use in Services (via dynamic imports) MUST be placed in `variants.ts`. This allows Services to load only the data they need for a specific locale without pulling in the entire UI translation dictionary.

## Consequences
- **Pros**: Optimized bundle sizes, clear separation between UI labels and "content data," faster service-side lookups.
- **Cons**: Slight inconsistency in folder depth (some features have files, others have folders), though this is mitigated by TypeScript's path resolution.
