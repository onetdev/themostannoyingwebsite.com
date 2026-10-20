import { buildAuthor } from './author';

const baseUrl = 'https://example.com';

type Record_ = Record<string, unknown>;
const asRecord = (value: unknown): Record_ => value as Record_;
const getArray = (value: unknown): Record_[] => value as Record_[];

describe('buildAuthor', () => {
  it('builds a ProfilePage with a Person main entity', () => {
    const page = buildAuthor({
      baseUrl,
      locale: 'en',
      path: 'authors/jane',
      name: 'Jane',
      persona: 'The Tester',
      about: 'Bio',
    });

    expect(page['@type']).toBe('ProfilePage');
    expect(page['@id']).toBe('https://example.com/en/authors/jane/');
    expect(page.url).toBe('https://example.com/en/authors/jane/');
    expect(page.isPartOf).toEqual({ '@id': 'https://example.com/en/#website' });
    expect(page.description).toBe('Bio');

    const person = asRecord(page.mainEntity);
    expect(person['@type']).toBe('Person');
    expect(person.name).toBe('Jane');
    expect(person.jobTitle).toBe('The Tester');
    expect(person.description).toBe('Bio');
    expect(person['@id']).toBe('https://example.com/en/authors/jane/#person');
  });

  it('attaches articles as hasPart referencing the person', () => {
    const page = buildAuthor({
      baseUrl,
      locale: 'hu',
      path: 'authors/jane',
      name: 'Jane',
      articles: [
        {
          path: 'articles/one',
          headline: 'One',
          datePublished: '2026-01-01T00:00:00.000Z',
        },
      ],
    });

    const parts = getArray(page.hasPart);
    expect(parts).toHaveLength(1);
    expect(parts[0]).toMatchObject({
      '@type': 'BlogPosting',
      '@id': 'https://example.com/hu/articles/one/',
      url: 'https://example.com/hu/articles/one/',
      headline: 'One',
      author: { '@id': 'https://example.com/hu/authors/jane/#person' },
    });
  });

  it('omits hasPart when there are no articles', () => {
    const page = buildAuthor({
      baseUrl,
      locale: 'en',
      path: 'authors/jane',
      name: 'Jane',
    });

    expect(page.hasPart).toBeUndefined();
  });
});
