import { bucketLength, safePath, sanitizeProps, scrubMessage } from './redact';

describe('redact', () => {
  it('scrubs emails, urls and secrets from free-form messages', () => {
    expect(
      scrubMessage(
        'Login failed for jane.doe@example.com via https://site.test/?token=abc with password=hunter2',
      ),
    ).toBe('Login failed for [email] via [url] with password=[redacted]');
  });

  it('scrubs phone numbers without mangling date-like identifiers', () => {
    expect(scrubMessage('Call +36 30 123 4567 now')).toBe('Call [number] now');
    expect(scrubMessage('Call 555-123-4567 now')).toBe('Call [number] now');
    // Slugs and ids must survive: they are identities, not phone numbers.
    expect(scrubMessage('article-2024-10-23')).toBe('article-2024-10-23');
    expect(scrubMessage('2024-10-23')).toBe('2024-10-23');
    expect(scrubMessage('version-1234-5678')).toBe('version-1234-5678');
  });

  it('reduces urls and paths to their pathname', () => {
    expect(safePath('https://site.test/en/search/?q=secret#x')).toBe(
      '/en/search/',
    );
    expect(safePath('/en/articles/?q=secret')).toBe('/en/articles/');
    expect(safePath('')).toBe('/');
  });

  it('buckets input lengths coarsely', () => {
    expect(bucketLength(0)).toBe('0');
    expect(bucketLength(2)).toBe('1-2');
    expect(bucketLength(4)).toBe('3-5');
    expect(bucketLength(7)).toBe('6-10');
    expect(bucketLength(20)).toBe('11-25');
    expect(bucketLength(100)).toBe('26+');
  });

  it('drops sensitive and non-primitive props', () => {
    expect(
      sanitizeProps({
        field: 'email',
        value: 'jane@example.com',
        password: 'hunter2',
        query: 'secret',
        count: 2,
        ok: true,
        missing: null,
        nested: { a: 1 },
      }),
    ).toEqual({ field: 'email', count: 2, ok: true });
  });

  it('truncates long strings', () => {
    const long = 'a'.repeat(500);
    const result = sanitizeProps({ message: long }).message;
    expect(typeof result).toBe('string');
    expect((result as string).length).toBeLessThanOrEqual(120);
  });
});
