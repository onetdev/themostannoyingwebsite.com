import { sleep } from './promise';

describe('sleep', () => {
  it('should resolve after specified milliseconds', async () => {
    const start = Date.now();
    await sleep(100);
    const elapsed = Date.now() - start;

    // Allow some tolerance for timer precision
    expect(elapsed).toBeGreaterThanOrEqual(90);
    expect(elapsed).toBeLessThan(200);
  });

  it('should resolve immediately for 0ms', async () => {
    const start = Date.now();
    await sleep(0);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeLessThan(50);
  });

  it('should return a Promise', () => {
    const result = sleep(10);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should be chainable', async () => {
    const start = Date.now();
    await sleep(50).then(() => sleep(50));
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(90);
    expect(elapsed).toBeLessThan(200);
  });
});
