'use client';

import { ArticleDatum } from '@maw/content-api';
import { MarqueeText } from '@maw/ui-lib';

import { Link } from '@/i18n/navigation';

const NavItem = (item: ArticleDatum) => {
  const path = '/articles/' + item.slug;
  return (
    <Link
      href={path}
      passHref
      prefetch={false}
      className="as-text mx-8 inline-block px-2">
      {item.title}
    </Link>
  );
};

type ArticleMarqueeProps = {
  items: ArticleDatum[];
  className?: string;
};

export const ArticleMarquee = ({ items, className }: ArticleMarqueeProps) => {
  return (
    <MarqueeText items={items} className={className} ItemComponent={NavItem} />
  );
};
