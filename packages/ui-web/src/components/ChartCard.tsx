import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface ChartCardProps {
  title: string;
  description?: string;
  /** Slot for filters (date pickers, year select, etc.) — use your app's UI. */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Shared chrome for dashboard charts (title, subtitle, optional header actions).
 */
export const ChartCard = ({
  title,
  description,
  actions,
  className,
  children,
}: ChartCardProps) => (
  <section
    className={cn(
      'rounded-xl border border-neutral-200 bg-white p-5 shadow-sm',
      className
    )}
  >
    <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-sm text-neutral-500">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
    {children}
  </section>
);
