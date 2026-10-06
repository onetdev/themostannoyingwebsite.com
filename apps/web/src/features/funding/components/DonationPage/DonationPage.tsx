import type { LanguageCode } from '@maw/content-sdk';
import { Card, CardContent, CardHeader, CardTitle } from '@maw/ui-lib';
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center md:col-span-2 lg:col-span-4">
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
      </Card>

      <Card className="flex items-center justify-center lg:col-span-2">
        <JarAnimation balance={balance} data-testid="jar-animation" />
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>{t('funding.moneyUsageHeading')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-sm">
          <p className="text-muted-foreground">
            {tRich('funding.description')}
          </p>
          <p>{t('funding.moneyUsageDescription')}</p>
        </CardContent>
      </Card>

      <DonationMethodCard
        className="lg:col-span-3"
        icon="mugHot"
        title={t('funding.buyMeACoffee')}
        description={t('funding.methods.buyMeACoffee.description')}
        href={funding.buyMeACoffeeUrl}
        cta={t('funding.buyMeACoffee')}
      />

      <DonationMethodCard
        className="lg:col-span-3"
        icon="handHoldingDollar"
        title={t('funding.payPal')}
        description={t('funding.methods.payPal.description')}
        href={funding.paypalUrl}
        cta={t('funding.payPal')}
      />

      <Card className="lg:col-span-3">
        <CardContent className="flex h-full flex-col items-start justify-center gap-3">
          <p className="font-semibold">
            {t('funding.alternativeOptionsHeading')}
          </p>
          <Link href={funding.alternativeOptionsUrl} target="_blank">
            {t('funding.alternativeOptionsLink')}
          </Link>
        </CardContent>
      </Card>

      <CryptoWalletList
        className="md:col-span-2 lg:col-span-6"
        data-testid="crypto-wallet-list"
      />

      <Card className="md:col-span-2 lg:col-span-6">
        <CardHeader>
          <CardTitle>{t('funding.disclaimer')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            {tRich('funding.disclaimerDetails')}
          </p>
        </CardContent>
      </Card>

      {donationSummary && <ImpactStats summary={donationSummary} />}
    </div>
  );
}
