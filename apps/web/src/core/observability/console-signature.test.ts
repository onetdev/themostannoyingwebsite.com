import {
  CONSOLE_SIGNATURE,
  CONSOLE_SIGNATURE_LINES,
  logConsoleSignature,
} from './console-signature';

/** Standard terminal width the signature must never exceed. */
const MAX_LINE_WIDTH = 70;

describe('console signature', () => {
  it('fits the 70-column console width', () => {
    for (const line of CONSOLE_SIGNATURE_LINES) {
      expect(line.length).toBeLessThanOrEqual(MAX_LINE_WIDTH);
    }
  });

  it('has no trailing whitespace or blank lines', () => {
    for (const line of CONSOLE_SIGNATURE_LINES) {
      expect(line).toBe(line.trimEnd());
      expect(line.trim().length).toBeGreaterThan(0);
    }
  });

  it('joins the art with newlines', () => {
    expect(CONSOLE_SIGNATURE).toBe(CONSOLE_SIGNATURE_LINES.join('\n'));
  });

  it('logs the signature once', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logConsoleSignature();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(CONSOLE_SIGNATURE);

    logSpy.mockRestore();
  });
});
