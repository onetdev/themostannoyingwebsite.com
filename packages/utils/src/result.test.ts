import { createErrorResult, createSuccessResult } from './result';

describe('result utils', () => {
  describe('createSuccessResult', () => {
    test('should create a success result with data', () => {
      const data = { foo: 'bar' };
      const result = createSuccessResult(data);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(data);
      expect(result.metadata?.timestamp).toBeDefined();
      expect(new Date(result.metadata!.timestamp).toISOString()).toBe(
        result.metadata!.timestamp,
      );
    });

    test('should merge metadata', () => {
      const metadata = { requestId: '123' };
      const result = createSuccessResult('data', metadata);
      expect(result.metadata?.requestId).toBe('123');
      expect(result.metadata?.timestamp).toBeDefined();
    });
  });

  describe('createErrorResult', () => {
    test('should create an error result with message and optional fields', () => {
      const errorData = {
        message: 'Something went wrong',
        code: 'ERR_CODE',
        details: { key: 'value' },
      };
      const result = createErrorResult(errorData);
      expect(result.success).toBe(false);
      expect(result.error).toEqual({
        message: errorData.message,
        code: errorData.code,
        details: errorData.details,
      });
      expect(result.metadata?.timestamp).toBeDefined();
    });

    test('should merge metadata in error result', () => {
      const metadata = { requestId: '456' };
      const result = createErrorResult({ message: 'err', metadata });
      expect(result.metadata?.requestId).toBe('456');
    });
  });
});
