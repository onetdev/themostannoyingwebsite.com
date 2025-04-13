# Jest preset

So having a shared JEST preset is painful but also useful. So we have to make a decision on how to use it.

## Installation

In order to use the shared JEST config you will need to do the following steps in the package that you are working on:

### 1. Install dependencies

This will need quie a few deps but I guess it is what it is. Please keep the `@catalog:` versions since we use pnpm's workspace catalog to keep versions synced across the monorepo.

```bash
pnpm i -D \
  @maw/jest-preset \
  @testing-library/dom \
  @testing-library/jest-dom@catalog: \
  jest@catalog: \
  jest-environment-jsdom@catalog: \
  ts-jest@catalog: \
  typescript@catalog: \
  @types/jest@catalog:
```

### 2. Add config

Add `jest.config.ts` to the root of your package with the following content:

```ts
import { config } from '@maw/eslint-config/base';
export default config;
```

### 3. Add typescript config

Follow the installation steps of `@maw/tsconfig` package to add the typescript config to your package.
