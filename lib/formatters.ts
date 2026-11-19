import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Currency } from '@/types';

const USD_RATE = 15876;

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function trimNumber(value: number, decimals: number): string {
  const fixed = value.toFixed(decimals);
  if (fixed.includes('.')) {
    return fixed.replace(/\.?0+$/, '');
  }
  return fixed;
}

function withThousands(value: number, decimals: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  if (currency === 'IDR') {
    const idr = Math.round(safeAmount * USD_RATE);
    return `Rp ${idr.toLocaleString('id-ID')}`;
  }
  const hasDecimals = Math.abs(safeAmount) % 1 !== 0;
  const body = hasDecimals
    ? withThousands(safeAmount, 2)
    : withThousands(Math.round(safeAmount), 0);
  return `$ ${body}`;
}

export function formatCurrencyCompact(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const hasDecimals = Math.abs(safeAmount) % 1 !== 0;
  const body = hasDecimals
    ? withThousands(safeAmount, 2)
    : withThousands(Math.round(safeAmount), 0);
  return `$${body}`;
}

export function formatPercentage(value: number, showPlusSign = true): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  const sign = safeValue > 0 && showPlusSign ? '+' : '';
  return `${sign}${trimNumber(safeValue, 2)}%`;
}

export function formatNumber(value: number, decimals = 2): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  return safeValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatVolume(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  if (safeValue >= 1_000_000_000) {
    return `${trimNumber(safeValue / 1_000_000_000, 2)}B`;
  }
  if (safeValue >= 1_000_000) {
    return `${trimNumber(safeValue / 1_000_000, 2)}M`;
  }
  if (safeValue >= 1_000) {
    return `${trimNumber(safeValue / 1_000, 2)}K`;
  }
  return formatNumber(safeValue, 0);
}

export interface PnLResult {
  profitLoss: number;
  returnPercentage: number;
}

export function calculatePnL(
  currentPrice: number,
  avgPrice: number,
  units: number
): PnLResult {
  const cost = avgPrice * units;
  const marketValue = currentPrice * units;
  const profitLoss = marketValue - cost;
  const returnPercentage = cost > 0 ? (profitLoss / cost) * 100 : 0;
  return {
    profitLoss: Number.isFinite(profitLoss) ? profitLoss : 0,
    returnPercentage: Number.isFinite(returnPercentage) ? returnPercentage : 0,
  };
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function clampPercentage(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.min(100, Math.max(0, value));
}
