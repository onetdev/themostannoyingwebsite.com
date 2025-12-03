import { Button } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';

import { CryptoWalletList, DonationBalance, JarAnimation } from './components';

import config from '@/config';
import { Link } from '@/i18n/navigation';
export { generateStaticParams } from '@/i18n/routing';

export async function DonationPage() {
  const t = await getTranslations();

  return (
    <div className="lg:flex lg:flex-row lg:gap-5">
      <div className="lg:w-1/2">
        <div className="my-5 max-w-screen-md">
          {t('app.donate.description')}
        </div>
        <JarAnimation />
      </div>
      <div className="lg:w-1/2">
        <h2 className="py-5">Total Donations Received</h2>
        <DonationBalance />

        <h2 className="pt-8">Classic methods</h2>
        <div className="my-5 flex w-full max-w-screen-md flex-col justify-center gap-3 md:flex-row">
          <Button size="2xl" variant="primary" className="md:w-1/2">
            Buy Me A Coffee
          </Button>
          <Button size="2xl" variant="primary" className="md:w-1/2">
            PayPay
          </Button>
          {/* TODO: share should be added here */}
        </div>
        <h2 className="pt-8">Crypto methods</h2>
        <CryptoWalletList />
        <p className="text-center">
          <Link href={config.donation.alternativeOptionsUrl} target="_blank">
            Click here for other means of supporting 😏
          </Link>
        </p>
      </div>
    </div>
  );
}
