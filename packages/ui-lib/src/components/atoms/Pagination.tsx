import { cn } from 'cn';
import type { ComponentProps, ElementType, ReactElement } from 'react';
import { Button, type ButtonProps } from './Button';
import { Icon } from './Icon';

type PaginationProps = ComponentProps<'nav'> & {
  /** Accessible name for the pagination landmark. */
  label: string;
};

function Pagination({ className, label, ...props }: PaginationProps) {
  return (
    <nav
      aria-label={label}
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-wrap items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  size?: ButtonProps['size'];
  /**
   * Link element rendered instead of the default `<a>`. Lets the app inject its
   * locale-aware router link while the design system keeps the styling.
   */
  linkComponent?: ElementType;
} & Omit<ComponentProps<'a'>, 'ref'>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  linkComponent,
  ...props
}: PaginationLinkProps) {
  const LinkComponent = linkComponent ?? 'a';

  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <LinkComponent
          aria-current={isActive ? 'page' : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

type PaginationPreviousProps = Omit<
  ComponentProps<typeof PaginationLink>,
  'children'
> & {
  /** Visible control text. Defaults are intentionally not provided: labels are i18n-owned. */
  text: string;
  /** Accessible name for the control. */
  label: string;
};

function PaginationPrevious({
  className,
  text,
  label,
  ...props
}: PaginationPreviousProps): ReactElement {
  return (
    <PaginationLink
      aria-label={label}
      size="default"
      className={cn('pl-2!', className)}
      {...props}
    >
      <Icon
        icon="chevronLeft"
        data-icon="inline-start"
        className="rtl:rotate-180"
      />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

type PaginationNextProps = Omit<
  ComponentProps<typeof PaginationLink>,
  'children'
> & {
  /** Visible control text. */
  text: string;
  /** Accessible name for the control. */
  label: string;
};

function PaginationNext({
  className,
  text,
  label,
  ...props
}: PaginationNextProps): ReactElement {
  return (
    <PaginationLink
      aria-label={label}
      size="default"
      className={cn('pr-2!', className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <Icon
        icon="chevronRight"
        data-icon="inline-end"
        className="rtl:rotate-180"
      />
    </PaginationLink>
  );
}

type PaginationEllipsisProps = ComponentProps<'span'> & {
  /** Accessible name announced for the skipped range. */
  label: string;
};

function PaginationEllipsis({
  className,
  label,
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        'flex size-9 items-center justify-center [&_svg:not([class*="size-"])]:size-4',
        className,
      )}
      {...props}
    >
      <span aria-hidden>…</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
