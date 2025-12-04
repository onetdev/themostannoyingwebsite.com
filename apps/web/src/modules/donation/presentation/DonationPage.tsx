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
        <h2 className="py-5">Let's put money into the jar!</h2>
        <p className="max-w-screen-md">
          Don’t you hate it when there are no more cookies left in the jar? Or
          how difficult it is to buy a house these days? When you step into a
          puddle in the bathroom and it turns out it’s not water but a secretion
          from that cat you’ve only been looking after for a few days? Let’s
          stop this madness. Instead of taking from this jar, we should be
          putting into it — we’ve done our part.
        </p>
        <JarAnimation />
        <h2 className="py-5">Top donors</h2>
        <h4>🥇 Kidney</h4>
        <h5>🥈 Liver</h5>
        <h6>🥉 Heart</h6>
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
          <Link href={donation.alternativeOptionsUrl} target="_blank">
            Click here for other means of supporting 😏
          </Link>
        </p>
      </div>
    </div>
  );
}
