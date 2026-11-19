import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AIChatMessage,
  AssetPosition,
  HoldingPeriod,
  PerformanceDataPoint,
  PerformanceTimeframe,
  ActiveSubTab,
  PortfolioTransaction,
  UserProfile,
  WatchlistItem,
} from '@/types';
import {
  INITIAL_AI_MESSAGES,
  INITIAL_HOLDINGS,
  INITIAL_PERFORMANCE_HISTORY,
  INITIAL_TRANSACTIONS,
  INITIAL_USER_PROFILE,
  INITIAL_WATCHLIST,
} from '@/lib/seeds';

export interface OrderResult {
  success: boolean;
  message: string;
}

interface PortfolioState {
  user: UserProfile;
  holdings: AssetPosition[];
  watchlist: WatchlistItem[];
  performanceHistory: PerformanceDataPoint[];
  transactions: PortfolioTransaction[];
  chatMessages: AIChatMessage[];
  isLiveTickerActive: boolean;
  hasHydrated: boolean;

  setHoldingPeriod: (period: HoldingPeriod) => void;
  setPerformanceTimeframe: (timeframe: PerformanceTimeframe) => void;
  setActiveSubTab: (tab: ActiveSubTab) => void;
  setCurrency: (currency: UserProfile['currency']) => void;
  buyAsset: (ticker: string, units: number, price: number) => OrderResult;
  sellAsset: (ticker: string, units: number, price: number) => OrderResult;
  toggleWatchlist: (ticker: string) => void;
  isInWatchlist: (ticker: string) => boolean;
  addChatMessage: (message: AIChatMessage) => void;
  updateAssetPrice: (ticker: string, newPrice: number) => void;
  updateWatchlistPrice: (ticker: string, newPrice: number) => void;
  toggleLiveTicker: () => void;
  resetToDefaultSeed: () => void;
  setHasHydrated: (value: boolean) => void;
}

function recomputeHoldings(
  holdings: AssetPosition[],
  cashBalance: number
): { holdings: AssetPosition[]; totalHolding: number } {
  const positionsValue = holdings.reduce(
    (sum, holding) => sum + holding.units * holding.currentPrice,
    0
  );
  const totalHolding = positionsValue + cashBalance;
  const updated = holdings.map((holding) => {
    const totalValue = holding.units * holding.currentPrice;
    const allocationPercentage =
      totalHolding > 0 ? (totalValue / totalHolding) * 100 : 0;
    return {
      ...holding,
      totalValue,
      allocationPercentage,
    };
  });
  return { holdings: updated, totalHolding };
}

