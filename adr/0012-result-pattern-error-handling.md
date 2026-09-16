# ADR 12: Railway-Oriented Error Handling with the Result Pattern

## Status
Accepted

## Context
Standard JavaScript and TypeScript exception handling relies on throwing exceptions (`throw new Error()`) and catching them via `try/catch`. This approach has significant drawbacks in large TypeScript applications:
- Thrown exceptions are not represented in TypeScript function signatures, making error handling invisible to consumers at compile time.
- Uncaught exceptions can bubble unpredictably and crash React component render trees or break asynchronous operation chains.
- Writing repetitive `try/catch` blocks introduces boilerplate and encourages swallowing or misclassifying errors.

## Decision
We adopted the **Result Pattern** (Railway-Oriented Programming) implemented in `@maw/utils/result`:

- **Type Definition**: A tagged union `Result<TData, TCode>` representing either `ResultOk` (`{ success: true, data, metadata }`) or `ResultErr` (`{ success: false, error: { message, code, details }, metadata }`).
- **Constructors & Guards**: Reusable helpers `ok(data, meta)`, `err(params, meta)`, `isOk(result)`, and `isErr(result)` provide clean ergonomics and type narrowing.
- **Scope of Use**: The Result pattern is enforced across I/O boundaries:
  - `HttpClient.ts` wraps all network requests and returns `Result<T>`.
  - Service methods and repositories that interact with storage, APIs, or external utilities return `Result<T>` rather than throwing errors.
  - UI hooks check `result.success` to branch cleanly into error states or success feedback.

## Consequences
- **Pros**: Explicit error contracts enforced by TypeScript; eliminates unexpected runtime crashes from unhandled rejections; standardizes error metadata (timestamps, request IDs, error codes); simplifies unit testing.
- **Cons**: Requires explicit wrapping and unwrapping of return values; developers accustomed to standard `throw` patterns must adapt to checking result objects.
