'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import { cn, formatCurrency } from '@/lib/formatters';
import { formatPercentage } from '@/lib/formatters';
import type { WatchlistItem } from '@/types';

type WatchlistTab = 'Most Viewed' | 'Gain' | 'Lose';

const TABS: WatchlistTab[] = ['Most Viewed', 'Gain', 'Lose'];

const LOGO_STYLES: Record<string, { bg: string; label: string }> = {
  SPOT: { bg: 'bg-[#1db954]', label: 'S' },
  AMZN: { bg: 'bg-[#ff9900]', label: 'a' },
  MSFT: { bg: 'bg-[#00a4ef]', label: 'M' },
  NVDA: { bg: 'bg-[#76b900]', label: 'N' },
};

function TickerLogo({ item }: { item: WatchlistItem }): ReactNode {
  const style = LOGO_STYLES[item.ticker] ?? {
    bg: 'bg-helios-pill',
    label: item.ticker.slice(0, 1),
  };
  return (
    <div
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white',
        style.bg
      )}
    >
      {style.label}
    </div>
  );
}

export function WatchlistCard() {
  const watchlist = usePortfolioStore((state) => state.watchlist);
  const openOrderModal = useUiStore((state) => state.openOrderModal);
  const holdings = usePortfolioStore((state) => state.holdings);
  const [activeTab, setActiveTab] = useState<WatchlistTab>('Most Viewed');

  const filtered = useMemo(() => {
    if (activeTab === 'Gain') {
      return watchlist.filter((item) => item.isGaining || item.changePercentage >= 0);
    }
    if (activeTab === 'Lose') {
      return watchlist.filter((item) => !item.isGaining || item.changePercentage < 0);
    }
    return [...watchlist].sort((a, b) => b.viewCount - a.viewCount);
  }, [watchlist, activeTab]);

  return (
    <div className="rounded-3xl border border-white/5 bg-helios-card p-5 shadow-helios-card">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Watchlist</h3>
      </div>
      <div className="mt-3 flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 rounded-full px-2 py-1.5 text-[11px] font-medium transition-all',
              activeTab === tab
                ? 'bg-[#2b2338] text-white'
                : 'text-helios-text-secondary hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-col">
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-xs text-white/40">No equities in this filter.</p>
        ) : (
          filtered.map((item) => {
            const holding = holdings.find((h) => h.ticker === item.ticker);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  openOrderModal({
                    ticker: item.ticker,
                    name: item.name,
                    price: item.price,
                    exchange: item.exchange,
                    unitsHeld: holding ? holding.units : 0,
                    initialType: 'BUY',
                  })
                }
                className="group flex items-center justify-between rounded-2xl px-1 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <TickerLogo item={item} />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-wide text-white/40">
                      {item.exchange}: {item.ticker}
                    </p>
                  </div>
                </div>
                <div className="text-right leading-tight">
                  <p className="text-sm font-semibold text-white">
                    {formatCurrency(item.price).replace('$ ', '$')}
                  </p>
                  <p
                    className={cn(
                      'text-[11px] font-semibold',
                      item.changePercentage >= 0 ? 'text-helios-gain' : 'text-helios-loss'
                    )}
                  >
                    {formatPercentage(item.changePercentage)}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
