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
    ? priceBase * (1 - extraDiscount / 100)
    : priceBase;

  return (
    <Card
      className={cn(
        'hover:border-primary relative flex max-w-[350px] min-w-[300px] shrink-0 flex-col overflow-hidden border-2 transition-colors md:min-w-[350px]',
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
          {extraDiscount ? (
            <>
              <div className="text-muted-foreground text-sm line-through">
                ${priceBase.toFixed(2)}/mo
              </div>
              <div className="text-primary flex items-center text-2xl font-bold">
                <span>${priceDiscountCorrected.toFixed(2)}/mo</span>
                <Badge className="ml-2">-{extraDiscount * 100}%</Badge>
              </div>
            </>
          ) : (
            <div className="text-primary text-2xl font-bold">
              ${priceBase.toFixed(2)}/mo
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
