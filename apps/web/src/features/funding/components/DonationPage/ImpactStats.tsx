'use client';

import type {
  DonationStat,
  DonationSummary,
  DonationSupporter,
} from '@maw/content-sdk';
import {
  Card,
  CardContent,
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
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
} from 'recharts';

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

const STAT_ICONS: Record<string, IconAliaseKey> = {
  moneyBurnt: 'fire',
  coffeesConsumed: 'mugHot',
  bugsShippedAsFeatures: 'bug',
  kebabBudgetRemaining: 'utensils',
  sanityRemaining: 'brain',
};

const TIER_RANK: Record<DonationSupporter['tier'], number> = {
  gold: 0,
  silver: 1,
  bronze: 2,
};

const SUPPORTER_TIER_BARS: Record<DonationSupporter['tier'], string> = {
  gold: 'h-24 bg-warning',
  silver: 'h-16 bg-muted-foreground/40',
  bronze: 'h-12 bg-tertiary/50',
};

function createFormatters(locale: string, currency: string) {
  return {
    currency: new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
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
}

function formatStatValue(
  formatters: ReturnType<typeof createFormatters>,
  stat: DonationStat,
) {
  const formatter = formatters[stat.format] ?? formatters.integer;
  return formatter.format(
    stat.format === 'percent' ? stat.value / 100 : stat.value,
  );
}

function buildChartData(summary: DonationSummary, locale: string) {
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    timeZone: 'UTC',
  });

  const monthlyData = summary.monthly.map((entry) => {
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
  const cumulativeData = monthlyData.map((entry) => {
    runningExpenses += entry.expenses;

    return {
      label: entry.label,
      cumulativeExpenses: runningExpenses,
    };
  });

  return { monthlyData, cumulativeData };
}

function ImpactStatCard({
  stat,
  currency,
}: {
  stat: DonationStat;
  currency: string;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const sentimentClass = TREND_SENTIMENT_CLASSES[stat.trend.sentiment];

  const formatted = useMemo(
    () => formatStatValue(createFormatters(locale, currency), stat),
    [locale, currency, stat],
  );

  const formattedTrend = useMemo(
    () =>
      createFormatters(locale, currency).percent.format(
        stat.trend.percent / 100,
      ),
    [locale, currency, stat.trend.percent],
  );

  return (
    <Card
      className="hover:border-primary/40 transition-colors lg:col-span-2"
      data-testid={`impact-stat-${stat.id}`}
    >
      <CardContent className="flex flex-col gap-3">
        <span
          aria-hidden
          className={`bg-muted flex size-10 items-center justify-center rounded-lg ${sentimentClass}`}
        >
          <Icon icon={STAT_ICONS[stat.id] ?? 'tags'} />
        </span>
        <span className="text-2xl font-bold tracking-tight">{formatted}</span>
        <span className="text-muted-foreground text-sm">
          {t(stat.labelKey as AppTranslationKey)}
        </span>
        <span
          className={`flex items-center gap-1 text-sm font-medium ${sentimentClass}`}
        >
          <Icon icon={TREND_ICONS[stat.trend.direction]} aria-hidden />
          {formattedTrend}
          <span className="sr-only">
            {t(TREND_DIRECTION_LABEL_KEYS[stat.trend.direction])}
          </span>
        </span>
      </CardContent>
    </Card>
  );
}

function SupportersPodium({ supporters }: { supporters: DonationSupporter[] }) {
  const t = useTranslations();

  const podiumOrder = useMemo(() => {
    const sorted = [...supporters].sort(
      (a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier],
    );

    // Put the winner on the middle step.
    if (sorted.length === 3) {
      return [sorted[1], sorted[0], sorted[2]];
    }

    return sorted;
  }, [supporters]);

  return (
    <Card className="flex flex-col justify-end lg:col-span-2">
      <CardContent className="flex flex-col gap-4">
        <span className="text-muted-foreground text-sm">
          {t('funding.topSupporters')}
        </span>
        <ul className="flex items-end justify-center gap-3">
          {podiumOrder.map((supporter) => (
            <li
              key={supporter.id}
              className="flex w-full flex-col items-center gap-2"
              data-testid={`impact-supporter-${supporter.id}`}
            >
              <span aria-hidden className="text-3xl">
                {SUPPORTER_MEDALS[supporter.tier]}
              </span>
              <span className="text-center text-sm font-semibold">
                {SUPPORTER_LABEL_KEYS[supporter.id]
                  ? t(SUPPORTER_LABEL_KEYS[supporter.id])
                  : supporter.id}
              </span>
              <span
                aria-hidden
                className={`w-full rounded-t-lg ${SUPPORTER_TIER_BARS[supporter.tier]}`}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function MonthlyChartCard({ summary }: { summary: DonationSummary }) {
  const t = useTranslations();
  const locale = useLocale();
  const { monthlyData } = useMemo(
    () => buildChartData(summary, locale),
    [summary, locale],
  );

  const config = {
    donations: {
      label: t('funding.impactStats.series.donations'),
      color: 'var(--chart-2)',
    },
    expenses: {
      label: t('funding.impactStats.series.expenses'),
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig;

  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="font-semibold">
            {t('funding.impactStats.monthly.title')}
          </p>
          <p className="text-muted-foreground text-sm">
            {t('funding.impactStats.monthly.description')}
          </p>
        </div>
        <ChartContainer
          config={config}
          className="h-[240px] w-full"
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
            <Bar dataKey="donations" fill="var(--color-donations)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CumulativeChartCard({ summary }: { summary: DonationSummary }) {
  const t = useTranslations();
  const locale = useLocale();
  const { cumulativeData } = useMemo(
    () => buildChartData(summary, locale),
    [summary, locale],
  );

  const config = {
    cumulativeExpenses: {
      label: t('funding.impactStats.series.cumulativeExpenses'),
      color: 'var(--chart-3)',
    },
  } satisfies ChartConfig;

  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="font-semibold">
            {t('funding.impactStats.cumulative.title')}
          </p>
          <p className="text-muted-foreground text-sm">
            {t('funding.impactStats.cumulative.description')}
          </p>
        </div>
        <ChartContainer
          config={config}
          className="h-[240px] w-full"
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
  );
}

export type ImpactStatsProps = {
  summary: DonationSummary;
};

/**
 * Returns a fragment of grid cells so the impact cards can participate in the
 * donation page's bento grid instead of being boxed into their own section.
 */
export function ImpactStats({ summary }: ImpactStatsProps) {
  const t = useTranslations();

  return (
    <>
      <h2 className="mt-6 md:col-span-2 lg:col-span-6">
        {t('funding.impactStats.heading')}
      </h2>
      <p className="text-muted-foreground md:col-span-2 lg:col-span-6">
        {t('funding.impactStats.description')}
      </p>
      {summary.stats.map((stat) => (
        <ImpactStatCard key={stat.id} stat={stat} currency={summary.currency} />
      ))}
      <SupportersPodium supporters={summary.supporters} />
      <MonthlyChartCard summary={summary} />
      <CumulativeChartCard summary={summary} />
    </>
  );
}
