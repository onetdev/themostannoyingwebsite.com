import type { LanguageCode } from '@maw/content-sdk';
import { Button } from '@maw/ui-lib';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/core/i18n/navigation';
import { getAppConfigService } from '@/services';
import { getDonationSummary } from '../../services/get-donation-summary';
import { CryptoWalletList } from './CryptoWalletList';
import { DonationCounter } from './DonationCounter';
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
      <div className="lg:flex lg:flex-row lg:gap-10">
        <div className="lg:w-1/2">
          <p className="my-5 max-w-screen-md">{tRich('funding.description')}</p>
          <h2 className="py-5">{tRich('funding.moneyUsageHeading')}</h2>
          <p>{t('funding.moneyUsageDescription')}</p>
          <JarAnimation balance={balance} data-testid="jar-animation" />
        </div>
        <div className="lg:w-1/2">
          <h2 className="py-5">{t('funding.totalSupportReceived')}</h2>
          <DonationCounter balance={balance} data-testid="donation-balance" />

          <h2 className="pt-8">{t('funding.classicMethods')}</h2>
          <div className="my-5 flex w-full max-w-screen-md flex-col justify-center gap-3 md:flex-row">
            <Button asChild size="lg" className="md:w-1/2">
              <Link href={funding.buyMeACoffeeUrl}>
                {t('funding.buyMeACoffee')}
              </Link>
            </Button>
            <Button size="lg" asChild className="md:w-1/2">
              <Link href={funding.paypalUrl}>{t('funding.payPal')}</Link>
            </Button>
          </div>
          <h2 className="pt-8">{t('funding.cryptoMethods')}</h2>
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