function makeTransactionId(): string {
  return `txn-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function cloneHoldings(): AssetPosition[] {
  return INITIAL_HOLDINGS.map((holding) => ({ ...holding }));
}

function cloneWatchlist(): WatchlistItem[] {
  return INITIAL_WATCHLIST.map((item) => ({ ...item }));
}

function clonePerformance(): PerformanceDataPoint[] {
  return INITIAL_PERFORMANCE_HISTORY.map((point) => ({
    ...point,
    milestone: point.milestone ? { ...point.milestone } : undefined,
  }));
}

function cloneChatMessages(): AIChatMessage[] {
  return INITIAL_AI_MESSAGES.map((message) => ({
    ...message,
    suggestedAction: message.suggestedAction
      ? { ...message.suggestedAction }
      : undefined,
  }));
}

function cloneTransactions(): PortfolioTransaction[] {
  return INITIAL_TRANSACTIONS.map((transaction) => ({ ...transaction }));
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      user: { ...INITIAL_USER_PROFILE },
      holdings: cloneHoldings(),
      watchlist: cloneWatchlist(),
      performanceHistory: clonePerformance(),
      transactions: cloneTransactions(),
      chatMessages: cloneChatMessages(),
      isLiveTickerActive: false,
      hasHydrated: false,

      setHoldingPeriod: (period) =>
        set((state) => ({
          user: { ...state.user, holdingPeriod: period },
        })),

      setPerformanceTimeframe: (timeframe) =>
        set((state) => ({
          user: { ...state.user, performanceTimeframe: timeframe },
        })),

      setActiveSubTab: (tab) =>
        set((state) => ({
          user: { ...state.user, activeSubTab: tab },
        })),

      setCurrency: (currency) =>
        set((state) => ({
          user: { ...state.user, currency },
        })),

      buyAsset: (ticker, units, price) => {
        if (!Number.isFinite(units) || units <= 0) {
          return { success: false, message: 'Units must be greater than zero.' };
        }
        if (!Number.isFinite(price) || price <= 0) {
          return { success: false, message: 'Invalid market price.' };
        }
        const state = get();
        const total = units * price;
        if (total > state.user.cashBalance) {
          return {
            success: false,
            message: 'Insufficient cash balance for this order.',
          };
        }
        const existing = state.holdings.find((h) => h.ticker === ticker);
        let nextHoldings: AssetPosition[];
        let assetName = ticker;

        if (existing) {
          assetName = existing.name;
          nextHoldings = state.holdings.map((holding) => {
            if (holding.ticker !== ticker) {
              return holding;
            }
            const newUnits = holding.units + units;
            const newAvg =
              (holding.averageBuyPrice * holding.units + price * units) /
              newUnits;
            return {
              ...holding,
              units: newUnits,
              averageBuyPrice: Number(newAvg.toFixed(4)),
              currentPrice: price,
            };
          });
        } else {
          nextHoldings = [
            ...state.holdings,
            {
              id: `asset-${ticker.toLowerCase()}-${Date.now()}`,
              ticker,
              name: ticker,
              exchange: 'NASDAQ',
              currentPrice: price,
              units,
              averageBuyPrice: price,
              totalValue: units * price,
              changeAmount: 0,
              changePercentage: 0,
              allocationPercentage: 0,
            },
          ];
        }

        const newCash = state.user.cashBalance - total;
        const recomputed = recomputeHoldings(nextHoldings, newCash);
        const transaction: PortfolioTransaction = {
          id: makeTransactionId(),
          ticker,
          assetName,
          type: 'BUY',
          units,
          pricePerUnit: price,
          totalAmount: total,
          timestamp: new Date().toISOString(),
          status: 'COMPLETED',
        };

        set({
          holdings: recomputed.holdings,
          transactions: [transaction, ...state.transactions],
          user: {
            ...state.user,
            cashBalance: newCash,
            totalHolding: recomputed.totalHolding,
          },
        });

        return {
          success: true,
          message: `Bought ${units} ${ticker} at ${price.toFixed(2)} USD.`,
        };
      },

      sellAsset: (ticker, units, price) => {
        if (!Number.isFinite(units) || units <= 0) {
          return { success: false, message: 'Units must be greater than zero.' };
        }
        if (!Number.isFinite(price) || price <= 0) {
          return { success: false, message: 'Invalid market price.' };
        }
        const state = get();
        const existing = state.holdings.find((h) => h.ticker === ticker);
        if (!existing) {
          return { success: false, message: 'You do not hold this asset.' };
        }
        if (units > existing.units) {
          return {
            success: false,
            message: 'Cannot sell more units than currently held.',
          };
        }
        const total = units * price;
        let nextHoldings: AssetPosition[];
        if (units === existing.units) {
          nextHoldings = state.holdings.filter((h) => h.ticker !== ticker);
        } else {
          nextHoldings = state.holdings.map((holding) =>
            holding.ticker === ticker
              ? {
                  ...holding,
                  units: holding.units - units,
                  currentPrice: price,
                }
              : holding
          );
        }
        const newCash = state.user.cashBalance + total;
        const recomputed = recomputeHoldings(nextHoldings, newCash);
        const transaction: PortfolioTransaction = {
          id: makeTransactionId(),
          ticker,
          assetName: existing.name,
          type: 'SELL',
          units,
          pricePerUnit: price,
          totalAmount: total,
          timestamp: new Date().toISOString(),
          status: 'COMPLETED',
        };

        set({
          holdings: recomputed.holdings,
          transactions: [transaction, ...state.transactions],
          user: {
            ...state.user,
            cashBalance: newCash,
            totalHolding: recomputed.totalHolding,
          },
        });

        return {
          success: true,
          message: `Sold ${units} ${ticker} at ${price.toFixed(2)} USD.`,
        };
      },

      toggleWatchlist: (ticker) => {
        const state = get();
        const existing = state.watchlist.some((item) => item.ticker === ticker);
        if (existing) {
          set({
            watchlist: state.watchlist.filter((item) => item.ticker !== ticker),
          });
          return;
        }
        const holding = state.holdings.find((h) => h.ticker === ticker);
        const newItem: WatchlistItem = {
          id: `watch-${ticker.toLowerCase()}-${Date.now()}`,
          ticker,
          name: holding ? holding.name : ticker,
          exchange: holding ? holding.exchange : 'NASDAQ',
          price: holding ? holding.currentPrice : 100,
          changePercentage: 0,
          isGaining: true,
          viewCount: 0,
          category: 'Tech',
          sparkline: [90, 92, 94, 96, 97, 98, 100],
        };
        set({ watchlist: [...state.watchlist, newItem] });
      },

      isInWatchlist: (ticker) =>
        get().watchlist.some((item) => item.ticker === ticker),

      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        })),

      updateAssetPrice: (ticker, newPrice) =>
        set((state) => {
          if (!Number.isFinite(newPrice) || newPrice <= 0) {
            return state;
          }
          const holdings = state.holdings.map((holding) => {
            if (holding.ticker !== ticker) {
              return holding;
            }
            const changeAmount = (newPrice - holding.averageBuyPrice) * holding.units;
            const changePercentage =
              holding.averageBuyPrice > 0
                ? ((newPrice - holding.averageBuyPrice) / holding.averageBuyPrice) * 100
                : 0;
            return {
              ...holding,
              currentPrice: newPrice,
              changeAmount: Number(changeAmount.toFixed(2)),
              changePercentage: Number(changePercentage.toFixed(2)),
            };
          });
          const recomputed = recomputeHoldings(holdings, state.user.cashBalance);
          return {
            holdings: recomputed.holdings,
            user: { ...state.user, totalHolding: recomputed.totalHolding },
          };
        }),

      updateWatchlistPrice: (ticker, newPrice) =>
        set((state) => {
          if (!Number.isFinite(newPrice) || newPrice <= 0) {
            return state;
          }
          return {
            watchlist: state.watchlist.map((item) =>
              item.ticker === ticker
                ? {
                    ...item,
                    price: newPrice,
                    sparkline: [...item.sparkline.slice(1), newPrice],
                  }
                : item
            ),
          };
        }),

      toggleLiveTicker: () =>
        set((state) => ({
          isLiveTickerActive: !state.isLiveTickerActive,
        })),

      resetToDefaultSeed: () =>
        set({
          user: { ...INITIAL_USER_PROFILE },
          holdings: cloneHoldings(),
          watchlist: cloneWatchlist(),
          performanceHistory: clonePerformance(),
          transactions: cloneTransactions(),
          chatMessages: cloneChatMessages(),
          isLiveTickerActive: false,
        }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'helios_investments_store_v1',
      partialize: (state) => ({
        user: state.user,
        holdings: state.holdings,
        watchlist: state.watchlist,
        performanceHistory: state.performanceHistory,
        transactions: state.transactions,
        chatMessages: state.chatMessages,
        isLiveTickerActive: state.isLiveTickerActive,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
          const recomputed = recomputeHoldings(
            state.holdings,
            state.user.cashBalance
          );
          usePortfolioStore.setState({
            holdings: recomputed.holdings,
            user: { ...state.user, totalHolding: recomputed.totalHolding },
          });
        }
      },
    }
  )
);
