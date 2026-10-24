import { renderToStaticMarkup } from 'react-dom/server';
import { FooterArtwork } from './FooterArtwork';

describe('FooterArtwork', () => {
  it('renders a decorative, non-interactive band', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);

    expect(html).toContain('data-testid="footer-artwork"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('data-testid="footer-artwork-scene"');
  });

  it('inlines the three baked tile sheets', () => {
    const html = renderToStaticMarkup(<FooterArtwork />);
    const sheets = html.match(/data:image\/svg\+xml/g) ?? [];

    expect(sheets).toHaveLength(3);
  });
});
