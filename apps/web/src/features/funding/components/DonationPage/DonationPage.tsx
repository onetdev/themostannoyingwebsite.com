import { Button } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAppConfigService } from '@/services';
import { CryptoWalletList } from './CryptoWalletList';
import { DonationCounter } from './DonationCounter';
import { JarAnimation } from './JarAnimation';

export { generateStaticParams } from '@/i18n/routing';

export async function DonationPage() {
  const { donation } = getAppConfigService().getAll();
  const t = await getTranslations();

  const tRich = (key: AppTranslationKey) =>
    t.rich(key, {
      br: () => <br />,
    });

  return (
    <div className="lg:flex lg:flex-row lg:gap-10">
      <div className="lg:w-1/2">
        <p className="my-5 max-w-screen-md">{tRich('funding.description')}</p>
        <h2 className="py-5">{tRich('funding.moneyUsageHeading')}</h2>
        <p>{t('funding.moneyUsageDescription')}</p>
        <JarAnimation data-testid="jar-animation" />
        <h2 className="py-5">{t('funding.topSupporters')}</h2>
        <p className="pb-5">{t('funding.topSupportersDescription')}</p>
        <h4>{t('funding.topSupporterKidney')}</h4>
        <h5>{t('funding.topSupporterLiver')}</h5>
        <h6>{t('funding.topSupporterHeart')}</h6>
      </div>
      <div className="lg:w-1/2">
        <h2 className="py-5">{t('funding.totalSupportReceived')}</h2>
        <DonationCounter data-testid="donation-balance" />

        <h2 className="pt-8">{t('funding.classicMethods')}</h2>
        <div className="my-5 flex w-full max-w-screen-md flex-col justify-center gap-3 md:flex-row">
          <Button asChild size="lg" className="md:w-1/2">
            <Link href={donation.buyMeACoffeeUrl}>
              {t('funding.buyMeACoffee')}
            </Link>
          </Button>
          <Button size="lg" asChild className="md:w-1/2">
            <Link href={donation.paypalUrl}>{t('funding.payPal')}</Link>
          </Button>
        </div>
        <h2 className="pt-8">{t('funding.cryptoMethods')}</h2>
        <CryptoWalletList data-testid="crypto-wallet-list" />
        <p className="text-center">
          <Link href={donation.alternativeOptionsUrl} target="_blank">
            {t('funding.alternativeOptionsLink')}
          </Link>
        </p>
        <h2 className="py-5">{t('funding.disclaimer')}</h2>
        <p>
          <small>{tRich('funding.disclaimerDetails')}</small>
        </p>
      </div>
    </div>
  );
}
