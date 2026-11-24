/**
 * Browser console signature.
 *
 * Easter egg logged once per document load from `instrumentation-client.ts`.
 * The art is kept as an array so a unit test can enforce the 70-column console
 * width; it is intentionally plain ASCII to render in every console font.
 */
export const CONSOLE_SIGNATURE_LINES = [
  '+--------------------------------------------------------------------+',
  '| themostannoyingwebsite.com                          [_] [ ] [X]    |',
  '+--------------------------------------------------------------------+',
  '|                                                                    |',
  '|   +------------------------------------------------------------+   |',
  '|   |  We value your privacy. We also value 1,247 cookies.       |   |',
  '|   |                                                            |   |',
  '|   |    [ ACCEPT ALL ]   [ ACCEPT MORE ]   [ MANAGE 47 ]        |   |',
  '|   +------------------------------------------------------------+   |',
  '|                                                                    |',
  '|   loading... 99% (approx. 3 seconds remaining since 2019)          |',
  '+--------------------------------------------------------------------+',
] as const;

export const CONSOLE_SIGNATURE = CONSOLE_SIGNATURE_LINES.join('\n');

export function logConsoleSignature(): void {
  console.log(CONSOLE_SIGNATURE);
}
