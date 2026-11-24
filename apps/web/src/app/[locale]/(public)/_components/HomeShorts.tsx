import type { ShortVideoListItem } from '@maw/content-sdk';
import { getTranslations } from 'next-intl/server';

import { ShortCarousel } from '@/features/content/components/Shorts/ShortCarousel';

export interface HomeShortsProps {
  shorts: ShortVideoListItem[];
}

/**
 * Home-page shorts shelf. Renders nothing when the Content API has no clips,
 * including the heading band, so the homepage never shows an empty section.
 */
export async function HomeShorts({ shorts }: HomeShortsProps) {
  if (shorts.length === 0) {
    return null;
  }

  const t = await getTranslations('content.shorts');

  return (
    <>
      <div className="border-border col-span-1 my-4 border-t-5 border-b-5 border-double p-5 text-center lg:col-span-4 lg:my-6">
        <h2 className="text-xl font-light">{t('archiveTitle')}</h2>
      </div>
      <section
        className="col-span-1 lg:col-span-4"
        data-testid="home-shorts"
        data-track-section="content:home:shorts"
      >
        <ShortCarousel
          shorts={shorts}
          ctaLabel={t('viewAll')}
          ctaTrack="content:home:shorts:view-all"
        />
      </section>
    </>
  );
}
