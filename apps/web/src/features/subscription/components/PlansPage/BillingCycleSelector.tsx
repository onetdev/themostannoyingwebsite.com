import { ToggleGroup, ToggleGroupItem } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { type BillingCycle, BillingCycleList } from '../../schemas';

export interface BillingCycleSelectorProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}

export function BillingCycleSelector({
  billingCycle,
  setBillingCycle,
}: BillingCycleSelectorProps) {
  const t = useTranslations();

  return (
    <ToggleGroup
      className="bg-muted rounded-lg p-1"
      value={[billingCycle]}
      aria-label={t('subscription.landing.billing.label')}
      onValueChange={(value) => {
        const next = value[0];
        if (next) {
          setBillingCycle(next as BillingCycle);
        }
      }}
    >
      {BillingCycleList.map((cycle) => (
        <ToggleGroupItem
          key={cycle}
          value={cycle}
          className="aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          data-testid={`billing-cycle-${cycle}`}
          size="sm"
        >
          {t(`subscription.landing.billing.${cycle}`)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
