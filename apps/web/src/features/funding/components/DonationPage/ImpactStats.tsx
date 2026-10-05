'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@maw/ui-lib';
import { useLocale, useTranslations } from 'next-intl';
import { type ComponentProps, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

/**
 * Deliberately fictional figures. The whole point of this page is that the
 * project runs on fumes, so the "impact" is mostly a joke at its own expense.
 */
const MONTHS_OF_HISTORY = 6;

const MONTHLY_SUPPORT = [
  { received: 42, spent: 118 },
  { received: 17, spent: 121 },
  { received: 88, spent: 130 },
  { received: 5, spent: 126 },
  { received: 63, spent: 142 },
  { received: 9, spent: 151 },
] as const;

const HEADLINE_STATS: ReadonlyArray<{
  labelKey: AppTranslationKey;
  value: string;
}> = [
  { labelKey: 'funding.impactStats.items.burntThisMonth', value: '€151' },
  { labelKey: 'funding.impactStats.items.kebabsFunded', value: '0' },
  { labelKey: 'funding.impactStats.items.coffeesConsumed', value: '4,286' },
  { labelKey: 'funding.impactStats.items.ductTapeUsed', value: '62 m' },
  {
    labelKey: 'funding.impactStats.items.bugsShippedAsFeatures',
    value: '97%',
  },
];

export type ImpactStatsProps = ComponentProps<'section'>;

export function ImpactStats({ className, ...rest }: ImpactStatsProps) {
  const t = useTranslations();
  const locale = useLocale();

  const chartConfig = {
    received: {
      label: t('funding.impactStats.series.received'),
      color: 'var(--chart-1)',
    },
    spent: {
      label: t('funding.impactStats.series.spent'),
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig;

  const data = useMemo(() => {
    const monthFormatter = new Intl.DateTimeFormat(locale, {
      month: 'short',
    });
    const now = new Date();

    return MONTHLY_SUPPORT.map((month, index) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - (MONTHS_OF_HISTORY - 1 - index),
        1,
      );

      return {
        ...month,
        month: monthFormatter.format(date),
      };
    });
  }, [locale]);

  return (
    <section className={className} {...rest}>
      <h2 className="py-5">{t('funding.impactStats.heading')}</h2>
      <p className="pb-5">{t('funding.impactStats.description')}</p>

      <Card>
        <CardHeader>
          <CardTitle>{t('funding.impactStats.chart.title')}</CardTitle>
          <CardDescription>
            {t('funding.impactStats.chart.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-[280px] w-full"
            data-testid="impact-stats-chart"
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="received" fill="var(--color-received)" radius={4} />
              <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {HEADLINE_STATS.map(({ labelKey, value }) => (
          <div
            key={labelKey}
            className="border-border bg-card rounded-lg border p-4"
          >
            <dt className="text-muted-foreground text-sm">{t(labelKey)}</dt>
            <dd className="text-2xl font-bold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
