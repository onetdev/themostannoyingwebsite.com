'use client';

import { sleep } from '@maw/utils/promise';
import { useTranslations } from 'next-intl';
import { useAsync } from 'react-use';

import { useAdminTerminal } from './useAdminTerminal';

// I know this is just a gag, but having this here is feels wrong on
// multiple levels. Hi Mark!
const validLogin = [{ login: 'admin', password: 'admin' }];

export function useAdminTerminalAuthFlow(
  term: ReturnType<typeof useAdminTerminal>,
  onEnd: (authed: boolean) => void,
) {
  const t = useTranslations('admin.terminal');

  useAsync(async () => {
    term.reset();
    await term.printLine(t('systemBoot'));
    await sleep(2500);
    await term.printLine(t('systemReady'));
    await term.printLine(' ');

    // USERNAME
    const username = await term.requestInput({
      type: 'text',
      prompt: `${t('loginPrompt')} `,
    });

    // PASSWORD
    const password = await term.requestInput({
      type: 'password',
      prompt: `${t('passwordPrompt')} `,
    });

    await term.printLine(' ');
    // LOGIN VERIFICATION
    const userMatch = validLogin.find(
      (user) => user.login === username && user.password === password,
    );
    if (!userMatch) {
      await term.printLine(`${t('invalidCredentials')} ❌`);
      await term.printLine(t('redirectingGeneric'));
      await sleep(1000);
      onEnd(false);
      return;
    }

    await term.printLine(
      `${t('accessGranted', { username: userMatch.login })} ✅`,
    );
    await sleep(1000);
    await term.printLine(t('matrixQuote'));
    await term.printLine(t('redirectingSafety'));
    await sleep(1000);
    onEnd(true);
  });
}
