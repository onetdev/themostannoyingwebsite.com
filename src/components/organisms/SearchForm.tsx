import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/utils/i18n';
import { FormEventHandler, FunctionComponent } from 'react';

import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import TextInput from '@/components/atoms/TextInput';
import { DOCUMENT_EVENT_SEARCH } from '@/global';
import { FormElementSize } from '@/lib/utils/form';

export type SearchFormSize = FormElementSize;
export type SearchFormProps = {
  className?: string;
  initialValue?: string;
  size?: SearchFormSize;
};

const SearchForm: FunctionComponent<SearchFormProps> = ({
  className,
  initialValue = '',
  size = 'sm',
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // Sooo, we want to avoid edge requests thus using fragment instead
    // The search doesn't work anyways
    router.push(`/search#query=${event.currentTarget.search.value}`);

    // If we are already on the search page, we will also need to dispatch
    // the search event
    const searchEvent = new CustomEvent(DOCUMENT_EVENT_SEARCH, {
      detail: { query: event.currentTarget.search.value },
    });
    document.dispatchEvent(searchEvent);
  };

  return (
    <form method="post" onSubmit={onSubmit} className={`flex ${className}`}>
      <TextInput
        defaultValue={initialValue}
        className="-mr-1 w-full rounded-r-none"
        size={size}
        variant="primary"
        name="search"
        placeholder={t('search.placeholder')}
      />
      <Button
        className="flex items-center rounded-l-none"
        aria-label={t('common.search')}
        variant="primary"
        type="submit"
        size={size}>
        <Icon icon="search" size="sm" />
      </Button>
    </form>
  );
};

export default SearchForm;
