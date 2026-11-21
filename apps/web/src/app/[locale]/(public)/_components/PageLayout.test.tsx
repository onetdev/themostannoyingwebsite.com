/**
 * @jest-environment jsdom
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { PageLayout } from './PageLayout';

jest.mock('./AppHeader', () => ({ AppHeader: () => null }));
jest.mock('./AppFooter', () => ({ AppFooter: () => null }));
jest.mock('@/features/monitoring/components', () => ({
  ReportRouteVisit: () => null,
}));

describe('PageLayout', () => {
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
