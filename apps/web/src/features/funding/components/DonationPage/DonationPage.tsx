import type { LanguageCode } from '@maw/content-sdk';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/core/i18n/navigation';
import { getAppConfigService } from '@/services';
import { getDonationSummary } from '../../services/get-donation-summary';
import { CryptoWalletList } from './CryptoWalletList';
import { DonationCounter } from './DonationCounter';
import { DonationMethodCard } from './DonationMethodCard';
import { ImpactStats } from './ImpactStats';
import { JarAnimation } from './JarAnimation';

export { generateStaticParams } from '@/core/i18n/routing';

export async function DonationPage() {
  const { funding } = getAppConfigService().getAll();
  const locale = (await getLocale()) as LanguageCode;
  const t = await getTranslations();
  const donationSummary = await getDonationSummary(locale);
  const balance = donationSummary?.totals.balance ?? 0;

  const tRich = (key: AppTranslationKey) =>
    t.rich(key, {
      br: () => <br />,
    });

  return (
    <>
      <section className="mx-auto flex max-w-screen-md flex-col items-center gap-4 py-6 text-center">
        <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
          {t('funding.balanceEyebrow')}
        </p>
        <DonationCounter
          balance={balance}
          size="hero"
          data-testid="donation-balance"
        />
        <p className="text-muted-foreground max-w-prose text-sm">
          {t('funding.balanceCaption')}
        </p>
      </section>

      <div className="mt-10 lg:flex lg:flex-row lg:gap-10">
        <div className="lg:w-1/2">
          <p className="my-5 max-w-screen-md">{tRich('funding.description')}</p>
          <h2 className="py-5">{tRich('funding.moneyUsageHeading')}</h2>
          <p>{t('funding.moneyUsageDescription')}</p>
          <JarAnimation balance={balance} data-testid="jar-animation" />
        </div>
        <div className="lg:w-1/2">
          <h2 className="pb-5">{t('funding.classicMethods')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <DonationMethodCard
              icon="mugHot"
              title={t('funding.buyMeACoffee')}
              description={t('funding.methods.buyMeACoffee.description')}
              href={funding.buyMeACoffeeUrl}
              cta={t('funding.buyMeACoffee')}
            />
            <DonationMethodCard
              icon="handHoldingDollar"
              title={t('funding.payPal')}
              description={t('funding.methods.payPal.description')}
              href={funding.paypalUrl}
              cta={t('funding.payPal')}
            />
          </div>

          <h2 className="pt-8 pb-5">{t('funding.cryptoMethods')}</h2>
          <CryptoWalletList data-testid="crypto-wallet-list" />
          <p className="text-center">
            <Link href={funding.alternativeOptionsUrl} target="_blank">
              {t('funding.alternativeOptionsLink')}
            </Link>
          </p>
          <h2 className="py-5">{t('funding.disclaimer')}</h2>
          <p>
            <small>{tRich('funding.disclaimerDetails')}</small>
          </p>
        </div>
      </div>
      {donationSummary && (
        <ImpactStats summary={donationSummary} className="mt-10" />
      )}
    </>
  );
}
