'use client';

import {
  Icon,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@maw/ui-lib';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import type { SubmitEventHandler } from 'react';
import { emit } from '@/core/events/event-bus';
import { useRouter } from '@/core/i18n/navigation';
import type { TelemetrySection } from '@/core/telemetry';

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
  /**
   * Render as a narrow field that expands while focused. Intended for tight
   * spots like the header; leave off for standalone search pages.
   */
  expandable?: boolean;
  /**
   * Telemetry surface for the form and its fields. Defaults to the search page
   * scope; the header passes `navigation:search` so the same form can be
   * attributed to the surface the visitor actually used.
   */
  section?: TelemetrySection;
};

export function SearchForm({
  className,
  initialValue = '',
  size = 'md',
  expandable = false,
  section = 'content:search',
}: SearchFormProps) {
  const t = useTranslations();
  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const searchInput = form.elements.namedItem('search') as HTMLInputElement;
    const query = searchInput.value;

    // Keep the query in the URL (`?q=`) so the page is shareable, SSR-friendly
    // and compatible with the site-wide SearchAction. The search itself still
    // runs client-side.
    router.push(`/search?q=${encodeURIComponent(query)}`);

    // If we are already on the search page, we will also need to dispatch
    // the search event
    emit('global-search:query', { query });
  };

  return (
    <search
      className={cn(
        expandable &&
          'w-40 transition-[width] duration-300 ease-out focus-within:w-64 motion-reduce:transition-none',
        className,
      )}
    >
      <form
        method="post"
        onSubmit={onSubmit}
        className="w-full"
        data-track-form={section}
        data-track-section={section}
      >
        <InputGroup className={cn(searchFormVariants({ size }))}>
          <InputGroupInput
            defaultValue={initialValue}
            name="search"
            data-track-input
            placeholder={t('content.search.placeholder')}
            autoComplete="off"
            className={cn(searchFormVariants({ size }))}
            minLength={2}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label={t('common.action.search')}
              data-track="search:submit"
              type="submit"
              className={cn(searchFormVariants({ size }))}
            >
              <Icon icon="search" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </search>
  );
}
