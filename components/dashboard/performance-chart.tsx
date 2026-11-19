'use client';

import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { usePortfolioStore } from '@/lib/store';
import { cn, formatCurrency } from '@/lib/formatters';
import type { PerformanceTimeframe } from '@/types';

const TIMEFRAMES: PerformanceTimeframe[] = ['1D', '1W', '1M', '6M', '1Y'];
const Y_TICKS = [10000, 50000, 100000, 150000, 200000];

interface TooltipPayloadEntry {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: TooltipPayloadEntry[];
}

function CustomTooltip({ active, label, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  return (
    <div className="rounded-xl border border-white/10 bg-[#15121b] px-3 py-2 text-xs shadow-2xl">
      <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
      <p className="font-semibold text-white">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export function PerformanceChart() {
  const performanceHistory = usePortfolioStore((state) => state.performanceHistory);
  const user = usePortfolioStore((state) => state.user);
  const setPerformanceTimeframe = usePortfolioStore(
    (state) => state.setPerformanceTimeframe
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const milestonePoint = performanceHistory.find(
    (point) => point.milestone && point.milestone.isHighlighted
  );

  return (
    <div className="rounded-3xl border border-white/5 bg-helios-card p-5 shadow-helios-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold text-white">Portfolio Performance</h3>
        <div className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setPerformanceTimeframe(tf)}
              className={cn(
                'rounded-full px-3 py-1 text-[11px] font-medium transition-all',
                user.performanceTimeframe === tf
                  ? 'border border-white/10 bg-[#2b2338] text-white'
                  : 'text-helios-text-secondary hover:text-white'
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-4 h-[320px] w-full">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceHistory} margin={{ top: 40, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c084fc" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="month"
                stroke="#6b667b"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#6b667b' }}
              />
              <YAxis
                ticks={Y_TICKS}
                domain={[10000, 200000]}
                tickFormatter={(value: number) => `${value / 1000}k`}
                stroke="#6b667b"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#6b667b' }}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(192,132,252,0.3)' }} />
              <Area
                type="monotone"
                dataKey="valuation"
                stroke="#c084fc"
                strokeWidth={2.5}
                fill="url(#colorValuation)"
                activeDot={{ r: 4, fill: '#c084fc' }}
              />
              {milestonePoint ? (
                <>
                  <ReferenceLine
                    x={milestonePoint.month}
                    stroke="#f472b6"
                    strokeDasharray="4 4"
                    strokeOpacity={0.6}
                  />
                  <ReferenceDot
                    x={milestonePoint.month}
                    y={milestonePoint.valuation}
                    r={5}
                    fill="#f472b6"
                    stroke="#fef2f8"
                    strokeWidth={2}
                  />
                </>
              ) : null}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-white/[0.02]" />
        )}

        {milestonePoint && milestonePoint.milestone ? (
          <div className="absolute left-1/2 top-0 z-10 w-40 -translate-x-[55%] rounded-2xl border border-white/10 bg-[#0e0c12]/95 px-3 py-2 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-white/70">
                {milestonePoint.milestone.dateLabel}
              </span>
              <span className="text-[10px] leading-none text-white/40">···</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {formatCurrency(16500)}
              </span>
              <span className="rounded-full bg-helios-gain/15 px-2 py-0.5 text-[10px] font-bold text-helios-gain">
                {milestonePoint.milestone.gainBadge}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
