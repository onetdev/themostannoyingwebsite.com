'use client';

import { useCallback, useRef, useState } from 'react';
import { useEvent, useLatest } from 'react-use';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

type TerminalLine = {
  id: number;
  text: string;
};

type InputMode =
  | { type: 'disabled' }
  | { type: 'text'; prompt: string }
  | { type: 'password'; prompt: string };

export function useAdminTerminal(charDelay = 40) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [input, setInput] = useState('');
  const [masked, setMasked] = useState('');
  const [inputMode, setInputMode] = useState<InputMode>({ type: 'disabled' });

  const resolverRef = useRef<(value: string) => void>(null);
  const abortRef = useRef<AbortController>(null);
  const idRef = useRef(0);

  const inputRef = useLatest(input);
  const maskedRef = useLatest(masked);
  const modeRef = useLatest(inputMode);

  // ⌨️ Document-level keyboard handling
  useEvent('keydown', (evt) => {
    const e = evt as KeyboardEvent;
    const mode = modeRef.current;
    if (mode.type === 'disabled') return;

    e.preventDefault();

    if (e.key === 'Enter') {
      const value = inputRef.current;

      setLines((prev) => [
        ...prev,
        {
          id: ++idRef.current,
          text:
            mode.type === 'password'
              ? mode.prompt + maskedRef.current
              : mode.prompt + inputRef.current,
        },
      ]);

      setInput('');
      setMasked('');
      setInputMode({ type: 'disabled' });

      resolverRef.current?.(value);
      return;
    }

    if (e.key === 'Backspace') {
      setInput((v) => v.slice(0, -1));
      setMasked((v) => v.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      setInput((v) => v + e.key);
      setMasked((v) => `${v}*`);
    }
  });

  // 🖨 Animate text into the current (uncommitted) line.
  const typeText = useCallback(
    async (text: string, signal?: AbortSignal) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const onAbort = () => controller.abort();
      if (signal?.aborted) {
        controller.abort();
      } else {
        signal?.addEventListener('abort', onAbort, { once: true });
      }

      try {
        setCurrentLine('');

        let out = '';
        for (const ch of text) {
          if (controller.signal.aborted) break;
          out += ch;
          setCurrentLine(out);
          await sleep(charDelay);
        }

        if (controller.signal.aborted) {
          // Only clear the partial line when no newer typeText has taken over,
          // otherwise a superseded run would wipe the active one's output.
          if (abortRef.current === controller) setCurrentLine('');
          return false;
        }

        return true;
      } finally {
        signal?.removeEventListener('abort', onAbort);
      }
    },
    [charDelay],
  );

  // 🖨 Typed output
  const printLine = useCallback(
    async (text: string, signal?: AbortSignal) => {
      setInputMode({ type: 'disabled' });
      const completed = await typeText(text, signal);
      if (!completed) return;

      setLines((prev) => [...prev, { id: ++idRef.current, text }]);
      setCurrentLine('');
    },
    [typeText],
  );

  // 🔐 Request user input
  const requestInput = useCallback(
    (mode: Exclude<InputMode, { type: 'disabled' }>, signal?: AbortSignal) =>
      new Promise<string>((resolve, reject) => {
        let settled = false;

        const abort = () => {
          if (settled) return;
          settled = true;
          if (resolverRef.current === settle) resolverRef.current = null;
          setInputMode({ type: 'disabled' });
          reject(new DOMException('Aborted', 'AbortError'));
        };

        const settle = (value: string) => {
          if (settled) return;
          settled = true;
          signal?.removeEventListener('abort', abort);
          if (resolverRef.current === settle) resolverRef.current = null;
          resolve(value);
        };

        if (signal?.aborted) {
          abort();
          return;
        }

        signal?.addEventListener('abort', abort, { once: true });

        // Type the prompt out, then hand control over to the user.
        void (async () => {
          setInputMode({ type: 'disabled' });
          const completed = await typeText(mode.prompt, signal);
          if (!completed || settled) return;

          setInput('');
          setMasked('');
          resolverRef.current = settle;
          setCurrentLine('');
          setInputMode(mode);
        })();
      }),
    [typeText],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setLines([]);
    setCurrentLine('');
    setInput('');
    setMasked('');
    setInputMode({ type: 'disabled' });
    idRef.current = 0;
  }, []);

  const activePrompt =
    inputMode.type === 'disabled'
      ? null
      : inputMode.prompt + (inputMode.type === 'password' ? masked : input);

  return {
    lines,
    currentLine,
    activePrompt,
    printLine,
    requestInput,
    reset,
  };
}
