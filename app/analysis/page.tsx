'use client';

import { useMemo, useState } from 'react';
import { Activity, Gauge, ShieldCheck, Sparkles, TrendingDown } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import { cn, formatCurrency } from '@/lib/formatters';
import { MARKET_SCENARIOS, QUANTITATIVE_METRICS } from '@/lib/seeds';

const STATUS_STYLES: Record<string, string> = {
  healthy: 'text-helios-gain bg-helios-gain/10 border-helios-gain/25',
  moderate: 'text-yellow-300 bg-yellow-300/10 border-yellow-300/25',
  warning: 'text-helios-loss bg-helios-loss/10 border-helios-loss/25',
};

const METRIC_ICONS: Record<string, typeof Gauge> = {
  'metric-sharpe': Gauge,
  'metric-beta': Activity,
  'metric-volatility': TrendingDown,
  'metric-drawdown': ShieldCheck,
};

export default function AnalysisPage() {
  const user = usePortfolioStore((state) => state.user);
  const performanceHistory = usePortfolioStore((state) => state.performanceHistory);
  const openChat = useUiStore((state) => state.openChat);
  const [activeScenario, setActiveScenario] = useState<string>(MARKET_SCENARIOS[0].id);

  const scenario = useMemo(
    () => MARKET_SCENARIOS.find((item) => item.id === activeScenario) ?? MARKET_SCENARIOS[0],
    [activeScenario]
  );

  const projectedValue = user.totalHolding * (1 + scenario.impactPercentage / 100);
  const projectedDelta = projectedValue - user.totalHolding;

  const avgValuation =
    performanceHistory.reduce((sum, point) => sum + point.valuation, 0) /
    Math.max(performanceHistory.length, 1);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Portfolio Risk & Quantitative Analysis"
        subtitle="Deep dive statistical metrics, market correlation, and stress testing."
        actions={
          <button
            type="button"
            onClick={openChat}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-400/90 to-purple-400/90 px-4 py-2 text-xs font-semibold text-black"
          >
            <Sparkles className="h-4 w-4" />
            Optimize with Helios AI
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUANTITATIVE_METRICS.map((metric) => {
          const Icon = METRIC_ICONS[metric.id] ?? Gauge;
          return (
            <div
              key={metric.id}
              className="rounded-3xl border border-white/5 bg-helios-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50">{metric.label}</p>
                <Icon className="h-4 w-4 text-helios-mauve" />
              </div>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                {metric.value}
              </p>
              <span
                className={cn(
                  'mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                  STATUS_STYLES[metric.status]
                )}
              >
                {metric.description}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
          <h3 className="text-base font-bold text-white">Stress Testing Scenarios</h3>
          <p className="mt-1 text-xs text-white/50">
            Simulate portfolio valuation under adverse or opportunistic market conditions.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {MARKET_SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveScenario(item.id)}
                className={cn(
                  'rounded-2xl border px-4 py-3 text-left transition-all',
                  activeScenario === item.id
                    ? 'border-helios-mauve/40 bg-helios-mauve/[0.08]'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{item.title}</span>
                  <span
                    className={cn(
                      'text-xs font-bold',
                      item.impactPercentage >= 0 ? 'text-helios-gain' : 'text-helios-loss'
                    )}
                  >
                    {item.impactPercentage >= 0 ? '+' : ''}
                    {item.impactPercentage}%
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
          <h3 className="text-base font-bold text-white">Projected Impact</h3>
          <p className="mt-1 text-xs text-white/50">{scenario.title}</p>
          <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center">
            <p className="text-[11px] uppercase tracking-wide text-white/40">
              Projected Portfolio Value
            </p>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">
              {formatCurrency(projectedValue)}
            </p>
            <p
              className={cn(
                'mt-2 text-sm font-semibold',
                projectedDelta >= 0 ? 'text-helios-gain' : 'text-helios-loss'
              )}
            >
              {projectedDelta >= 0 ? '+' : ''}
              {formatCurrency(projectedDelta)} ({scenario.impactPercentage}%)
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <p className="text-[10px] text-white/40">Current Holding</p>
              <p className="mt-1 font-semibold text-white">
                {formatCurrency(user.totalHolding)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <p className="text-[10px] text-white/40">Avg Historical Valuation</p>
              <p className="mt-1 font-semibold text-white">{formatCurrency(avgValuation)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-helios-mauve/20 bg-helios-mauve/[0.05] p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-helios-mauve" />
          <h3 className="text-base font-bold text-white">Helios AI Portfolio Optimization</h3>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/60">
          To minimize volatility without sacrificing alpha, allocate 55% to core Big Tech
          (AAPL, MSFT), 12% into AI & chips (NVDA), 8% E-Commerce (AMZN), and 10% into
          short-duration bonds plus 15% cash. This rebalance targets a Sharpe ratio above
          2.3 while capping maximum drawdown near -6%.
        </p>
      </div>
    </div>
  );
}
