import type { LanguageCode } from '@maw/content-sdk';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from '@maw/ui-lib';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/core/i18n/navigation';
import { getAppConfigService } from '@/services';
import { getDonationSummary } from '../../services/get-donation-summary';
import { CryptoWallet } from './CryptoWallet';
import { DonationCounter } from './DonationCounter';
import { DonationFaq } from './DonationFaq';
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="relative flex flex-col items-center justify-center gap-4 overflow-hidden p-10 py-14 text-center md:col-span-2 lg:col-span-6">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -right-6 -translate-y-1/2 opacity-20 select-none"
        >
          <JarAnimation
            balance={balance}
            className="h-72 w-auto md:h-[22rem]"
            data-testid="jar-animation"
          />
        </div>
        <p className="text-muted-foreground relative z-10 text-sm font-semibold tracking-[0.2em] uppercase">
          {t('funding.balanceEyebrow')}
        </p>
        <DonationCounter
          balance={balance}
          size="hero"
          className="relative z-10"
          data-testid="donation-balance"
        />
        <p className="text-muted-foreground relative z-10 max-w-prose text-sm">
          {t('funding.balanceCaption')}
        </p>
      </Card>

      <DonationFaq className="lg:col-span-3" />

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>{t('funding.classicMethods')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <Link href={funding.buyMeACoffeeUrl} target="_blank">
              <Icon icon="mugHot" aria-hidden />
              {t('funding.buyMeACoffee')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full">
            <Link href={funding.paypalUrl} target="_blank">
              <Icon icon="handHoldingDollar" aria-hidden />
              {t('funding.payPal')}
            </Link>
          </Button>
          <Link
            href={funding.alternativeOptionsUrl}
            target="_blank"
            className="text-center text-sm"
          >
            {t('funding.alternativeOptionsLink')}
          </Link>
        </CardContent>
      </Card>

      <CryptoWallet
        className="lg:col-span-3"
        data-testid="crypto-wallet-btc"
        title={t('funding.crypto.bitcoin')}
        address={funding.btcWallet.address}
        network={funding.btcWallet.network}
      />
      <CryptoWallet
        className="lg:col-span-3"
        data-testid="crypto-wallet-eth"
        title={t('funding.crypto.ethereum')}
        address={funding.ethWallet.address}
        network="Mainnet"
      />

      {donationSummary && <ImpactStats summary={donationSummary} />}

      <Card className="md:col-span-2 lg:col-span-6">
        <CardContent className="py-4">
          <p className="text-muted-foreground text-xs leading-relaxed">
            {tRich('funding.disclaimerDetails')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
