import { Icon } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';

import { AppDarkModeToggle } from './AppDarkModeToggle';
import { ArticleMarquee } from './ArticleMarquee';
import SearchForm from './SearchForm';
import { SiteNavigation } from './SiteNavigation';
import { ActiveNavigationItem } from './types';
import { UserNavigation } from './UserNavigation';

import { Link } from '@/i18n/navigation';
import { AppArticleService } from '@/modules/content';

type AppHeaderProps = {
  activeItem?: ActiveNavigationItem;
};

export async function AppHeader({ activeItem }: AppHeaderProps) {
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
            <span>
              <span className="text-primary">Most</span> Annoying Website
            </span>
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
      <SiteNavigation activeItem={activeItem} />
      <UserNavigation activeItem={activeItem} className="col-span-1 my-3" />
      <ArticleMarquee
        items={marqueeItems}
        className="bg-surface-alt col-span-2 -mx-3 mb-2 py-2 md:-mx-5"
      />
    </header>
  );
}
