'use client';

import { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import {
  calculatePnL,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/lib/formatters';

export function AssetDetailModal() {
  const detailTicker = useUiStore((state) => state.detailTicker);
  const closeDetailModal = useUiStore((state) => state.closeDetailModal);
  const openOrderModal = useUiStore((state) => state.openOrderModal);
  const holdings = usePortfolioStore((state) => state.holdings);
  const watchlist = usePortfolioStore((state) => state.watchlist);

  const holding = holdings.find((h) => h.ticker === detailTicker);
  const watchItem = watchlist.find((w) => w.ticker === detailTicker);

  const chartData = useMemo(() => {
    if (watchItem) {
      return watchItem.sparkline.map((value, index) => ({ index, value }));
    }
    if (holding) {
      const base = holding.averageBuyPrice;
      return [
        base * 0.94,
        base * 0.97,
        base * 0.99,
        base,
        base * 1.01,
        base * 1.02,
        holding.currentPrice,
      ].map((value, index) => ({ index, value }));
    }
    return [];
  }, [watchItem, holding]);

  const ticker = detailTicker ?? '';
  const name = holding?.name ?? watchItem?.name ?? ticker;
  const exchange = holding?.exchange ?? watchItem?.exchange ?? 'NASDAQ';
  const price = holding?.currentPrice ?? watchItem?.price ?? 0;
  const pnl = holding
    ? calculatePnL(holding.currentPrice, holding.averageBuyPrice, holding.units)
    : null;

  return (
    <Modal
      isOpen={detailTicker !== null}
      onClose={closeDetailModal}
      title={`${ticker} · ${name}`}
    >
      {detailTicker ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-white/40">{exchange}</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(price)}</p>
            </div>
            <Badge variant={holding && holding.changePercentage >= 0 ? 'gain' : 'mauve'}>
              {formatPercentage(holding?.changePercentage ?? watchItem?.changePercentage ?? 0)}
            </Badge>
          </div>

          <div className="h-32 w-full rounded-2xl border border-white/5 bg-white/[0.02] p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c084fc" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#c084fc"
                  strokeWidth={2}
                  fill="url(#detailGradient)"
                />
                <Tooltip
                  contentStyle={{
                    background: '#15121b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    fontSize: 11,
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Price']}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] text-white/40">Units Held</p>
              <p className="font-semibold text-white">{formatNumber(holding?.units ?? 0, 0)}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] text-white/40">Avg Buy Price</p>
              <p className="font-semibold text-white">
                {formatCurrency(holding?.averageBuyPrice ?? 0)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] text-white/40">Total Value</p>
              <p className="font-semibold text-white">
                {formatCurrency(holding?.totalValue ?? 0)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] text-white/40">Unrealized PnL</p>
              <p
                className={
                  pnl && pnl.profitLoss >= 0
                    ? 'font-semibold text-helios-gain'
                    : 'font-semibold text-helios-loss'
                }
              >
                {pnl
                  ? `${formatCurrency(pnl.profitLoss)} (${formatPercentage(pnl.returnPercentage)})`
                  : '-'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="gain"
              onClick={() =>
                openOrderModal({
                  ticker,
                  name,
                  price,
                  exchange,
                  unitsHeld: holding?.units ?? 0,
                  initialType: 'BUY',
                })
              }
            >
              Buy
            </Button>
            <Button
              variant="loss"
              disabled={!holding || holding.units === 0}
              onClick={() =>
                openOrderModal({
                  ticker,
                  name,
                  price,
                  exchange,
                  unitsHeld: holding?.units ?? 0,
                  initialType: 'SELL',
                })
              }
            >
              Sell
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
