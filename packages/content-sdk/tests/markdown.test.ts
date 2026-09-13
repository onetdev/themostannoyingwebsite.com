import { renderMarkdown } from '../src/helpers/markdown';

describe('Markdown Helper', () => {
  it('renders markdown to sanitized HTML', () => {
    const raw = '# Hello World\n\nThis is **bold** and *italic*.';
    const html = renderMarkdown(raw);
    expect(html).toContain('<h1>Hello World</h1>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<em>italic</em>');
  });

  it('renders tables wrapped in div.table-container', () => {
    const tableMd = '| Col1 | Col2 |\n|---|---|\n| Val1 | Val2 |';
    const html = renderMarkdown(tableMd);
    expect(html).toContain('<div class="table-container">');
    expect(html).toContain('<table>');
    expect(html).toContain('<th>Col1</th>');
    expect(html).toContain('<td>Val1</td>');
  });

  it('sanitizes dangerous tags like script', () => {
    const malicious =
      '# Title\n\n<script>alert("xss")</script><p>Clean text</p>';
    const html = renderMarkdown(malicious);
    expect(html).not.toContain('<script>');
    expect(html).toContain('Clean text');
  });

  it('handles empty or blank input', () => {
    expect(renderMarkdown('')).toBe('');
  });

  it('supports disabling sanitization if requested', () => {
    const custom = '<span data-custom="test">Content</span>';
    const html = renderMarkdown(custom, { sanitize: false });
    expect(html).toContain('data-custom="test"');
  });

  it('renders inline markdown without wrapping in block elements', () => {
    const inlineRaw = 'THE **INTERNET** IS BROKEN: 4 Brain-Melting Memes';
    const html = renderMarkdown(inlineRaw, { inline: true });
    expect(html).toBe(
      'THE <strong>INTERNET</strong> IS BROKEN: 4 Brain-Melting Memes',
    );
    expect(html).not.toContain('<p>');
  });
});
