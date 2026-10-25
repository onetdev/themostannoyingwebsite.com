import { renderToStaticMarkup } from 'react-dom/server';
import { FooterArtwork } from './FooterArtwork';

describe('FooterArtwork', () => {
  it('renders a decorative, non-interactive pile', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);

    expect(html).toContain('data-testid="footer-artwork"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('panel-pile');
  });

  it('renders twenty squares in bell-curve columns', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);

    expect(html.match(/class="panel-cell"/g) ?? []).toHaveLength(20);
    expect(
      html.match(/data-testid="footer-artwork-column"/g) ?? [],
    ).toHaveLength(8);
    expect(html.match(/class="panel-column"/g) ?? []).toHaveLength(8);
  });

  it('inlines the computed resting colours on every square', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);

    expect(html.match(/--panel-c1:rgb\(/g) ?? []).toHaveLength(20);
    expect(html.match(/--panel-c2:rgb\(/g) ?? []).toHaveLength(20);
  });

  it('is deterministic across renders', () => {
    expect(renderToStaticMarkup(<FooterArtwork />)).toBe(
      renderToStaticMarkup(<FooterArtwork />),
    );
  });

  it('carries no plate image or blend layers', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);

    expect(html).not.toContain('footer-artwork-bg');
    expect(html).not.toContain('data:image/svg+xml');
    expect(html).not.toContain('panel-glow');
    expect(html).not.toContain('panel-vignette');
  });
});
