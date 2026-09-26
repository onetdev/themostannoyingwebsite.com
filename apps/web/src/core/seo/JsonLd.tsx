import type { Graph, Thing, WithContext } from 'schema-dts';

export type JsonLdNode = WithContext<Thing> | Thing;

export interface JsonLdProps {
  /**
   * A single structured data node, a ready-made graph, or multiple nodes that
   * will be wrapped into a `@graph`.
   */
  data: Graph | JsonLdNode | readonly JsonLdNode[];
}

const JSON_LD_CONTEXT = 'https://schema.org';

/**
 * Renders a JSON-LD `<script>` tag.
 *
 * Uses a native script tag (not `next/script`) as recommended by the Next.js
 * JSON-LD guide, and escapes `<` to `\u003c` to prevent XSS via injected
 * strings in the structured data payload.
 */
export function JsonLd({ data }: JsonLdProps) {
  const input: unknown = data;
  const payload: unknown = Array.isArray(input)
    ? { '@context': JSON_LD_CONTEXT, '@graph': input }
    : input;

  const serialized = JSON.stringify(payload).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
