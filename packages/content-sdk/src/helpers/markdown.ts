import {
  parse as markedParse,
  parseInline as markedParseInline,
  Renderer,
  type Tokens,
} from 'marked';
import sanitizeHtml from 'sanitize-html';

export interface RenderMarkdownOptions {
  /**
   * Whether to sanitize the rendered HTML to prevent XSS.
   * @default true
   */
  sanitize?: boolean;
  /**
   * Optional custom sanitize-html configuration options.
   */
  sanitizeOptions?: sanitizeHtml.IOptions;
  /**
   * Whether to render inline tokens only, without wrapping block elements like <p>.
   * @default false
   */
  inline?: boolean;
}

const defaultSanitizeOptions: sanitizeHtml.IOptions = {
  ...sanitizeHtml.defaults,
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'img',
    'mark',
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class', 'id', 'data-*'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
    a: ['href', 'name', 'target', 'rel'],
  },
};

/** Cells of a single Markdown table row (header row or body row). */
type TableCells = Tokens.Table['header'];

/**
 * Renders a single row of table cells to HTML through the supplied renderer.
 * Extracted so the per-cell iteration is independently testable.
 */
export function renderTableCells(
  cells: TableCells,
  renderer: Renderer,
): string {
  return cells.reduce((acc, cell) => acc + renderer.tablecell(cell), '');
}

/**
 * Renders raw Markdown into sanitized HTML, with custom responsive table wrapper.
 */
export function renderMarkdown(
  raw: string,
  options?: RenderMarkdownOptions,
): string {
  if (!raw) {
    return '';
  }

  const renderer = new Renderer();

  renderer.table = (token: Tokens.Table): string => {
    const header = renderer.tablerow({
      text: renderTableCells(token.header, renderer),
    });

    const body = token.rows
      .map((row) =>
        renderer.tablerow({
          text: row ? renderTableCells(row, renderer) : '',
        }),
      )
      .join('');

    const bodyHtml = body ? `<tbody>${body}</tbody>` : '';

    return `<div class="table-container">\n<table>\n<thead>\n${header}\n</thead>\n${bodyHtml}\n</table></div>`;
  };

  const html = (
    options?.inline
      ? markedParseInline(raw, { async: false })
      : markedParse(raw, { renderer, async: false })
  ) as string;

  const shouldSanitize = options?.sanitize ?? true;
  if (shouldSanitize) {
    return sanitizeHtml(
      html,
      options?.sanitizeOptions ?? defaultSanitizeOptions,
    );
  }

  return html;
}
