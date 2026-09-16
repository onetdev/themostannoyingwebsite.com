import { defineConfig } from 'orval';

export default defineConfig({
  contentSdk: {
    input: {
      target: 'https://content.themostannoyingwebsite.com/docs/json',
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
