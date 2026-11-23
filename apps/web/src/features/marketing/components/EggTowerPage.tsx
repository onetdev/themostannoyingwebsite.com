import { Badge, PageHeadline } from '@maw/ui-lib';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { EGG_TOWER_PROMO } from '@/features/marketing/egg-tower';

/**
 * Placeholder page for the upcoming Egg Tower game. The poster keeps the page
 * lightweight and avoids autoplaying a second copy of the sticky teaser.
 */
export async function EggTowerPage() {
  const t = await getTranslations('marketing.eggTower');

  return (
    <div className="mx-auto w-full max-w-3xl" data-testid="egg-tower-page">
      <PageHeadline>{t('title')}</PageHeadline>
      <p className="text-muted-foreground mb-6 max-w-2xl text-lg">
        {t('description')}
      </p>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-black">
        <Image
          src={EGG_TOWER_PROMO.posterSrc}
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute start-3 top-3 border-transparent bg-black/65 text-white backdrop-blur-sm"
        >
          {t('status')}
        </Badge>
      </div>
      <p className="text-muted-foreground mt-4">{t('comingSoon')}</p>
    </div>
  );
}
