'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import styles from './AdminPage.module.css';
import { useAdminTerminal } from './useAdminTerminal';
import { useAdminTerminalAuthFlow } from './useAdminTerminalAuthFlow';

export function AdminPage() {
  const [cursorBlink, setCursorBlink] = useState(false);
  const router = useRouter();
  const term = useAdminTerminal();

  useAdminTerminalAuthFlow(term, () => {
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
          className={`${styles.terminalContainer} h-full rounded-lg border-2 border-[#00ff00] bg-black p-8 shadow-[0_0_20px_rgba(0,255,0,0.3)]`}
        >
          <div
            className={`${styles.terminalScreen} h-full font-mono text-base leading-relaxed text-[#00ff00]`}
          >
            <div className="break-all whitespace-pre-wrap">
              {term.lines.map((line) => (
                <div key={line.id}>{line.text}</div>
              ))}

              {term.currentLine && <div>{term.currentLine}</div>}

              {term.activePrompt && (
                <div className="break-all whitespace-pre-wrap">
                  {term.activePrompt}
                  <span
                    className="ml-0.5 inline-block transition-opacity duration-0"
                    style={{ opacity: cursorBlink ? 1 : 0 }}
                  >
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
