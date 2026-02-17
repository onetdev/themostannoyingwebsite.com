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
import { useTranslations } from 'next-intl';

import { BillingCycle, SubscriptionPackage } from '../../domain';

export interface PlanCardProps {
  plan: SubscriptionPackage;
  billingCycle: BillingCycle;
  extraDiscount?: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function PlanCard({
  plan,
  billingCycle,
  extraDiscount,
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

  return (
    <Card
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
              <div className="text-muted-foreground text-sm line-through">
                {t('plansPage.pricePerMonth', {
                  price: priceBase.toFixed(2),
                })}
              </div>
              <div className="text-primary flex items-center text-2xl font-bold">
                <span>
                  {t('plansPage.pricePerMonth', {
                    price: priceDiscountCorrected.toFixed(2),
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
            <div className="text-primary text-2xl font-bold">
              {t('plansPage.pricePerMonth', {
                price: priceBase.toFixed(2),
              })}
            </div>
          )}
          <div className="text-muted-foreground text-xs">
            {t(
              `plansPage.billing.billed${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}`,
            )}
          </div>
        </div>
        <p className="mb-4">{t(plan.descriptionKey)}</p>
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
