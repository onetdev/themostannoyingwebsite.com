### Usage

So having a shared JEST preset is painful but also useful. So we have to make a decision on how to use it.

In order to use the shared JEST config you will need to do the following steps in the package that you are working on:

1. Add jest.config.ts to the root of your package.
2. Add the following code to the jest.config.ts file:

```ts
import { config } from '@maw/eslint-config/base';
export default config;
```
3. Install the following dependencies in your package:

```bash
pnpm install --save-dev @maw/jest-preset @testing-library/dom @testing-library/jest-dom jest jest-environment-jsdom ts-jest typescript
```
