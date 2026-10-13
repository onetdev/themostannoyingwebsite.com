export type AuthorStaticParam = {
  slug: string;
  locale: string;
};

/**
 * Builds the `(slug, locale)` pairs for every author profile, one entry per
 * configured locale. Extracted so the cartesian iteration is independently
 * testable (`generateStaticParams` is not exported for unit testing).
 */
export function buildAuthorStaticParams(
  locales: readonly string[],
  authors: ReadonlyArray<{ slug: string }>,
): AuthorStaticParam[] {
  return locales.flatMap((locale) =>
    authors.map((author) => ({ slug: author.slug, locale })),
  );
}
