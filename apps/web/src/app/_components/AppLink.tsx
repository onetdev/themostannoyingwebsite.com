import { ComponentProps, PropsWithChildren } from 'react';

import { Link } from '@/i18n/navigation';

export type AppLinkProps = PropsWithChildren<ComponentProps<typeof Link>>;

export function AppLink({ children, ...rest }: AppLinkProps) {
  return <Link {...rest}>{children}</Link>;
}
