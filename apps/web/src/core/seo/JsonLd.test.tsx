import { renderToStaticMarkup } from 'react-dom/server';
import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('renders an application/ld+json script', () => {
    const html = renderToStaticMarkup(
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Thing',
          name: 'Example',
        }}
      />,
    );

    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@type":"Thing"');
  });

  it('escapes angle brackets to prevent script injection', () => {
    const html = renderToStaticMarkup(
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Thing',
          name: '</script><script>alert(1)</script>',
        }}
      />,
    );

    expect(html).not.toContain('</script><script>alert(1)</script>');
    expect(html).toContain('\\u003c');
  });

  it('wraps arrays into a @graph with a single @context', () => {
    const html = renderToStaticMarkup(
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'Thing' },
          { '@context': 'https://schema.org', '@type': 'Thing' },
        ]}
      />,
    );

    expect(html).toContain('"@graph"');
    // Nested `@context` keys are stripped so the graph carries exactly one.
    expect(html.match(/"@context"/g)).toHaveLength(1);
  });
});
