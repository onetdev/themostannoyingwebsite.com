import { contentPoolQueryKey } from './content-pool-query';

describe('contentPoolQueryKey', () => {
  it('builds a stable key from the language and pool type', () => {
    expect(contentPoolQueryKey('en', 'names')).toEqual([
      'content-pools',
      'en',
      'names',
    ]);
  });

  it('keys dedicated resources separately from string pools', () => {
    expect(contentPoolQueryKey('en', 'survey')).toEqual([
      'content-pools',
      'en',
      'survey',
    ]);
  });
});
