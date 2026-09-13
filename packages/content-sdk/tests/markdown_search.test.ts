import { renderMarkdown } from '../src/helpers/markdown';
import {
  createSearchSnippet,
  formatSearchHighlight,
  stripMarkdown,
} from '../src/helpers/search';

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
});

describe('Search & Text Helpers', () => {
  describe('stripMarkdown', () => {
    it('strips headers, bold, links, and code blocks', () => {
      const md =
        '# Header\n\nSome **bold** text and [a link](https://example.com) with `code`.';
      const plain = stripMarkdown(md);
      expect(plain).toBe('Header Some bold text and a link with code.');
    });

    it('handles empty input', () => {
      expect(stripMarkdown('')).toBe('');
    });
  });

  describe('createSearchSnippet', () => {
    const sampleText =
      'In the heart of the MAW Corporation advanced research facility, quantum computing meets artificial intelligence. We explore the 20-year roadmap towards general intelligence.';

    it('highlights matching query term', () => {
      const snippet = createSearchSnippet(sampleText, 'quantum');
      expect(snippet).toContain('<mark>quantum</mark>');
    });

    it('falls back cleanly when query is missing or not found', () => {
      const snippetEmpty = createSearchSnippet(sampleText);
      expect(snippetEmpty).toContain('In the heart of');

      const snippetNotFound = createSearchSnippet(sampleText, 'banana');
      expect(snippetNotFound).toContain('In the heart of');
    });

    it('respects maxLength and wraps with ellipsis if truncated', () => {
      const longText = `Start ${'word '.repeat(50)}quantum ${'end '.repeat(50)}`;
      const snippet = createSearchSnippet(longText, 'quantum', {
        maxLength: 60,
      });
      expect(snippet).toContain('<mark>quantum</mark>');
      expect(snippet).toContain('...');
    });
  });

  describe('formatSearchHighlight', () => {
    it('converts markdown bold highlights to mark tags by default', () => {
      const text =
        'THE **INTERNET** IS BROKEN: 4 Brain-Melting Memes Driving the Entire **Internet** Insane';
      expect(formatSearchHighlight(text)).toBe(
        'THE <mark>INTERNET</mark> IS BROKEN: 4 Brain-Melting Memes Driving the Entire <mark>Internet</mark> Insane',
      );
    });

    it('supports custom HTML tags', () => {
      const text = 'Here is **highlighted** text';
      expect(formatSearchHighlight(text, 'strong')).toBe(
        'Here is <strong>highlighted</strong> text',
      );
    });

    it('handles empty input gracefully', () => {
      expect(formatSearchHighlight('')).toBe('');
    });
  });
});
