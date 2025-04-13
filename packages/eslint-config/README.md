# Eslint config

Contains the base configurations for base (nodejs), next.js and react-internal (used for comp library).

## Installation

### 1. Dependencies

```bash
pnpm i @maw/eslint
```

### 2. Adding eslint config to your package

Please update the import to match the usecase for your package.

```javascript
import { nextJsConfig } from "@maw/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
export default nextJsConfig;
```
