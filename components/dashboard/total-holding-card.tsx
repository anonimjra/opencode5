'use client';

import { usePortfolioStore } from '@/lib/store';
import { Dropdown } from '@/components/ui/dropdown';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import type { HoldingPeriod } from '@/types';

const PERIOD_OPTIONS: { value: HoldingPeriod; label: string }[] = [
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: '1Y', label: '1Y' },
  { value: 'ALL', label: 'ALL' },
];

const PERIOD_GROWTH: Record<HoldingPeriod, { amount: number; percent: number }> = {
  '1M': { amount: 320.4, percent: 2.7 },
  '3M': { amount: 680.2, percent: 5.9 },
  '6M': { amount: 1240.5, percent: 11.2 },
  '1Y': { amount: 2140.8, percent: 21.1 },
  ALL: { amount: 3304.11, percent: 36.7 },
};

export function TotalHoldingCard() {
  const user = usePortfolioStore((state) => state.user);
  const setHoldingPeriod = usePortfolioStore((state) => state.setHoldingPeriod);
  const growth = PERIOD_GROWTH[user.holdingPeriod];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-helios-card p-5 shadow-helios-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white/80">Total Holding</p>
        <Dropdown
          value={user.holdingPeriod}
          options={PERIOD_OPTIONS}
          onChange={setHoldingPeriod}
        />
      </div>
      <div className="mt-4 text-3xl font-extrabold tracking-tight text-white">
        {formatCurrency(user.totalHolding, user.currency)}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span className="font-semibold text-helios-gain">
          +{formatCurrency(growth.amount, user.currency)}
        </span>
        <span className="font-semibold text-helios-gain">
          ({formatPercentage(growth.percent)})
        </span>
      </div>
    </div>
  );
}
