/**
 * @jest-environment jsdom
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { PageLayout } from './PageLayout';

jest.mock('./AppHeader', () => ({ AppHeader: () => null }));
jest.mock('./AppFooter', () => ({
  AppFooter: () => <footer data-testid="app-footer" />,
}));
jest.mock('./FooterArtwork/FooterArtwork', () => ({
  FooterArtwork: () => <div data-testid="footer-artwork" />,
}));
jest.mock('@/features/monitoring/components', () => ({
  ReportRouteVisit: () => null,
}));

describe('PageLayout', () => {
  it('renders the footer artwork below the page content', () => {
    const html = renderToStaticMarkup(
      <PageLayout route="home">
        <p>Body copy</p>
      </PageLayout>,
    );

    expect(html.indexOf('data-testid="footer-artwork"')).toBeGreaterThan(
      html.indexOf('</main>'),
    );
  });

  it('renders the artwork below the footer content', () => {
    const html = renderToStaticMarkup(
      <PageLayout route="home">
        <p>Body copy</p>
      </PageLayout>,
    );

    expect(html.indexOf('data-testid="footer-artwork"')).toBeGreaterThan(
      html.indexOf('data-testid="app-footer"'),
    );
  });

  it('publishes the route alias for telemetry envelopes', () => {
    const html = renderToStaticMarkup(
      <PageLayout route="home">
        <p>Body copy</p>
      </PageLayout>,
    );

    expect(html).toContain('data-route-alias="home"');
  });

  it('omits the alias when the page does not declare a route', () => {
    const html = renderToStaticMarkup(
      <PageLayout>
        <p>Body copy</p>
      </PageLayout>,
    );

    expect(html).not.toContain('data-route-alias');
  });
});
