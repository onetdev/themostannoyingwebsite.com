import { PropsWithChildren, ReactNode } from 'react';

import { Icon, IconAliaseKey } from '@maw/ui-lib';

type GenericItemShape = {
  key: string;
  label: string;
  icon: IconAliaseKey;
};

export type IconCollapsibleMenuProps<T extends GenericItemShape> =
  JSXProxyProps<'nav'> & {
    className?: string;
    items: T[];
    IteratorComponent: (props: PropsWithChildren<T>) => ReactNode;
  };

export function IconCollapsibleMenu<T extends GenericItemShape>({
  className,
  items,
  IteratorComponent,
  ...rest
}: IconCollapsibleMenuProps<T>) {
  return (
    <nav className={`group relative ${className}`} {...rest}>
      <ul className="flex justify-end gap-4">
        {items.map(({ key, label, icon, ...rest }) => (
          <li key={key}>
            <IteratorComponent {...(rest as T)}>
              <span className="flex items-center gap-2">
                <Icon icon={icon} title={label} titleId={label} size="lg" />
                <span className="hidden md:inline-block">{label}</span>
              </span>
            </IteratorComponent>
          </li>
        ))}
      </ul>
    </nav>
  );
}
