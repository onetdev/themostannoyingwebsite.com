'use client';

import { sleep } from '@maw/utils/promise';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';

import styles from './page.module.css';
import { useTerminal } from './useTerminal';

import { useRouter } from '@/i18n/navigation';

// I know this is just a gag, but having this here is feels wrong on
// multiple levels. Hi Mark!
const validLogin = [{ login: 'admin', password: 'admin' }];

export default function Page() {
  const t = useTranslations('admin.terminal');
  const [cursorBlink, setCursorBlink] = useState(false);
  const router = useRouter();
  const term = useTerminal();

  useAsync(async () => {
    await term.printLine(t('systemBoot'));
    await sleep(2500);
    await term.printLine(t('systemReady'));
    await term.printLine('\n');

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

    await term.printLine('\n');
    // LOGIN VERIFICATION
    const userMatch = validLogin.find(
      (user) => user.login === username && user.password === password,
    );
    if (!userMatch) {
      await term.printLine(`${t('invalidCredentials')} ❌`);
      await term.printLine(t('redirectingGeneric'));
      await sleep(1000);
      router.push('/donate');
      return;
    }

    await term.printLine(
      `${t('accessGranted', { username: userMatch.login })} ✅`,
    );
    await sleep(1000);
    await term.printLine(t('matrixQuote'));
    await term.printLine(t('redirectingSafety'));
    await sleep(1000);
    router.push('/donate');
  });

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="h-screen max-h-[480px] w-full max-w-[640px]">
        <div
          className={`${styles.terminalContainer} h-full rounded-lg border-2 border-[#00ff00] bg-black p-8 shadow-[0_0_20px_rgba(0,255,0,0.3)]`}>
          <div
            className={`${styles.terminalScreen} font-mono text-base leading-relaxed text-[#00ff00]`}>
            <div className="whitespace-pre-wrap">
              {term.lines.map((line) => (
                <div key={line.id}>{line.text}</div>
              ))}

              {term.currentLine && <div>{term.currentLine}</div>}

              {term.activePrompt && (
                <div>
                  {term.activePrompt}
                  <span
                    className="ml-0.5 inline-block transition-opacity duration-0"
                    style={{ opacity: cursorBlink ? 1 : 0 }}>
                    ▋
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
