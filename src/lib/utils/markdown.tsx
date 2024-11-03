import { parse as markedParse, Renderer, type Tokens } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const parse = (raw: string, opts?: { sanitize: boolean }) => {
  const renderer = new Renderer();

  // https://github.com/markedjs/marked/blob/9b02e47/src/Renderer.ts#L111
  renderer.table = (token: Tokens.Table): string => {
    let header = '';

    // header
    let cell = '';
    for (let j = 0; j < token.header.length; j++) {
      cell += renderer.tablecell(token.header[j]);
    }
    header += renderer.tablerow({ text: cell });

    let body = '';
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];

      cell = '';
      for (let k = 0; k < row.length; k++) {
        cell += renderer.tablecell(row[k]);
      }

      body += renderer.tablerow({ text: cell });
    }

    if (body) body = `<tbody>${body}</tbody>`;

    return `<div class="table-container">\n<table>\n<thead>\n${header}\n</thead>\n${body}\n</table></div>`;
  };

  const results = markedParse(raw, { renderer, async: false });

  if (opts?.sanitize === true) {
    return sanitizeHtml(results);
  }

  return results;
};
