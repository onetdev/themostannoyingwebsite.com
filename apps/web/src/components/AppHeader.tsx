import { ArticleDatum } from '@maw/content-api';
import { Icon } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { FunctionComponent } from 'react';

import { AppDarkModeToggle } from './AppDarkModeToggle';
import { ArticleMarquee } from './ArticleMarquee';

import MainNavigation from '@/components/MainNavigation';
import SearchForm from '@/components/SearchForm';
import UserNavigation from '@/components/UserNavigation';
import { AppArticleService } from '@/features/content/services/AppArticleService';
import { Link } from '@/i18n/navigation';

export const RenderMarqueeItem = (item: ArticleDatum) => {
  const path = '/articles/' + item.slug;
  return (
    <Link
      href={path}
      passHref
      prefetch={false}
      className="mx-8 inline-block px-2">
      {item.title}
    </Link>
  );
};

export const AppHeader: FunctionComponent = async () => {
  const t = await getTranslations();

  const marqueeItems = (
    await AppArticleService.getMany({
      params: { isHighlighted: true },
      paginate: { take: 10 },
    })
  ).items;

  return (
    <header id="header" className="grid grid-cols-2 gap-1 py-2" role="banner">
      <h1 className="pb-3 font-semibold tracking-tighter">
        <Link href="/" prefetch={false} title={t('app.title')}>
          <span className="text-on-surface lg:hidden">
            <i className="font-light">the</i> MAW
          </span>
          <span className="text-on-surface hidden lg:inline">
            <i className="text-3xl font-light opacity-80">the</i>{' '}
            <span>Most Annoying Website</span>
          </span>
        </Link>
      </h1>
      <div className="flex items-center justify-end gap-3">
        <SearchForm className="hidden md:flex" size="md" />
        <Link href="/search" className="md:hidden">
          <Icon icon="search" />
        </Link>
        <AppDarkModeToggle />
      </div>
      <MainNavigation className="col-span-1 my-3 -ml-3 pl-3 md:ml-0 md:pl-0" />
      <UserNavigation className="col-span-1 my-3" />
      <ArticleMarquee
        items={marqueeItems}
        className="bg-surface-alt col-span-2 -mx-3 mb-2 py-2 md:-mx-5"
      />
    </header>
  );
};
