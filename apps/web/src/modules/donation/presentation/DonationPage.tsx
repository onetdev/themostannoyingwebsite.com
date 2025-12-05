import { Button } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';

import { CryptoWalletList, DonationBalance, JarAnimation } from './components';

import { Link } from '@/i18n/navigation';
import { getAppConfigService } from '@/kernel';
export { generateStaticParams } from '@/i18n/routing';

export async function DonationPage() {
  const { donation } = getAppConfigService().getAll();
  const t = await getTranslations();

  return (
    <div className="lg:flex lg:flex-row lg:gap-5">
      <div className="lg:w-1/2">
        <p className="my-5 max-w-screen-md">{t('app.donate.description')}</p>
        <h2 className="py-5">{t('app.donate.moneyUsageHeading')}</h2>
        <p>{t('app.donate.moneyUsageDescription')}</p>
        <JarAnimation />
        <h2 className="py-5">{t('app.donate.topSupporters')}</h2>
        <p className="pb-5">{t('app.donate.topSupportersDescription')}</p>
        <h4>{t('app.donate.topSupporterKidney')}</h4>
        <h5>{t('app.donate.topSupporterLiver')}</h5>
        <h6>{t('app.donate.topSupporterHeart')}</h6>
      </div>
      <div className="lg:w-1/2">
        <h2 className="py-5">{t('app.donate.totalSupportReceived')}</h2>
        <DonationBalance />

        <h2 className="pt-8">{t('app.donate.classicMethods')}</h2>
        <div className="my-5 flex w-full max-w-screen-md flex-col justify-center gap-3 md:flex-row">
          <Button size="2xl" variant="primary" className="md:w-1/2">
            {t('app.donate.buyMeACoffee')}
          </Button>
          <Button size="2xl" variant="primary" className="md:w-1/2">
            {t('app.donate.payPal')}
          </Button>
          {/* TODO: share should be added here */}
        </div>
        <h2 className="pt-8">{t('app.donate.cryptoMethods')}</h2>
        <CryptoWalletList />
        <p className="text-center">
          <Link href={donation.alternativeOptionsUrl} target="_blank">
            {t('app.donate.alternativeOptionsLink')}
          </Link>
        </p>
        <h2 className="py-5">{t('app.donate.disclaimer')}</h2>
        <p>
          <small>{t('app.donate.disclaimerParagraph1')}</small>
        </p>

        <p>
          <small>{t('app.donate.disclaimerParagraph2')}</small>
        </p>

        <p>
          <small>{t('app.donate.disclaimerParagraph3')}</small>
        </p>
      </div>
    </div>
  );
}
