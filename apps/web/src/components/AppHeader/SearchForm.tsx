'use client';

import {
  Icon,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@maw/ui-lib';
import { cn, cva, VariantProps } from '@maw/ui-lib/utils';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SubmitEventHandler } from 'react';

import { DOCUMENT_EVENT_SEARCH } from '@/global';

const searchFormVariants = cva('', {
  variants: {
    size: {
      md: '',
      lg: 'md:h-12 md:text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SearchFormProps = VariantProps<typeof searchFormVariants> & {
  className?: string;
  initialValue?: string;
};

export function SearchForm({
  className,
  initialValue = '',
  size = 'md',
}: SearchFormProps) {
  const t = useTranslations();
  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const searchInput = form.elements.namedItem('search') as HTMLInputElement;
    const query = searchInput.value;

    // Sooo, we want to avoid edge requests thus using fragment instead
    // The search doesn't work anyways
    router.push(`/search#query=${query}`);

    // If we are already on the search page, we will also need to dispatch
    // the search event
    const searchEvent = new CustomEvent(DOCUMENT_EVENT_SEARCH, {
      detail: { query },
    });
    document.dispatchEvent(searchEvent);
  };

  return (
    <form method="post" onSubmit={onSubmit} className={className} role="search">
      <InputGroup className={cn(searchFormVariants({ size }))}>
        <InputGroupInput
          defaultValue={initialValue}
          name="search"
          placeholder={t('search.placeholder')}
          autoComplete="off"
          className={cn(searchFormVariants({ size }))}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={t('common.search')}
            type="submit"
            className={cn(searchFormVariants({ size }))}>
            <Icon icon="search" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
