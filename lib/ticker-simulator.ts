'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';

const INTERVAL_MS = 3000;
const MIN_DELTA = -0.25;
const MAX_DELTA = 0.35;

function randomDelta(): number {
  return MIN_DELTA + Math.random() * (MAX_DELTA - MIN_DELTA);
}

export function useLiveTickerSimulator(): void {
  const isLiveTickerActive = usePortfolioStore((state) => state.isLiveTickerActive);

  useEffect(() => {
    if (!isLiveTickerActive) {
      return;
    }

    const interval = window.setInterval(() => {
      const state = usePortfolioStore.getState();
      const candidates = [
        ...state.holdings.map((holding) => ({
          ticker: holding.ticker,
          price: holding.currentPrice,
          kind: 'holding' as const,
        })),
        ...state.watchlist.map((item) => ({
          ticker: item.ticker,
          price: item.price,
          kind: 'watchlist' as const,
        })),
      ];

      if (candidates.length === 0) {
        return;
      }

      const count = Math.random() > 0.5 ? 2 : 1;
      const shuffled = [...candidates].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(count, shuffled.length));

      selected.forEach((candidate) => {
        const delta = randomDelta();
        const newPrice = Math.max(1, candidate.price * (1 + delta / 100));
        if (candidate.kind === 'holding') {
          state.updateAssetPrice(candidate.ticker, Number(newPrice.toFixed(4)));
        } else {
          state.updateWatchlistPrice(candidate.ticker, Number(newPrice.toFixed(4)));
        }
      });
    }, INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isLiveTickerActive]);
}
