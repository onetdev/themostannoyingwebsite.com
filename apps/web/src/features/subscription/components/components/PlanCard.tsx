import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { formatCurrency } from '@maw/utils/formatter';
import { useTranslations } from 'next-intl';

import {
  BILLING_CYCLE_MONTH_MAP,
  BillingCycle,
  SubscriptionPackage,
} from '../../domain';

export interface PlanCardProps {
  plan: SubscriptionPackage;
  billingCycle: BillingCycle;
  extraDiscountPercentage?: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function PlanCard({
  plan,
  billingCycle,
  extraDiscountPercentage: extraDiscount,
  isSelected,
  onSelect,
}: PlanCardProps) {
  const t = useTranslations();

  const priceBase = plan.monthlyPriceByCycle[billingCycle];
  const priceDiscountCorrected = extraDiscount
    ? priceBase * (1 - extraDiscount)
    : priceBase;
  const cumulativeDiscountPercentage =
    1 - priceDiscountCorrected / plan.monthlyPriceByCycle['monthly'];

  const totalCharge =
    priceDiscountCorrected * BILLING_CYCLE_MONTH_MAP[billingCycle];

  return (
    <Card
      data-testid={`plan-card-${plan.key}`}
      className={cn(
        'hover:border-primary relative flex w-full max-w-sm shrink-0 flex-col overflow-hidden border-2 transition-colors',
        isSelected ? 'border-primary' : 'border-border',
      )}>
      {plan.isPopular && (
        <>
          <div
            className={cn(
              'bg-primary text-primary-foreground absolute top-0 w-full px-3 py-2 text-center text-xs font-bold tracking-wider uppercase shadow-sm',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground',
            )}>
            {t('plansPage.mostPopular')}
          </div>
          <Separator />
        </>
      )}
      <CardHeader>
        <div className="mb-2 text-4xl">{plan.icon}</div>
        <CardTitle>{t(plan.titleKey)}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <div className="mb-5 flex flex-col">
          {cumulativeDiscountPercentage ? (
            <>
              <div
                className="text-muted-foreground text-sm line-through"
                data-testid="original-price">
                {t('plansPage.pricePerMonth', {
                  price: formatCurrency(priceBase),
                })}
              </div>
              <div
                className="text-primary flex items-center text-2xl font-bold"
                data-testid="discounted-price">
                <span>
                  {t('plansPage.pricePerMonth', {
                    price: formatCurrency(priceDiscountCorrected),
                  })}
                </span>
                <Badge className="ml-2">
                  {t('plansPage.discount', {
                    amount: Math.round(cumulativeDiscountPercentage * 100),
                  })}
                </Badge>
              </div>
            </>
          ) : (
            <div
              className="text-primary text-2xl font-bold"
              data-testid="original-price">
              {t('plansPage.pricePerMonth', {
                price: formatCurrency(priceBase),
              })}
            </div>
          )}
        </div>
        <p className="mb-4">{t(plan.descriptionKey)}</p>
        <Separator />
        <div
          className="text-muted-foreground mt-2 text-xs leading-tight italic"
          data-testid="charge-disclaimer">
          {t('plansPage.billing.chargeDisclaimer', {
            amount: formatCurrency(totalCharge),
          })}{' '}
          &mdash; {t(`plansPage.billing.cycle.${billingCycle}`)}*
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isSelected ? 'default' : 'outline'}
          onClick={onSelect}>
          {isSelected ? t('common.done') : t('common.select')}
        </Button>
      </CardFooter>
    </Card>
  );
}
