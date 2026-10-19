'use client';

import type { DonationStat, DonationSupporter } from '@maw/content-sdk';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  Icon,
  type IconAliaseKey,
  Separator,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis } from 'recharts';
import type { FundingDonationSummary } from '../../types';

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

const TREND_SENTIMENT_VARIANTS: Record<
  DonationStat['trend']['sentiment'],
  ComponentProps<typeof Badge>['variant']
> = {
  positive: 'success',
  negative: 'error',
  neutral: 'secondary',
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
  technicalDebtInterest: 'coins',
  monthlyVisitors: 'login',
  captchasCompleted: 'lock',
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

function createFormatters(locale: string) {
  return {
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

/** Formats a currency-tagged stat without conversion and a scalar stat directly. */
function formatStatValue(locale: string, stat: DonationStat): string {
  if (stat.format === 'currency') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: stat.value.currency,
      maximumFractionDigits: 0,
    }).format(stat.value.value);
  }

  const formatters = createFormatters(locale);
  const formatter = formatters[stat.format] ?? formatters.integer;

  return formatter.format(
    stat.format === 'percent' ? stat.value / 100 : stat.value,
  );
}

function buildChartData(summary: FundingDonationSummary, locale: string) {
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
      expenses: -entry.expenses.value,
      donations: entry.donations.value,
    };
  });

  return { monthlyData };
}

function ImpactStat({ stat }: { stat: DonationStat }) {
  const t = useTranslations();
  const locale = useLocale();
  const sentimentClass = TREND_SENTIMENT_CLASSES[stat.trend.sentiment];

  const formatted = useMemo(
    () => formatStatValue(locale, stat),
    [locale, stat],
  );

  const formattedTrend = useMemo(
    () => createFormatters(locale).percent.format(stat.trend.percent / 100),
    [locale, stat.trend.percent],
  );

  return (
    <div className="flex flex-col gap-2" data-testid={`impact-stat-${stat.id}`}>
      <span
        aria-hidden
        className={`bg-muted flex size-9 items-center justify-center rounded-lg ${sentimentClass}`}
      >
        <Icon icon={STAT_ICONS[stat.id] ?? 'tags'} />
      </span>
      <span className="text-xl font-bold tracking-tight">{formatted}</span>
      <span className="text-muted-foreground text-sm">
        {t(stat.labelKey as AppTranslationKey)}
      </span>
      <Badge variant={TREND_SENTIMENT_VARIANTS[stat.trend.sentiment]}>
        <Icon icon={TREND_ICONS[stat.trend.direction]} aria-hidden />
        {formattedTrend}
        <span className="sr-only">
          {t(TREND_DIRECTION_LABEL_KEYS[stat.trend.direction])}
        </span>
      </Badge>
    </div>
  );
}

/**
 * Groups the trend cards into a single block so the section's first cell holds
 * every statistic together instead of scattering them across the grid.
 */
function ImpactStatGroup({ stats }: { stats: readonly DonationStat[] }) {
  return (
    <div
      className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-2"
      data-testid="impact-stats-group"
    >
      {stats.map((stat) => (
        <ImpactStat key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

function SupportersPodium({
  supporters,
  supporterCount,
}: {
  supporters: DonationSupporter[];
  supporterCount: number;
}) {
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
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-semibold">{t('funding.topSupporters')}</p>
        <p
          className="text-muted-foreground text-sm"
          data-testid="impact-supporters-description"
        >
          {t('funding.impactStats.supporters.description', {
            count: supporterCount,
          })}
        </p>
      </div>
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
              className={`w-full rounded-lg ${SUPPORTER_TIER_BARS[supporter.tier]}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MonthlyChart({ summary }: { summary: FundingDonationSummary }) {
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
    <div className="flex flex-col gap-4">
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
        className="h-[190px] w-full"
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
    </div>
  );
}

export type ImpactStatsProps = {
  className?: string;
  summary: FundingDonationSummary;
};

/**
 * The "Impact in numbers" section, rendered as a single container so it reads as
 * one block instead of a cluster of separate cards. Currency values render in
 * the currency the API tagged them with.
 */
export function ImpactStats({ className, summary }: ImpactStatsProps) {
  const t = useTranslations();

  return (
    <Card id="impact" className={cn(className, 'scroll-mt-24')}>
      <CardHeader>
        <h2 className="text-2xl">{t('funding.impactStats.heading')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('funding.impactStats.description')}
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6">
        <ImpactStatGroup stats={summary.stats} />
        <Separator
          orientation="vertical"
          className="hidden md:block"
          data-testid="impact-stats-separator"
        />
        <SupportersPodium
          supporters={summary.supporters}
          supporterCount={summary.supporterCount}
        />
        <Separator
          orientation="vertical"
          className="hidden md:block"
          data-testid="impact-stats-separator"
        />
        <MonthlyChart summary={summary} />
      </CardContent>
    </Card>
  );
}
