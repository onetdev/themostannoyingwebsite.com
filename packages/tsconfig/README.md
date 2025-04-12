# Typescript Config

This package provides a set of TypeScript configuration files for various environments, including Node.js, React, and Next.js. It is designed to be used with the `tsconfig` package to simplify the process of setting up TypeScript projects.

## Installation

### 1. Install dependencies
```bash
pnpm i -D @maw/tsconfig typescript
```

### 2. Add `tsconfig`

Then add `tsconfig.json` to your package or project root.

```json
{
  "extends": "@maw/tsconfig/configs/base.json",
  "compilerOptions": {
    "baseUrl": "."
  },
}
```
> **Important!** You might be enticed to remove `baseUrl` from `compilerOptions`, but it is actually required by the path aliasing that comes with the base config.

### 3. Set proper extend target

Replace `base.json` in `tsconfig.json` with any of the following:

- `base.json`: Base configuration for TypeScript projects.
- `nextjs.json`: Configuration for Next.js projects.
- `react-library.json`: Configuration for React projects.
