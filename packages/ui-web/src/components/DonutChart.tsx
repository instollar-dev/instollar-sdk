import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { colors } from '@instollar-dev/tokens';
import { ChartCard, type ChartCardProps } from './ChartCard';
import { cn } from '../utils/cn';

export interface DonutSlice {
  name: string;
  value: number;
  color?: string;
}

export interface DonutChartProps
  extends Pick<ChartCardProps, 'title' | 'description' | 'actions' | 'className'> {
  data: DonutSlice[];
  /** Outer radius of the donut. Defaults to 90. */
  outerRadius?: number;
  /** Inner radius (hole). Defaults to 58. */
  innerRadius?: number;
  /** Chart height in px. Defaults to 220. */
  height?: number;
  /** Show legend under the chart. Defaults to true. */
  showLegend?: boolean;
  hideCard?: boolean;
}

const DEFAULT_COLORS = [
  colors.chart.donutPrimary,
  colors.chart.donutSecondary,
  colors.chart.donutTertiary,
  colors.primary[500],
  colors.warning[500],
];

/**
 * Donut / pie distribution chart — matches the Sales Distribution card.
 */
export const DonutChart = ({
  title = 'Sales Distribution',
  description = 'By channel',
  actions,
  className,
  data,
  outerRadius = 90,
  innerRadius = 58,
  height = 220,
  showLegend = true,
  hideCard = false,
}: DonutChartProps) => {
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;

  const chart = (
    <div className={cn('w-full', hideCard && className)}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((slice, index) => (
                <Cell
                  key={slice.name}
                  fill={slice.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {showLegend ? (
        <ul className="mt-2 space-y-2">
          {data.map((slice, index) => {
            const pct = Math.round((slice.value / total) * 100);
            const color = slice.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
            return (
              <li
                key={slice.name}
                className="flex items-center justify-between gap-3 text-sm text-neutral-700"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                  {slice.name}
                </span>
                <span className="font-medium text-neutral-900">{pct}%</span>
              </li>
            );
          })}
        </ul>
      ) : null}
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
export const donutChartDemoData: DonutSlice[] = [
  { name: 'Direct Sales', value: 45, color: colors.chart.donutPrimary },
  { name: 'Affiliate', value: 25, color: colors.chart.donutSecondary },
  { name: 'DSA', value: 20, color: colors.chart.donutTertiary },
];
