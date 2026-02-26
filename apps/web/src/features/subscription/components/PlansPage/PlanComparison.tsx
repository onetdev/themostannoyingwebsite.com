'use client';

import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';

import type { SubscriptionFeature, SubscriptionPackage } from '../../schemas';

interface PlansPageProps {
  className?: string;
  features: SubscriptionFeature[];
  plans: SubscriptionPackage[];
}

export function PlanComparison({ className, features, plans }: PlansPageProps) {
  const t = useTranslations();

  return (
    <Table className={cn('w-full', className)}>
      <TableHeader>
        <TableRow>
          <TableHead className="py-4 pr-4 font-bold">
            {t('plansPage.table.features')}
          </TableHead>
          {plans.map((pkg) => (
            <TableHead
              key={pkg.key}
              className="px-4 py-4 text-center font-bold"
            >
              {t(pkg.titleKey)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((feature) => (
          <TableRow key={feature.id}>
            <TableCell className="py-4 pr-4">
              <div className="flex items-center gap-2">
                {feature.icon && <span>{feature.icon}</span>}
                <span>{t(feature.titleKey)}</span>
              </div>
            </TableCell>
            {plans.map((plan) => {
              const isSupported = plan.featureIds.includes(feature.id);
              return (
                <TableCell key={plan.key} className="px-4 py-4 text-center">
                  {isSupported ? (
                    <Icon icon="check" className="text-success mx-auto" />
                  ) : (
                    <Icon icon="close" className="text-muted mx-auto" />
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
