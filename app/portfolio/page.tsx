'use client';

import { useMemo } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { ExportButton } from '@/components/portfolio/export-button';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import {
  calculatePnL,
  cn,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/lib/formatters';
import { SECTOR_ALLOCATIONS } from '@/lib/seeds';

export default function PortfolioPage() {
  const holdings = usePortfolioStore((state) => state.holdings);
  const user = usePortfolioStore((state) => state.user);
  const openOrderModal = useUiStore((state) => state.openOrderModal);
  const openChat = useUiStore((state) => state.openChat);

  const totals = useMemo(() => {
    const marketValue = holdings.reduce((sum, h) => sum + h.currentPrice * h.units, 0);
    const costBasis = holdings.reduce((sum, h) => sum + h.averageBuyPrice * h.units, 0);
    const pnl = marketValue - costBasis;
    const pnlPct = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
    return { marketValue, costBasis, pnl, pnlPct };
  }, [holdings]);

  const summaryCards = [
    {
      label: 'Total Portfolio Value',
      value: formatCurrency(totals.marketValue),
      accent: 'text-white',
    },
    {
      label: 'Unrealized Gain / Loss',
      value: `${formatCurrency(totals.pnl)} (${formatPercentage(totals.pnlPct)})`,
      accent: totals.pnl >= 0 ? 'text-helios-gain' : 'text-helios-loss',
    },
    {
      label: 'Cash Balance',
      value: formatCurrency(user.cashBalance),
      accent: 'text-white',
    },
    {
      label: 'Active Holdings',
      value: formatNumber(holdings.length, 0),
      accent: 'text-white',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Portfolio Management & Asset Allocation"
        subtitle="Detailed breakdown of Nadia's investment holdings and sector distribution."
        actions={
          <>
            <ExportButton />
            <Button
              onClick={() =>
                holdings[0]
                  ? openOrderModal({
                      ticker: holdings[0].ticker,
                      name: holdings[0].name,
                      price: holdings[0].currentPrice,
                      exchange: holdings[0].exchange,
                      unitsHeld: holdings[0].units,
                      initialType: 'BUY',
                    })
                  : openChat()
              }
              size="md"
            >
              <Plus className="h-4 w-4" />
              Add New Asset
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/5 bg-helios-card p-5"
          >
            <p className="text-xs text-white/50">{card.label}</p>
            <p className={cn('mt-2 text-xl font-bold tracking-tight', card.accent)}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Holdings Breakdown</h3>
          <span className="text-[11px] text-white/40">{holdings.length} positions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-white/40">
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Exchange</th>
                <th className="pb-3 text-right font-medium">Units</th>
                <th className="pb-3 text-right font-medium">Avg Buy</th>
                <th className="pb-3 text-right font-medium">Current</th>
                <th className="pb-3 text-right font-medium">Total Value</th>
                <th className="pb-3 text-right font-medium">Unrealized PnL</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const pnl = calculatePnL(
                  holding.currentPrice,
                  holding.averageBuyPrice,
                  holding.units
                );
                return (
                  <tr key={holding.id} className="border-t border-white/5">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-helios-pill text-xs font-bold text-white">
                          {holding.ticker.slice(0, 1)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{holding.ticker}</p>
                          <p className="text-[11px] text-white/40">{holding.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-white/60">{holding.exchange}</td>
                    <td className="py-3 text-right text-xs text-white/80">
                      {formatNumber(holding.units, 0)}
                    </td>
                    <td className="py-3 text-right text-xs text-white/80">
                      {formatCurrency(holding.averageBuyPrice)}
                    </td>
                    <td className="py-3 text-right text-xs text-white/80">
                      {formatCurrency(holding.currentPrice)}
                    </td>
                    <td className="py-3 text-right text-xs font-semibold text-white">
                      {formatCurrency(holding.totalValue)}
                    </td>
                    <td
                      className={cn(
                        'py-3 text-right text-xs font-semibold',
                        pnl.profitLoss >= 0 ? 'text-helios-gain' : 'text-helios-loss'
                      )}
                    >
                      {formatCurrency(pnl.profitLoss)} ({formatPercentage(pnl.returnPercentage)})
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            openOrderModal({
                              ticker: holding.ticker,
                              name: holding.name,
                              price: holding.currentPrice,
                              exchange: holding.exchange,
                              unitsHeld: holding.units,
                              initialType: 'BUY',
                            })
                          }
                          className="rounded-full border border-helios-gain/30 bg-helios-gain/10 px-3 py-1 text-[10px] font-semibold text-helios-gain transition-colors hover:bg-helios-gain/20"
                        >
                          Buy
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openOrderModal({
                              ticker: holding.ticker,
                              name: holding.name,
                              price: holding.currentPrice,
                              exchange: holding.exchange,
                              unitsHeld: holding.units,
                              initialType: 'SELL',
                            })
                          }
                          className="rounded-full border border-helios-loss/30 bg-helios-loss/10 px-3 py-1 text-[10px] font-semibold text-helios-loss transition-colors hover:bg-helios-loss/20"
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-helios-mauve" />
          <h3 className="text-base font-bold text-white">Sector Allocation</h3>
        </div>
        <div className="flex flex-col gap-3">
          {SECTOR_ALLOCATIONS.map((allocation) => (
            <div key={allocation.sector}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-white/70">{allocation.sector}</span>
                <span className="font-semibold text-white">{allocation.percentage}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${allocation.percentage}%`,
                    backgroundColor: allocation.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
