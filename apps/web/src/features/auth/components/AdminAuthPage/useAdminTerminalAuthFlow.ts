'use client';

import { sleep } from '@maw/utils/promise';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useLatest } from 'react-use';
import { emit } from '@/core/events/event-bus';
import type { useAdminTerminal } from './useAdminTerminal';

// I know this is just a gag, but having this here is feels wrong on
// multiple levels. Hi Mark!
const validLogin = [{ login: 'admin', password: 'admin' }];

export function useAdminTerminalAuthFlow(
  term: ReturnType<typeof useAdminTerminal>,
  onEnd: (authed: boolean) => void,
) {
  const t = useTranslations('auth.admin.terminal');
  const termRef = useLatest(term);
  const onEndRef = useLatest(onEnd);
  const tRef = useLatest(t);

  // biome-ignore lint/correctness/useExhaustiveDependencies: The script must run once per mount; the latest term/onEnd/t are read through refs so re-renders (which recreate `term` and `onEnd`) do not restart it.
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const terminal = termRef.current;
    const t = tRef.current;

    // 🖥 Boot sequence, ending right before the login prompt.
    const showBootMessages = async () => {
      await terminal.printLine(t('systemBoot'), signal);
      if (signal.aborted) return false;
      await sleep(1500);
      if (signal.aborted) return false;
      await terminal.printLine(t('systemReady'), signal);
      await terminal.printLine('\n', signal);
      if (signal.aborted) return false;
      await sleep(1500);
      return !signal.aborted;
    };

    // 🔐 Ask for the username and password, echoing them back to the terminal.
    const promptUserDetails = async () => {
      const username = await terminal.requestInput(
        { type: 'text', prompt: `${t('loginPrompt')} ` },
        signal,
      );
      if (signal.aborted) return null;

      const password = await terminal.requestInput(
        { type: 'password', prompt: `${t('passwordPrompt')} ` },
        signal,
      );
      if (signal.aborted) return null;

      await terminal.printLine('\n', signal);
      if (signal.aborted) return null;

      return { username, password };
    };

    // ✅ Success path: announce the login and play the closing messages.
    const grantAccess = async (username: string) => {
      emit('admin-auth:login', { username });
      await terminal.printLine(
        `${t('accessGranted', { username })} ✅`,
        signal,
      );
      await sleep(1000);
      if (signal.aborted) return false;
      await terminal.printLine(t('matrixQuote'), signal);
      await terminal.printLine(t('redirectingSafety'), signal);
      await sleep(1000);
      return !signal.aborted;
    };

    // ❌ Failure path: report the bad credentials before redirecting away.
    const denyAccess = async () => {
      await terminal.printLine(`${t('invalidCredentials')} ❌`, signal);
      await terminal.printLine(t('redirectingGeneric'), signal);
      await sleep(1000);
      return !signal.aborted;
    };

    const run = async () => {
      terminal.reset();

      if (!(await showBootMessages())) return;

      const credentials = await promptUserDetails();
      if (!credentials) return;

      const userMatch = validLogin.find(
        (user) =>
          user.login === credentials.username &&
          user.password === credentials.password,
      );

      if (!userMatch) {
        if (!(await denyAccess())) return;
        onEndRef.current(false);
        return;
      }

      if (!(await grantAccess(userMatch.login))) return;
      onEndRef.current(true);
    };

    run().catch((error) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error('Admin terminal auth flow failed:', error);
    });

    // The script runs once per mount; the latest `term`/`t`/`onEnd` are read
    // via refs so a re-render or locale change does not restart it. Strict
    // Mode's mount → unmount → mount aborts the first pass here, preventing
    // two concurrent runs from cancelling each other's typed output.
    return () => controller.abort();
  }, []);
}
