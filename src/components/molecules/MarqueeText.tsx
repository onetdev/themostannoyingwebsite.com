import Link from 'next/link';
import { FunctionComponent, useState } from 'react';
import MarqueePlugin from 'react-fast-marquee';

import { ArticleService } from '@/features/articles';
import { useUserPreferencesStore } from '@/lib/state/user_preferences';

export type MarqueeTextProps = {
  className?: string;
};

const MarqueeText: FunctionComponent<MarqueeTextProps> = ({ className }) => {
  const flashing = useUserPreferencesStore((state) => state.enableFlashing);
  const [items] = useState(
    ArticleService.getMany({
      params: { isHighlighted: true },
      paginate: { take: 10 },
    }).items,
  );
  const [speed, setSpeed] = useState(100);

  const onEnter = () => setSpeed(2000);
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
              data-anim={flashing ? 'flashing' : 'highlight'}
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
