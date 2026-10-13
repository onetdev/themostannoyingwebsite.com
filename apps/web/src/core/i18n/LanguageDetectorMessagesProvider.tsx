'use client';

import { createContext, type PropsWithChildren, useContext } from 'react';
import type { LanguageDetectorMessageMap } from './language-detector-types';

const LanguageDetectorMessagesContext =
  createContext<LanguageDetectorMessageMap>({});

/**
 * Provides the bundled per-locale language-suggestion copy so the client-side
 * suggestion toast can render in the suggested language without a runtime
 * Content API call. See `adr/0028-english-translation-reference-sync.md`.
 */
export function LanguageDetectorMessagesProvider({
  value,
  children,
}: PropsWithChildren<{ value: LanguageDetectorMessageMap }>) {
  return (
    <LanguageDetectorMessagesContext.Provider value={value}>
      {children}
    </LanguageDetectorMessagesContext.Provider>
  );
}

export function useLanguageDetectorMessages(): LanguageDetectorMessageMap {
  return useContext(LanguageDetectorMessagesContext);
}
