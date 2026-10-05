'use client';

import type {
  DonationStat,
  DonationSummary,
  DonationSupporter,
} from '@maw/content-sdk';
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
  Icon,
  type IconAliaseKey,
} from '@maw/ui-lib';
import { useLocale, useTranslations } from 'next-intl';
import { type ComponentProps, useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
} from 'recharts';

export type ImpactStatsProps = {
  summary: DonationSummary;
} & ComponentProps<'section'>;

const SUPPORTER_MEDALS: Record<DonationSupporter['tier'], string> = {
  gold: '🥇',
  silver: '🥈',
  bronze: '🥉',
};

const SUPPORTER_LABEL_KEYS: Record<string, AppTranslationKey> = {
  kidney: 'funding.topSupporterKidney',
  liver: 'funding.topSupporterLiver',
  heart: 'funding.topSupporterHeart',
};

const TREND_ICONS: Record<DonationStat['trend']['direction'], IconAliaseKey> = {
  up: 'chevronUp',
  down: 'chevronDown',
  stagnant: 'chevronRight',
};

const TREND_SENTIMENT_CLASSES: Record<
  DonationStat['trend']['sentiment'],
  string
> = {
  positive: 'text-success',
  negative: 'text-error',
  neutral: 'text-muted-foreground',
};

const TREND_DIRECTION_LABEL_KEYS: Record<
  DonationStat['trend']['direction'],
  AppTranslationKey
> = {
  up: 'funding.impactStats.trend.increased',
  down: 'funding.impactStats.trend.decreased',
  stagnant: 'funding.impactStats.trend.stagnant',
};

export function ImpactStats({ summary, className, ...rest }: ImpactStatsProps) {
  const t = useTranslations();
  const locale = useLocale();

  const stats = summary.stats;
  const supporters = summary.supporters;

  const { monthlyData, cumulativeData, formatStatValue, formatPercent } =
    useMemo(() => {
      const monthFormatter = new Intl.DateTimeFormat(locale, {
        month: 'short',
        timeZone: 'UTC',
      });

      const monthly = summary.monthly.map((entry) => {
        const [year, month] = entry.month.split('-').map(Number);
        const date = new Date(Date.UTC(year, month - 1, 1));

        return {
          label: monthFormatter.format(date),
          // Expenses are plotted below zero so the bars drop into the minus.
          expenses: -entry.expenses,
          donations: entry.donations,
        };
      });

      let runningExpenses = 0;
      const cumulative = monthly.map((entry) => {
        runningExpenses += entry.expenses;

        return {
          label: entry.label,
          cumulativeExpenses: runningExpenses,
        };
      });

      const numberFormats: Record<string, Intl.NumberFormat> = {
        currency: new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: summary.currency,
          maximumFractionDigits: 0,
        }),
        integer: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
        percent: new Intl.NumberFormat(locale, {
          style: 'percent',
          maximumFractionDigits: 0,
        }),
        ratio: new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
        duration: new Intl.NumberFormat(locale, {
          style: 'unit',
          unit: 'second',
          unitDisplay: 'short',
        }),
      };

      return {
        monthlyData: monthly,
        cumulativeData: cumulative,
        formatStatValue: (stat: DonationStat) => {
          const formatter = numberFormats[stat.format] ?? numberFormats.integer;
          return formatter.format(
            stat.format === 'percent' ? stat.value / 100 : stat.value,
          );
        },
        formatPercent: (value: number) =>
          numberFormats.percent.format(value / 100),
      };
    }, [locale, summary.currency, summary.monthly]);

  const monthlyConfig = {
    donations: {
      label: t('funding.impactStats.series.donations'),
      color: 'var(--chart-2)',
    },
    expenses: {
      label: t('funding.impactStats.series.expenses'),
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig;

  const cumulativeConfig = {
    cumulativeExpenses: {
      label: t('funding.impactStats.series.cumulativeExpenses'),
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig;

  return (
    <section className={className} {...rest}>
      <h2 className="py-5">{t('funding.impactStats.heading')}</h2>
      <p className="pb-5">{t('funding.impactStats.description')}</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.id} data-testid={`impact-stat-${stat.id}`}>
            <CardContent className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm">
                {t(stat.labelKey as AppTranslationKey)}
              </span>
              <span className="text-2xl font-bold">
                {formatStatValue(stat)}
              </span>
              <span
                className={`flex items-center gap-1 text-sm ${TREND_SENTIMENT_CLASSES[stat.trend.sentiment]}`}
              >
                <Icon icon={TREND_ICONS[stat.trend.direction]} aria-hidden />
                {formatPercent(stat.trend.percent)}
                <span className="sr-only">
                  {t(TREND_DIRECTION_LABEL_KEYS[stat.trend.direction])}
                </span>
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('funding.impactStats.monthly.title')}</CardTitle>
            <CardDescription>
              {t('funding.impactStats.monthly.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={monthlyConfig}
              className="h-[260px] w-full"
              data-testid="impact-stats-monthly-chart"
            >
              <BarChart accessibilityLayer data={monthlyData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ReferenceLine y={0} stroke="var(--border)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="donations"
                  fill="var(--color-donations)"
                  radius={4}
                />
                <Bar
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('funding.impactStats.cumulative.title')}</CardTitle>
            <CardDescription>
              {t('funding.impactStats.cumulative.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={cumulativeConfig}
              className="h-[260px] w-full"
              data-testid="impact-stats-cumulative-chart"
            >
              <AreaChart accessibilityLayer data={cumulativeData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ReferenceLine y={0} stroke="var(--border)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="cumulativeExpenses"
                  fill="var(--color-cumulativeExpenses)"
                  fillOpacity={0.3}
                  stroke="var(--color-cumulativeExpenses)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <h2 className="py-5">{t('funding.topSupporters')}</h2>
      <p className="pb-5">{t('funding.topSupportersDescription')}</p>
      <ul className="flex flex-col gap-2">
        {supporters.map((supporter) => (
          <li
            key={supporter.id}
            className="flex items-center gap-2"
            data-testid={`impact-supporter-${supporter.id}`}
          >
            <span aria-hidden>{SUPPORTER_MEDALS[supporter.tier]}</span>
            <span>
              {SUPPORTER_LABEL_KEYS[supporter.id]
                ? t(SUPPORTER_LABEL_KEYS[supporter.id])
                : supporter.id}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
