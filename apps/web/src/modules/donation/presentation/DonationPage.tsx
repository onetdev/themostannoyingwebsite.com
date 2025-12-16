import { Button } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';

import { CryptoWalletList, DonationCounter, JarAnimation } from './components';

import { Link } from '@/i18n/navigation';
import { getAppConfigService } from '@/kernel';
export { generateStaticParams } from '@/i18n/routing';

export async function DonationPage() {
  const { donation } = getAppConfigService().getAll();
  const t = await getTranslations();

  const tRich = (key: string) =>
    t.rich(key, {
      br: () => <br />,
    });

  return (
    <div className="lg:flex lg:flex-row lg:gap-10">
      <div className="lg:w-1/2">
        <p className="my-5 max-w-screen-md">
          {tRich('app.donate.description')}
        </p>
        <h2 className="py-5">{tRich('app.donate.moneyUsageHeading')}</h2>
        <p>{t('app.donate.moneyUsageDescription')}</p>
        <JarAnimation data-testid="jar-animation" />
        <h2 className="py-5">{t('app.donate.topSupporters')}</h2>
        <p className="pb-5">{t('app.donate.topSupportersDescription')}</p>
        <h4>{t('app.donate.topSupporterKidney')}</h4>
        <h5>{t('app.donate.topSupporterLiver')}</h5>
        <h6>{t('app.donate.topSupporterHeart')}</h6>
      </div>
      <div className="lg:w-1/2">
        <h2 className="py-5">{t('app.donate.totalSupportReceived')}</h2>
        <DonationCounter data-testid="donation-balance" />

        <h2 className="pt-8">{t('app.donate.classicMethods')}</h2>
        <div className="my-5 flex w-full max-w-screen-md flex-col justify-center gap-3 md:flex-row">
          <Button size="2xl" variant="primary" className="md:w-1/2">
            {t('app.donate.buyMeACoffee')}
          </Button>
          <Button size="2xl" variant="primary" className="md:w-1/2">
            {t('app.donate.payPal')}
          </Button>
        </div>
        <h2 className="pt-8">{t('app.donate.cryptoMethods')}</h2>
        <CryptoWalletList data-testid="crypto-wallet-list" />
        <p className="text-center">
          <Link href={donation.alternativeOptionsUrl} target="_blank">
            {t('app.donate.alternativeOptionsLink')}
          </Link>
        </p>
        <h2 className="py-5">{t('app.donate.disclaimer')}</h2>
        <p>
          <small>{tRich('app.donate.disclaimerDetails')}</small>
        </p>
      </div>
    </div>
  );
}
