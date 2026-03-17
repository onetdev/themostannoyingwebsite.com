# Testing

The project uses both **unit tests** and **end-to-end tests**.

## Unit Tests

Unit tests are implemented using **Jest**.

Run all tests:

```bash
pnpm test
```

Unit tests focus on:
- services
- utilities
- core infrastructure
- feature logic

## End-to-End Tests

End-to-end tests use Playwright.

Run all E2E tests:

```
pnpm test:e2e
```

Run tests in headed mode:

```
pnpm test:e2e --headed
```

Run tests using Playwright UI:

```
pnpm exec playwright test --ui
```

### Playwright Setup

If Playwright browsers are not installed:

```
pnpm exec playwright install
```

### Viewing Test Results

After running tests:

```
pnpm exec playwright show-report
```

### E2E Test Structure

E2E tests live in:

```
apps/web/e2e
```

More detailed testing documentation can be found in:

```
apps/web/e2e/README.md
```
