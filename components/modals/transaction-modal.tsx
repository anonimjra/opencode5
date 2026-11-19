'use client';

import { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import { cn, formatCurrency, formatNumber } from '@/lib/formatters';
import { toast } from '@/lib/toast';
import type { TransactionType } from '@/types';

export function TransactionModal() {
  const target = useUiStore((state) => state.orderTarget);
  const closeOrderModal = useUiStore((state) => state.closeOrderModal);
  const user = usePortfolioStore((state) => state.user);
  const holdings = usePortfolioStore((state) => state.holdings);
  const buyAsset = usePortfolioStore((state) => state.buyAsset);
  const sellAsset = usePortfolioStore((state) => state.sellAsset);

  const [orderType, setOrderType] = useState<TransactionType>('BUY');
  const [unitsInput, setUnitsInput] = useState('1');

  useEffect(() => {
    if (target) {
      setOrderType(target.initialType);
      setUnitsInput('1');
    }
  }, [target]);

  const liveUnits = useMemo(() => {
    if (!target) {
      return 0;
    }
    const holding = holdings.find((h) => h.ticker === target.ticker);
    return holding ? holding.units : 0;
  }, [holdings, target]);

  const units = Number(unitsInput);
  const isValidUnits = Number.isFinite(units) && units > 0;
  const price = target ? target.price : 0;
  const total = isValidUnits ? units * price : 0;

  let validationError = '';
  if (!target) {
    validationError = '';
  } else if (!isValidUnits) {
    validationError = 'Enter a valid number of units.';
  } else if (orderType === 'BUY' && total > user.cashBalance) {
    validationError = 'Insufficient cash balance for this order.';
  } else if (orderType === 'SELL' && units > liveUnits) {
    validationError = 'You cannot sell more units than you hold.';
  }

  const projectedCash =
    orderType === 'BUY' ? user.cashBalance - total : user.cashBalance + total;

  const handleQueueChange = (raw: string) => {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    setUnitsInput(cleaned);
  };

  const handleExecute = () => {
    if (!target || validationError) {
      return;
    }
    const result =
      orderType === 'BUY'
        ? buyAsset(target.ticker, units, price)
        : sellAsset(target.ticker, units, price);

    if (!result.success) {
      toast.error('Order rejected', result.message);
      return;
    }

    if (orderType === 'BUY') {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#c084fc', '#a855f7', '#f472b6', '#34d399'],
      });
    }
    toast.success(
      `${orderType === 'BUY' ? 'Bought' : 'Sold'} ${formatNumber(units, 0)} ${target.ticker}`,
      result.message
    );
    closeOrderModal();
  };

  return (
    <Modal
      isOpen={target !== null}
      onClose={closeOrderModal}
      title={target ? `${target.ticker} · ${target.name}` : 'Order'}
    >
      {target ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-white/40">
                {target.exchange} · Market Price
              </p>
              <p className="text-lg font-bold text-white">{formatCurrency(price)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-white/40">Cash</p>
              <p className="text-sm font-semibold text-white">
                {formatCurrency(user.cashBalance)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1">
            {(['BUY', 'SELL'] as TransactionType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOrderType(type)}
                className={cn(
                  'rounded-full py-1.5 text-xs font-semibold transition-all',
                  orderType === type
                    ? type === 'BUY'
                      ? 'bg-helios-gain/20 text-helios-gain'
                      : 'bg-helios-loss/20 text-helios-loss'
                    : 'text-helios-text-secondary hover:text-white'
                )}
              >
                {type}
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-white/60">
              Units {orderType === 'SELL' ? `(held: ${formatNumber(liveUnits, 0)})` : ''}
            </label>
            <input
              inputMode="decimal"
              value={unitsInput}
              onChange={(event) => handleQueueChange(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-helios-mauve/40 focus:outline-none"
              placeholder="0"
            />
          </div>

          <div className="space-y-1.5 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs">
            <div className="flex items-center justify-between text-white/60">
              <span>Estimated Total</span>
              <span className="font-semibold text-white">{formatCurrency(total)}</span>
            </div>
            <div className="flex items-center justify-between text-white/60">
              <span>Projected Cash Balance</span>
              <span className="font-semibold text-white">{formatCurrency(projectedCash)}</span>
            </div>
          </div>

          {validationError ? (
            <p className="text-[11px] font-medium text-helios-loss">{validationError}</p>
          ) : null}

          <Button
            variant={orderType === 'BUY' ? 'primary' : 'loss'}
            className="w-full"
            disabled={Boolean(validationError)}
            onClick={handleExecute}
          >
            Execute {orderType === 'BUY' ? 'Buy' : 'Sell'} Order
          </Button>
        </div>
      ) : null}
    </Modal>
  );
}
