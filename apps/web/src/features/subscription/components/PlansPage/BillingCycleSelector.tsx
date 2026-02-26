import { Button } from '@maw/ui-lib';
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
    <div className="bg-muted inline-flex rounded-lg p-1">
      {BillingCycleList.map((cycle) => (
        <Button
          key={cycle}
          data-testid={`billing-cycle-${cycle}`}
          variant={billingCycle === cycle ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setBillingCycle(cycle)}
        >
          {t(`plansPage.billing.${cycle}`)}
        </Button>
      ))}
    </div>
  );
}
