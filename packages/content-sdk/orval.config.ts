import { defineConfig } from 'orval';

/**
 * OpenAPI spec the client is generated from.
 *
 * Defaults to the deployed Content API, but can be overridden (e.g. with a
 * local `pnpm dev` server at `http://localhost:3000/docs/json`) so generation
 * is reproducible and does not depend on production being reachable.
 */
const openApiUrl =
  process.env.CONTENT_OPENAPI_URL ??
  'https://content.themostannoyingwebsite.com/docs/json';

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
