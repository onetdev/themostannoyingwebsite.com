# @maw/logger

Centralized logging abstraction shared across the monorepo, built on
[`tslog`](https://tslog.js.org/).

## Usage

```ts
import { getLogger } from '@maw/logger';

const logger = getLogger();
logger.info('Another pointless log line');
logger.error('Something annoyingly broke');
```

`getLogger()` returns a `tslog` `Logger` configured with the `pretty` transport.

## Consumers

- The web app resolves it in `src/core/i18n/request.ts`, the localized static
  pages, and the client-side `useLogger` hook
  (`apps/web/src/core/observability/react/useLogger.ts`).
