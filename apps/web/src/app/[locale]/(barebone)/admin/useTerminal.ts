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

export function useTerminal(charDelay = 40) {
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
  useEvent(
    'keydown',
    (evt) => {
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
        setMasked((v) => v + '*');
      }
    },
    document,
  );

  // 🖨 Typed output
  const printLine = useCallback(
    async (text: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setInputMode({ type: 'disabled' });
      setCurrentLine('');

      let out = '';
      for (const ch of text) {
        if (controller.signal.aborted) return;
        out += ch;
        setCurrentLine(out);
        await sleep(charDelay);
      }

      setLines((prev) => [...prev, { id: ++idRef.current, text }]);
      setCurrentLine('');
    },
    [charDelay],
  );

  // 🔐 Request user input
  const requestInput = useCallback(
    (mode: Exclude<InputMode, { type: 'disabled' }>) =>
      new Promise<string>((resolve) => {
        setInput('');
        setMasked('');
        resolverRef.current = resolve;
        setInputMode(mode);
      }),
    [],
  );

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
  };
}
