import { parse as markedParse, Renderer, type Tokens } from 'marked';
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
    let header = '';
    let cell = '';

    for (let j = 0; j < token.header.length; j++) {
      cell += renderer.tablecell(token.header[j]);
    }
    header += renderer.tablerow({ text: cell });

    let body = '';
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];
      if (!row) {
        body += renderer.tablerow({ text: '' });
        continue;
      }

      cell = '';
      for (let k = 0; k < row.length; k++) {
        cell += renderer.tablecell(row[k]);
      }
      body += renderer.tablerow({ text: cell });
    }

    if (body) {
      body = `<tbody>${body}</tbody>`;
    }

    return `<div class="table-container">\n<table>\n<thead>\n${header}\n</thead>\n${body}\n</table></div>`;
  };

  const html = markedParse(raw, { renderer, async: false }) as string;

  const shouldSanitize = options?.sanitize ?? true;
  if (shouldSanitize) {
    return sanitizeHtml(
      html,
      options?.sanitizeOptions ?? defaultSanitizeOptions,
    );
  }

  return html;
}
