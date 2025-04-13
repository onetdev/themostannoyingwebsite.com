import { first_letter_capitalize } from '@maw/utils/string';
import React, { memo } from 'react';

type PrestyledNode<T extends keyof React.JSX.IntrinsicElements> = {
  type: T;
  className: string;
};

export const StyledNode = <T extends keyof React.JSX.IntrinsicElements>({
  type,
  className,
}: PrestyledNode<T>) => {
  const render = memo(
    ({
      children,
      className: internalClassName,
      ...rest
    }: React.ComponentPropsWithoutRef<T>) => {
      const Component = type as React.ElementType;

      return (
        <Component className={`${className} ${internalClassName}`} {...rest}>
          {children}
        </Component>
      );
    },
  );

  render.displayName = `StyledNode(${first_letter_capitalize(type)})`;

  return render;
};
