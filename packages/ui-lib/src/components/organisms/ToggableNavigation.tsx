import { PropsWithChildren, ReactNode } from 'react';

import { Icon } from '@maw/ui-lib';

type GenericItemShape = {
  key: string;
  label: string;
};

export type ToggableNavigationProps<T extends GenericItemShape> =
  JSXProxyProps<'nav'> & {
    className?: string;
    items: T[];
    IteratorComponent: (props: PropsWithChildren<T>) => ReactNode;
    texts: {
      toggleMenu: string;
    };
  };

export function ToggableNavigation<T extends GenericItemShape>({
  className,
  items,
  IteratorComponent,
  texts,
}: ToggableNavigationProps<T>) {
  return (
    <nav
      className={`group relative ${className}`}
      id="navigation-main"
      role="navigation">
      <input type="checkbox" id="menu-toggle" className="peer hidden" />
      <label className="block cursor-pointer md:hidden" htmlFor="menu-toggle">
        <Icon icon="menu" size="lg" aria-label={texts.toggleMenu} />
      </label>
      <ul className="bg-surface font-primary absolute inset-x-0 z-20 hidden flex-col gap-x-5 py-2 text-lg drop-shadow-md peer-checked:flex md:relative md:right-0 md:flex md:flex-row md:flex-wrap md:py-0 md:drop-shadow-none">
        {items.map(({ key, label, ...rest }) => (
          <li key={key} className="px-3 md:px-0">
            <IteratorComponent {...(rest as T)}>{label}</IteratorComponent>
          </li>
        ))}
      </ul>
    </nav>
  );
}
