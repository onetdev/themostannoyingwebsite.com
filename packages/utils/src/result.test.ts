import { err, isErr, isOk, ok } from './result';

describe('result utils', () => {
  describe('ok', () => {
    test('should create a success result with data', () => {
      const data = { foo: 'bar' };
      const result = ok(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(data);
      }
      expect(result.metadata.timestamp).toBeDefined();
      expect(new Date(result.metadata.timestamp).toISOString()).toBe(
        result.metadata.timestamp,
      );
    });

    test('should merge metadata', () => {
      const metadata = {
        requestId: '123',
      };
      const result = ok('data', metadata);
      expect(result.metadata.requestId).toBe('123');
      expect(result.metadata.timestamp).toBeDefined();
    });
  });

  describe('err', () => {
    test('should create an error result with message and optional fields', () => {
      const errorData = {
        message: 'Something went wrong',
        code: 'ERR_CODE',
        details: { key: 'value' },
      };
      const result = err(errorData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toEqual({
          message: errorData.message,
          code: errorData.code,
          details: errorData.details,
        });
      }
      expect(result.metadata.timestamp).toBeDefined();
    });

    test('should merge metadata in error result', () => {
      const metadata = {
        requestId: '456',
      };
      const result = err({ message: 'err' }, metadata);
      expect(result.metadata.requestId).toBe('456');
    });
  });

  describe('isOk', () => {
    test('should return true for ok results', () => {
      const result = ok('data');
      expect(isOk(result)).toBe(true);
    });

    test('should return false for error results', () => {
      const result = err({ message: 'err' });
      expect(isOk(result)).toBe(false);
    });

    test('should return false for non-result objects', () => {
      expect(isOk({})).toBe(false);
      expect(isOk(null)).toBe(false);
      expect(isOk(undefined)).toBe(false);
      expect(isOk('not a result')).toBe(false);
    });
  });

  describe('isErr', () => {
    test('should return true for error results', () => {
      const result = err({ message: 'err' });
      expect(isErr(result)).toBe(true);
    });

    test('should return false for ok results', () => {
      const result = ok('data');
      expect(isErr(result)).toBe(false);
    });

    test('should return false for non-result objects', () => {
      expect(isErr({})).toBe(false);
      expect(isErr(null)).toBe(false);
      expect(isErr(undefined)).toBe(false);
      expect(isErr('not a result')).toBe(false);
    });
  });
});
