import {
  type ContentClientOptions,
  createContentClient,
} from '@maw/content-sdk';

/**
 * Creates the app's canonical Content API client.
 *
 * Browser and server requests both call the Content API directly. During local
 * development the browser must be served from an allowlisted
 * `*.themostannoyingwebsite.com` origin (for example
 * `local.themostannoyingwebsite.com`), because the deployed Content API rejects
 * `localhost` and `127.0.0.1`.
 */
export function createAppContentClient(options?: ContentClientOptions) {
  return createContentClient(options);
}
