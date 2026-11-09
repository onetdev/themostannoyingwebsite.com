import { renderToStaticMarkup } from 'react-dom/server';
import { FooterArtwork } from './FooterArtwork';

describe('FooterArtwork', () => {
  const render = () => renderToStaticMarkup(<FooterArtwork />);

  it('renders a decorative scene background', () => {
    const html = render();

    expect(html).toContain('data-testid="footer-artwork"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('data-artwork-state="idle"');
    expect(html).toContain('footer-artwork');
  });

  it('renders the shader canvas above a complete static fallback', () => {
    const html = render();

    expect(html).toContain('footer-artwork-fallback');
    expect(html).toContain('<canvas');
    expect(html).toContain('footer-artwork-canvas');

    expect(html.indexOf('footer-artwork-fallback')).toBeLessThan(
      html.indexOf('<canvas'),
    );
  });

  it('renders the dev-only display FPS chip', () => {
    const html = render();

    expect(html).toContain('footer-artwork-fps');
    expect(html).toContain('fps');
  });

  it('carries no legacy card layers', () => {
    const html = render();

    expect(html).not.toContain('panel-');
    expect(html).not.toContain('polariscope');
  });

  it('is deterministic across renders', () => {
    expect(render()).toBe(render());
  });
});
