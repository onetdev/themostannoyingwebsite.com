import { createContentClient } from '@maw/content-sdk';
import { createAppContentClient } from './client';

jest.mock('@maw/content-sdk', () => ({
  createContentClient: jest.fn(() => ({})),
}));

const createContentClientMock = jest.mocked(createContentClient);

describe('createAppContentClient', () => {
  beforeEach(() => {
    createContentClientMock.mockClear();
  });

  it('delegates to the SDK factory without forcing a base URL', () => {
    createAppContentClient();

    expect(createContentClientMock).toHaveBeenCalledWith(undefined);
  });

  it('passes client options through to the SDK factory', () => {
    const options = {
      baseUrl: 'https://dev.api.themostannoyingwebsite.com',
      timeoutMs: 5_000,
    };

    createAppContentClient(options);

    expect(createContentClientMock).toHaveBeenCalledWith(options);
  });
});
