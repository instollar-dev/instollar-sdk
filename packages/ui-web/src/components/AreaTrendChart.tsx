import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { colors } from '@instollar-dev/tokens';
import { ChartCard, type ChartCardProps } from './ChartCard';
import { cn } from '../utils/cn';

export interface AreaTrendDatum {
  /** X-axis label (e.g. Mon, Tue) */
  label: string;
  /** Primary series value */
  value: number;
}

export interface AreaTrendChartProps
  extends Pick<ChartCardProps, 'title' | 'description' | 'actions' | 'className'> {
  data: AreaTrendDatum[];
  /** Chart height in px. Defaults to 260. */
  height?: number;
  /** Stroke / fill base color. Defaults to Instollar chart green. */
  color?: string;
  /** Format Y-axis tick labels (e.g. Naira millions). */
  formatYAxis?: (value: number) => string;
  /** Format tooltip values. */
  formatValue?: (value: number) => string;
  /** Data key for the series. Defaults to `value`. */
  dataKey?: string;
  hideCard?: boolean;
}

const defaultFormatY = (value: number) => {
  if (Math.abs(value) >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `₦${(value / 1_000).toFixed(1)}K`;
  return `₦${value}`;
};

/**
 * Smooth area trend chart — matches the Revenue Trend dashboard card.
 */
export const AreaTrendChart = ({
  title = 'Revenue Trend',
  description = 'Last 7 days performance',
  actions,
  className,
  data,
  height = 260,
  color = colors.chart.area,
  formatYAxis = defaultFormatY,
  formatValue = defaultFormatY,
  dataKey = 'value',
  hideCard = false,
}: AreaTrendChartProps) => {
  const gradientId = 'instollar-area-trend-fill';

  const chart = (
    <div className={cn('w-full', hideCard && className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke={colors.chart.grid}
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: colors.chart.axis, fontSize: 12 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={56}
            tick={{ fill: colors.chart.axis, fontSize: 12 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip
            formatter={(value) => {
              const numeric = typeof value === 'number' ? value : Number(value ?? 0);
              return [formatValue(Number.isFinite(numeric) ? numeric : 0), 'Value'];
            }}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${colors.neutral[200]}`,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08)',
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  if (hideCard) return chart;

  return (
    <ChartCard
      title={title}
      description={description}
      actions={actions}
      className={className}
    >
      {chart}
    </ChartCard>
  );
};

/** Demo data for galleries / Storybook-style lists. */
export const areaTrendChartDemoData: AreaTrendDatum[] = [
  { label: 'Mon', value: 1_200_000 },
  { label: 'Tue', value: 2_100_000 },
  { label: 'Wed', value: 1_800_000 },
  { label: 'Thu', value: 3_200_000 },
  { label: 'Fri', value: 4_100_000 },
  { label: 'Sat', value: 3_600_000 },
  { label: 'Sun', value: 5_400_000 },
];
