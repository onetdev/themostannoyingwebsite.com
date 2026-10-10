import { renderToStaticMarkup } from 'react-dom/server';
import { DocumentPage } from './DocumentPage';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('DocumentPage', () => {
  it('renders the headline, meta line and content column', () => {
    const html = renderToStaticMarkup(
      <DocumentPage title="Terms of Use" meta={<time>2026-03-09</time>}>
        <p>Body copy</p>
      </DocumentPage>,
    );

    expect(html).toContain('Terms of Use');
    expect(html).toContain('2026-03-09');
    expect(html).toContain('Body copy');
    expect(html).toContain('data-document-content');
  });

  it('omits the meta line when none is provided', () => {
    const html = renderToStaticMarkup(
      <DocumentPage title="About">
        <p>Body copy</p>
      </DocumentPage>,
    );

    expect(html).not.toContain('<time');
    expect(html).toContain('Body copy');
  });
});
