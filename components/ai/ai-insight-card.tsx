'use client';

import { Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import { formatPercentage } from '@/lib/formatters';

export function AiInsightCard() {
  const holdings = usePortfolioStore((state) => state.holdings);
  const openChat = useUiStore((state) => state.openChat);

  const topMover = [...holdings].sort(
    (a, b) => b.changePercentage - a.changePercentage
  )[0];

  return (
    <div className="rounded-2xl border border-helios-mauve/20 bg-helios-mauve/[0.06] p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-helios-mauve" />
        <p className="text-xs font-semibold text-white">Helios Rebalancing Insight</p>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-white/60">
        Big Tech exposure sits at ~70% of your equity. Trimming{' '}
        {topMover ? topMover.ticker : 'NVDA'} into cash/bonds could reduce portfolio
        volatility while preserving growth alpha.
      </p>
      {topMover ? (
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-helios-gain">
          <TrendingUp className="h-3.5 w-3.5" />
          {topMover.ticker} {formatPercentage(topMover.changePercentage)} uplift
        </div>
      ) : null}
      <Button size="sm" className="mt-3 w-full" onClick={openChat}>
        Generate Rebalance Plan
      </Button>
    </div>
  );
}
