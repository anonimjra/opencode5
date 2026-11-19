export type Exchange = 'NYSE' | 'NASDAQ';

export type Currency = 'USD' | 'IDR';

export type HoldingPeriod = '1M' | '3M' | '6M' | '1Y' | 'ALL';

export type PerformanceTimeframe = '1D' | '1W' | '1M' | '6M' | '1Y';

export type ActiveSubTab = 'Market' | 'Wallet' | 'Tools';

export type WatchlistCategory =
  | 'Tech'
  | 'Entertainment'
  | 'E-Commerce'
  | 'Semiconductor'
  | 'AI & Chips'
  | 'Clean Energy'
  | 'Financials';

export type TransactionType = 'BUY' | 'SELL';

export type TransactionStatus = 'COMPLETED' | 'PENDING';

export type AiSender = 'user' | 'helios';

export type AiActionType = 'REBALANCE' | 'BUY_MORE' | 'TAKE_PROFIT';

export type MarketSector =
  | 'Big Tech'
  | 'AI & Chips'
  | 'E-Commerce'
  | 'Entertainment'
  | 'Clean Energy'
  | 'Financials';

export interface AssetPosition {
  id: string;
  ticker: string;
  name: string;
  exchange: Exchange;
  currentPrice: number;
  units: number;
  averageBuyPrice: number;
  totalValue: number;
  changeAmount: number;
  changePercentage: number;
  logoUrl?: string;
  allocationPercentage: number;
}

export interface MilestoneData {
  dateLabel: string;
  gainBadge: string;
  isHighlighted: boolean;
}

export interface PerformanceDataPoint {
  month: string;
  valuation: number;
  milestone?: MilestoneData;
}

export interface WatchlistItem {
  id: string;
  ticker: string;
  name: string;
  exchange: Exchange;
  price: number;
  changePercentage: number;
  isGaining: boolean;
  viewCount: number;
  category: WatchlistCategory;
  sparkline: number[];
}

export interface PortfolioTransaction {
  id: string;
  ticker: string;
  assetName: string;
  type: TransactionType;
  units: number;
  pricePerUnit: number;
  totalAmount: number;
  timestamp: string;
  status: TransactionStatus;
}

export interface AiSuggestedAction {
  label: string;
  actionType: AiActionType;
  ticker?: string;
}

export interface AIChatMessage {
  id: string;
  sender: AiSender;
  content: string;
  timestamp: string;
  suggestedAction?: AiSuggestedAction;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  currency: Currency;
  cashBalance: number;
  totalHolding: number;
  holdingPeriod: HoldingPeriod;
  performanceTimeframe: PerformanceTimeframe;
  activeSubTab: ActiveSubTab;
  isLiveTickerActive: boolean;
}

export interface MarketEquity {
  id: string;
  ticker: string;
  name: string;
  exchange: Exchange;
  sector: MarketSector;
  price: number;
  changePercentage: number;
  volume: number;
  marketCap: number;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  changePercentage: number;
}

export interface SentimentPoll {
  ticker: string;
  name: string;
  bullishPercentage: number;
  bearishPercentage: number;
  consensusTarget: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  role: string;
  avatarInitials: string;
  content: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  timestamp: string;
  likes: number;
}

export interface MarketScenario {
  id: string;
  title: string;
  description: string;
  impactPercentage: number;
  category: 'risk' | 'opportunity';
}

export interface QuantitativeMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  status: 'healthy' | 'moderate' | 'warning';
}

export interface SectorAllocation {
  sector: string;
  percentage: number;
  color: string;
}

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}
