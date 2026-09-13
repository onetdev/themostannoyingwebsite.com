export interface SearchSnippetOptions {
  /**
   * Maximum length of the returned snippet string.
   * @default 200
   */
  maxLength?: number;
  /**
   * Tag to wrap matching query terms with.
   * @default 'mark'
   */
  highlightTag?: string;
}

/**
 * Strips markdown syntax elements to produce plain readable text.
 */
export function stripMarkdown(markdown: string): string {
  if (!markdown) {
    return '';
  }

  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // Images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // Links
    .replace(/^#{1,6}\s+(.+)$/gm, '$1') // Headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Italic
    .replace(/~~(.*?)~~/g, '$1') // Strikethrough
    .replace(/`{3}[\s\S]*?`{3}/g, '') // Code blocks
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/^>\s+(.+)$/gm, '$1') // Blockquotes
    .replace(/^[-*+]\s+/gm, '') // Unordered lists
    .replace(/^\d+\.\s+/gm, '') // Ordered lists
    .replace(/\r?\n|\r/g, ' ') // Newlines to spaces
    .replace(/\s+/g, ' ') // Multiple spaces to single
    .trim();
}

/**
 * Creates an excerpt snippet with highlighted keywords around the first match.
 */
export function createSearchSnippet(
  content: string,
  query?: string,
  options?: SearchSnippetOptions,
): string {
  const plainText = stripMarkdown(content);
  const maxLength = options?.maxLength ?? 200;
  const tag = options?.highlightTag ?? 'mark';

  if (!plainText) {
    return '';
  }

  const trimmedQuery = query?.trim() ?? '';
  if (!trimmedQuery) {
    return plainText.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
  }

  const queryRegex = new RegExp(
    trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'i',
  );
  const matchIndex = plainText.search(queryRegex);

  if (matchIndex === -1) {
    return plainText.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
  }

  // Calculate slice boundaries to center around the matched query
  const matchLength = trimmedQuery.length;
  const contextBefore = Math.floor((maxLength - matchLength) / 2);

  let start = Math.max(0, matchIndex - contextBefore);
  let end = Math.min(plainText.length, start + maxLength);

  // Adjust start if end hit the boundary
  if (end - start < maxLength && start > 0) {
    start = Math.max(0, end - maxLength);
  }

  // Adjust to clean word boundary if possible
  if (start > 0) {
    const spaceIndex = plainText.indexOf(' ', start);
    if (spaceIndex !== -1 && spaceIndex < matchIndex) {
      start = spaceIndex + 1;
    }
  }
  if (end < plainText.length) {
    const spaceIndex = plainText.lastIndexOf(' ', end);
    if (spaceIndex !== -1 && spaceIndex > matchIndex + matchLength) {
      end = spaceIndex;
    }
  }

  let snippet = plainText.slice(start, end);
  if (start > 0) {
    snippet = `...${snippet}`;
  }
  if (end < plainText.length) {
    snippet = `${snippet}...`;
  }

  // Highlight all occurrences in the snippet
  const highlightRegex = new RegExp(
    `(${trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  return snippet.replace(highlightRegex, `<${tag}>$1</${tag}>`);
}
