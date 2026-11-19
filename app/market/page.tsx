'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, TrendingDown, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import {
  cn,
  formatCurrency,
  formatPercentage,
  formatVolume,
} from '@/lib/formatters';
import { MARKET_INDICES, INITIAL_MARKET_EQUITIES } from '@/lib/seeds';
import { toast } from '@/lib/toast';
import type { MarketSector } from '@/types';

const CATEGORIES: ('All Equities' | MarketSector)[] = [
  'All Equities',
  'Big Tech',
  'AI & Chips',
  'E-Commerce',
  'Entertainment',
  'Clean Energy',
];

export default function MarketPage() {
  const watchlist = usePortfolioStore((state) => state.watchlist);
  const toggleWatchlist = usePortfolioStore((state) => state.toggleWatchlist);
  const openOrderModal = useUiStore((state) => state.openOrderModal);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All Equities' | MarketSector>('All Equities');

  const filtered = useMemo(() => {
    return INITIAL_MARKET_EQUITIES.filter((equity) => {
      const matchesCategory =
        category === 'All Equities' || equity.sector === category;
      const matchesQuery =
        query.trim().length === 0 ||
        equity.ticker.toLowerCase().includes(query.trim().toLowerCase()) ||
        equity.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const gainers = [...INITIAL_MARKET_EQUITIES]
    .sort((a, b) => b.changePercentage - a.changePercentage)
    .slice(0, 3);
  const losers = [...INITIAL_MARKET_EQUITIES]
    .sort((a, b) => a.changePercentage - b.changePercentage)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Global Market Explorer"
        subtitle="Real-time market screeners, trending equities, and index overview."
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ticker (TSLA, META, GOOGL)"
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder:text-white/40 focus:border-helios-mauve/40 focus:outline-none sm:w-72"
            />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MARKET_INDICES.map((index) => (
          <div key={index.symbol} className="rounded-3xl border border-white/5 bg-helios-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/50">{index.name}</p>
              <span
                className={cn(
                  'text-[11px] font-semibold',
                  index.changePercentage >= 0 ? 'text-helios-gain' : 'text-helios-loss'
                )}
              >
                {formatPercentage(index.changePercentage)}
              </span>
            </div>
            <p className="mt-2 text-xl font-bold text-white">
              {index.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-helios-gain" />
            <h3 className="text-sm font-bold text-white">Top Gainers</h3>
          </div>
          <div className="space-y-2">
            {gainers.map((equity) => (
              <div key={equity.id} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{equity.ticker}</span>
                <span className="font-semibold text-helios-gain">
                  {formatPercentage(equity.changePercentage)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-helios-loss" />
            <h3 className="text-sm font-bold text-white">Top Losers</h3>
          </div>
          <div className="space-y-2">
            {losers.map((equity) => (
              <div key={equity.id} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{equity.ticker}</span>
                <span
                  className={cn(
                    'font-semibold',
                    equity.changePercentage >= 0 ? 'text-helios-gain' : 'text-helios-loss'
                  )}
                >
                  {formatPercentage(equity.changePercentage)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-all',
              category === item
                ? 'border border-white/10 bg-[#2b2338] text-white'
                : 'border border-white/5 bg-white/[0.03] text-helios-text-secondary hover:text-white'
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-white/40">
                <th className="pb-3 font-medium">Equity</th>
                <th className="pb-3 font-medium">Sector</th>
                <th className="pb-3 text-right font-medium">Price</th>
                <th className="pb-3 text-right font-medium">24h</th>
                <th className="pb-3 text-right font-medium">Volume</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((equity) => {
                const inWatchlist = watchlist.some((item) => item.ticker === equity.ticker);
                return (
                  <tr key={equity.id} className="border-t border-white/5">
                    <td className="py-3">
                      <p className="text-sm font-semibold text-white">{equity.ticker}</p>
                      <p className="text-[11px] text-white/40">{equity.name}</p>
                    </td>
                    <td className="py-3 text-xs text-white/60">{equity.sector}</td>
                    <td className="py-3 text-right text-xs font-semibold text-white">
                      {formatCurrency(equity.price).replace('$ ', '$')}
                    </td>
                    <td
                      className={cn(
                        'py-3 text-right text-xs font-semibold',
                        equity.changePercentage >= 0 ? 'text-helios-gain' : 'text-helios-loss'
                      )}
                    >
                      {formatPercentage(equity.changePercentage)}
                    </td>
                    <td className="py-3 text-right text-xs text-white/60">
                      {formatVolume(equity.volume)}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            toggleWatchlist(equity.ticker);
                            toast.info(
                              inWatchlist ? 'Removed from watchlist' : 'Added to watchlist',
                              `${equity.ticker} updated in your watchlist.`
                            );
                          }}
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors',
                            inWatchlist
                              ? 'border-helios-mauve/30 bg-helios-mauve/10 text-helios-mauve'
                              : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                          )}
                        >
                          <Plus className="h-3 w-3" />
                          {inWatchlist ? 'Watching' : 'Watchlist'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openOrderModal({
                              ticker: equity.ticker,
                              name: equity.name,
                              price: equity.price,
                              exchange: equity.exchange,
                              unitsHeld: 0,
                              initialType: 'BUY',
                            })
                          }
                          className="rounded-full bg-gradient-to-r from-fuchsia-400/90 to-purple-400/90 px-3 py-1 text-[10px] font-semibold text-black"
                        >
                          Trade
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-white/40">
                    No equities match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
