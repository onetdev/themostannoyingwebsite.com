'use client';

import { Link } from '@/root/apps/web/src/i18n/navigation';
import { FunctionComponent, useState } from 'react';
import MarqueePlugin from 'react-fast-marquee';

import { ArticleService } from '@/root/apps/web/src/features/content';
import { useRuntimeStore } from '@/root/apps/web/src/lib/state/runtime';

export type MarqueeTextProps = {
  className?: string;
};

const MarqueeText: FunctionComponent<MarqueeTextProps> = ({ className }) => {
  const reducedMotion = useRuntimeStore((state) => state.reducedMotion);
  const [items] = useState(
    ArticleService.getMany({
      params: { isHighlighted: true },
      paginate: { take: 10 },
    }).items,
  );
  const [speed, setSpeed] = useState(100);

  const onEnter = () => {
    if (reducedMotion) return;
    setSpeed(2000);
  };
  const onLeave = () => setSpeed(100);

  return (
    <div
      className={`${className} z-10 overflow-hidden`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}>
      <MarqueePlugin gradient={false} speed={speed}>
        {items.map(({ slug, title }, index) => {
          const path = '/articles/' + slug;
          return (
            <Link
              href={path}
              key={index}
              passHref
              prefetch={false}
              className="mx-8 inline-block px-2">
              {title}
            </Link>
          );
        })}
      </MarqueePlugin>
    </div>
  );
};

export default MarqueeText;
