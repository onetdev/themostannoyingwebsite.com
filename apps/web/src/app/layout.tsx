import '@/reflect-metadata';
import 'core-js/actual/iterator/filter';
import 'core-js/actual/iterator/map';
import 'core-js/actual/iterator/to-array';

import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
