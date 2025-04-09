# Jest preset

So having a shared JEST preset is painful but also useful. So we have to make a decision on how to use it.

In order to use the shared JEST config you will need to do the following steps in the package that you are working on:

## Installation

### 1. Install dependencies

```bash
pnpm i -D @maw/jest-preset @testing-library/dom @testing-library/jest-dom jest jest-environment-jsdom ts-jest typescript
```

### 2. Add config

Add `jest.config.ts` to the root of your package with the following content:

```ts
import { config } from '@maw/eslint-config/base';
export default config;
```

### 3. Add typescript config

Follow the installation steps of `@maw/tsconfig` package to add the typescript config to your package.
