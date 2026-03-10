import type { Result, ResultErr } from '@maw/utils/result';

export class QueryError extends Error {
  originalResult: ResultErr;

  constructor(message: string, result: ResultErr) {
    super(message);
    this.originalResult = result;
    this.name = 'QueryError';
  }

  getResult<TData = unknown, TCode = string>() {
    return this.originalResult as Result<TData, TCode>;
  }
}
