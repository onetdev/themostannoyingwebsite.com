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

  it('samples the shared plate instead of inlining sheets', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);

    expect(html).toContain('/assets/images/footer-artwork-bg.webp');
    expect(html).not.toContain('data:image/svg+xml');
  });

  it('renders no mounting pins or blend layers', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);

    expect(html).not.toContain('panel-pins');
    expect(html).not.toContain('panel-glow');
    expect(html).not.toContain('panel-vignette');
  });
});
