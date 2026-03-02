import '@/reflect-metadata';

import './bootstrap/di';
import './bootstrap/events';
import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
