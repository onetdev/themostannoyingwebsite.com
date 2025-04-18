import { PropsWithChildren, ReactNode } from 'react';

import { Icon, IconAliaseKey } from '@maw/ui-lib';

type GenericItemShape = {
  key: string;
  label: string;
  icon: IconAliaseKey;
};

export type IconCollapsibleMenuProps<T extends GenericItemShape> =
  JSXProxyProps<'nav'> & {
    activeItem?: string;
    className?: string;
    items: T[];
    IteratorComponent: (props: PropsWithChildren<T>) => ReactNode;
  };

export function IconCollapsibleMenu<T extends GenericItemShape>({
  activeItem,
  className,
  items,
  IteratorComponent,
  ...rest
}: IconCollapsibleMenuProps<T>) {
  return (
    <nav className={`group/nav relative ${className}`} {...rest}>
      <ul className="flex justify-end gap-4">
        {items.map(({ key, label, icon, ...rest }) => (
          <li key={key}>
            <IteratorComponent {...(rest as T)}>
              <span
                className="group/nav-item flex items-center gap-2"
                data-active={activeItem === key}>
                <Icon icon={icon} title={label} titleId={label} size="lg" />
                <span className="hidden group-data-[active=true]/nav-item:font-extrabold md:inline-block">
                  {label}
                </span>
              </span>
            </IteratorComponent>
          </li>
        ))}
      </ul>
    </nav>
  );
}
