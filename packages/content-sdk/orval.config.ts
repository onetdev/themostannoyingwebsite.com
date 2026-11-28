import { defineConfig } from 'orval';

/**
 * OpenAPI spec the client is generated from.
 *
 * Defaults to the deployed dev Content API, which is the source of truth for
 * in-progress contract changes. Production lags behind it, so generating from
 * production would silently drop endpoints and fields that the app already
 * consumes. Override with `CONTENT_OPENAPI_URL` to target a local `pnpm dev`
 * server (e.g. `http://localhost:3012/docs/json`) or production explicitly.
 */
const openApiUrl =
  process.env.CONTENT_OPENAPI_URL ??
  'https://dev.api.themostannoyingwebsite.com/docs/json';

export default defineConfig({
  contentSdk: {
    input: {
      target: openApiUrl,
      unsafeDisableValidation: false,
    },
    output: {
      target: './src/generated/endpoints.ts',
      client: 'zod',
      formatter: 'biome',
      override: {
        zod: {
          generateReusableSchemas: true,
          generateCompanionTypes: true,
        },
      },
    },
  },
});
