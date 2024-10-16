import Link from 'next/link';
import { FunctionComponent, useState } from 'react';
import MarqueePlugin from 'react-fast-marquee';

import { ArticleService } from '@/features/articles';
import { useUserPreferencesStore } from '@/state/user_preferences';

export type MarqueeProps = {
  className?: string;
};

const Marquee: FunctionComponent<MarqueeProps> = ({ className }) => {
  const flashing = useUserPreferencesStore((state) => state.enableFlashing);
  const [items] = useState(
    ArticleService.getAllFiltered({
      props: { isHighlighted: true },
      paginate: { take: 10 },
    }),
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
              className="mx-8 inline-block text-background data-[anim=flashing]:animate-flashing-error data-[anim=highlight]:animate-highlight ">
              {title}
            </Link>
          );
        })}
      </MarqueePlugin>
    </div>
  );
};

export default Marquee;
