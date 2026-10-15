import type { LanguageCode } from '@maw/content-sdk';
import { Card, CardContent, CardHeader, CardTitle } from '@maw/ui-lib';
import { getLocale, getTranslations } from 'next-intl/server';
import { getAppConfigService } from '@/services';
import { getDonationSummary } from '../../services/get-donation-summary';
import { resolveDisplayCurrency } from '../../utils/currency';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { DonationCounter } from './DonationCounter';
import { DonationFaq } from './DonationFaq';
import { DonationHero } from './DonationHero';
import { ImpactStats } from './ImpactStats';
import { SupportOptions } from './SupportOptions';

export { generateStaticParams } from '@/core/i18n/routing';

export async function DonationPage() {
  const { funding } = getAppConfigService().getAll();
  const locale = (await getLocale()) as LanguageCode;
  const t = await getTranslations();
  const donationSummary = await getDonationSummary(locale);
  const balance = donationSummary?.totals.balance ?? 0;

  const currency = resolveDisplayCurrency(locale, donationSummary?.rates);

  const tRich = (key: AppTranslationKey) =>
    t.rich(key, {
      br: () => <br />,
    });

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
      <div className="flex flex-col md:col-span-1 lg:col-span-3">
        <DonationHero
          summary={donationSummary}
          locale={locale}
          currency={currency}
        />

        <section className="mt-6 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-muted-foreground relative z-10 text-sm font-semibold tracking-[0.2em] uppercase">
            {t('funding.balanceEyebrow')}
          </p>
          <DonationCounter
            balance={balance}
            size="hero"
            className="relative z-10"
            data-testid="donation-balance"
            currency={currency}
            rates={donationSummary?.rates}
          />
        </section>
      </div>

      <SupportOptions
        funding={funding}
        tiers={donationSummary?.tiers ?? []}
        rates={donationSummary?.rates}
        currency={currency}
        locale={locale}
        className="md:col-span-1 lg:col-span-3"
      />

      <DonationFaq className="mx-auto w-full max-w-2xl md:col-span-2 lg:col-span-6" />

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:col-span-2 lg:col-span-6">
        <h2>{t('funding.beforeAfter.heading')}</h2>
        <BeforeAfterSlider
          beforeSrc={funding.assets.beforeImage}
          afterSrc={funding.assets.afterImage}
          beforeLabel={t('funding.beforeAfter.before')}
          afterLabel={t('funding.beforeAfter.after')}
          sliderLabel={t('funding.beforeAfter.sliderLabel')}
          data-testid="before-after-slider"
        />
        <p className="text-muted-foreground text-center text-sm">
          {t('funding.beforeAfter.caption')}
        </p>
      </section>

      {donationSummary && (
        <ImpactStats
          summary={donationSummary}
          currency={currency}
          rates={donationSummary.rates}
        />
      )}

      <Card className="md:col-span-2 lg:col-span-6">
        <CardHeader>
          <CardTitle>{t('funding.disclaimer')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {tRich('funding.disclaimerDetails')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
