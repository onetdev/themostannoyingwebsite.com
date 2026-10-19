import type { LanguageCode } from '@maw/content-sdk';
import { Separator } from '@maw/ui-lib';
import { getLocale, getTranslations } from 'next-intl/server';
import { getAppConfigService } from '@/services';
import { getCurrencyRates } from '../../services/get-currency-rates';
import { getDonationSummary } from '../../services/get-donation-summary';
import { DONATION_BASE_CURRENCY } from '../../types';
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
  const [donationSummary, currencyRates] = await Promise.all([
    getDonationSummary(locale),
    getCurrencyRates(),
  ]);
  const balance = donationSummary?.totals.balance ?? {
    value: 0,
    currency: currencyRates?.base ?? DONATION_BASE_CURRENCY,
  };

  const tRich = (key: AppTranslationKey) =>
    t.rich(key, {
      br: () => <br />,
    });

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-y-12">
      <div className="flex flex-col gap-6">
        <section className="flex flex-col items-start gap-4 text-left">
          <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
            {t('funding.balanceEyebrow')}
          </p>
          <DonationCounter
            balance={balance}
            size="hero"
            data-testid="donation-balance"
          />
        </section>

        <DonationHero summary={donationSummary} />
      </div>

      <Separator className="flex w-full flex-col lg:hidden" />

      <SupportOptions
        funding={funding}
        tiers={donationSummary?.tiers ?? []}
        rates={currencyRates?.rates}
        baseCurrency={currencyRates?.base ?? DONATION_BASE_CURRENCY}
        locale={locale}
      />

      <Separator className="md:flex w-full flex-col lg:col-span-2" />

      <section className="flex w-full flex-col gap-4">
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

      <DonationFaq className="w-full" />

      {donationSummary && (
        <ImpactStats summary={donationSummary} className="lg:col-span-2" />
      )}

      <section className="lg:col-span-2">
        <h2 className="text-base font-semibold">{t('funding.disclaimer')}</h2>
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
          {tRich('funding.disclaimerDetails')}
        </p>
      </section>
    </div>
  );
}
