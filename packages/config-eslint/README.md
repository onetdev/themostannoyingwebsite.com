# Eslint config

Contains the base configurations for base (nodejs), next.js and react-internal (used for comp library).

**Why is Prettier part of eslint package?** Because we use it as a plugin and not as a standalone thing.

## Installation

### 1. Dependencies

```bash
pnpm i @maw/config-eslint
```

### 2. Adding eslint config to your package

Please update the import to match the usecase for your package.

```javascript
import { nextJsConfig } from "@maw/config-eslint/next-js";

/** @type {import("eslint").Linter.Config} */
export default nextJsConfig;
```

### 2. Add prettier config

For formatting files, you can use the prettier config from the eslint config.

```javascript
import config from "@maw/config-eslint/prettier/base";

export config;
```
