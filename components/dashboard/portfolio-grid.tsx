'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import { cn, formatCurrency, formatNumber, formatPercentage } from '@/lib/formatters';
import type { AssetPosition } from '@/types';

const TICKER_ACCENT: Record<string, string> = {
  AAPL: 'from-white/20 to-white/5',
  AMZN: 'from-[#ff9900]/30 to-[#ff9900]/5',
  MSFT: 'from-[#00a4ef]/30 to-[#00a4ef]/5',
  NVDA: 'from-[#76b900]/30 to-[#76b900]/5',
};

function PositionCard({ holding }: { holding: AssetPosition }) {
  const openDetailModal = useUiStore((state) => state.openDetailModal);
  const accent = TICKER_ACCENT[holding.ticker] ?? 'from-helios-mauve/30 to-helios-mauve/5';

  return (
    <button
      type="button"
      onClick={() => openDetailModal(holding.ticker)}
      className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-left transition-all duration-200 hover:border-helios-mauve/30 hover:bg-white/[0.06]"
    >
      <div
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-[11px] font-black text-white',
          accent
        )}
      >
        {holding.ticker.slice(0, 1)}
      </div>
      <div className="mt-2 text-sm font-bold text-white sm:text-base">
        {formatCurrency(holding.totalValue)}
      </div>
      <div className="mt-0.5 text-[11px] font-medium text-helios-gain">
        +{formatNumber(holding.changeAmount, 2)} ({formatPercentage(holding.changePercentage, false)})
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
        <span className="text-xs font-semibold text-white">{holding.ticker}</span>
        <span className="text-[11px] text-white/50">Units {formatNumber(holding.units, 0)}</span>
      </div>
    </button>
  );
}

export function PortfolioGrid() {
  const holdings = usePortfolioStore((state) => state.holdings);

  return (
    <div className="rounded-3xl border border-white/5 bg-helios-card p-5 shadow-helios-card">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">My Portfolio</h3>
        <Link
          href="/portfolio"
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          See all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {holdings.map((holding) => (
          <PositionCard key={holding.id} holding={holding} />
        ))}
      </div>
    </div>
  );
}
