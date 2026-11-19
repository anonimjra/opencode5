'use client';

import { useState } from 'react';
import { Activity, CircleDollarSign, RotateCcw, Settings2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/formatters';
import { toast } from '@/lib/toast';
import type { Currency } from '@/types';

const CURRENCIES: Currency[] = ['USD', 'IDR'];

export default function SettingsPage() {
  const user = usePortfolioStore((state) => state.user);
  const setCurrency = usePortfolioStore((state) => state.setCurrency);
  const isLiveTickerActive = usePortfolioStore((state) => state.isLiveTickerActive);
  const toggleLiveTicker = usePortfolioStore((state) => state.toggleLiveTicker);
  const resetToDefaultSeed = usePortfolioStore((state) => state.resetToDefaultSeed);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Manage your display currency, live simulator, and portfolio data."
      />

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-4 w-4 text-helios-mauve" />
          <h3 className="text-base font-bold text-white">Display Currency</h3>
        </div>
        <p className="mt-1 text-xs text-white/50">
          Choose how monetary values are displayed across the platform.
        </p>
        <div className="mt-4 flex gap-2">
          {CURRENCIES.map((currency) => (
            <button
              key={currency}
              type="button"
              onClick={() => {
                setCurrency(currency);
                toast.success('Currency updated', `Now displaying values in ${currency}.`);
              }}
              className={cn(
                'rounded-full px-5 py-2 text-xs font-semibold transition-all',
                user.currency === currency
                  ? 'border border-white/10 bg-[#2b2338] text-white'
                  : 'border border-white/5 bg-white/[0.03] text-helios-text-secondary hover:text-white'
              )}
            >
              {currency === 'USD' ? '$ USD' : 'Rp IDR'}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-helios-mauve" />
            <div>
              <h3 className="text-base font-bold text-white">Live Market Simulator</h3>
              <p className="mt-0.5 text-xs text-white/50">
                Simulate real-time price fluctuations every 3 seconds.
              </p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isLiveTickerActive}
            onClick={() => {
              toggleLiveTicker();
              toast.info(
                isLiveTickerActive ? 'Live simulator paused' : 'Live simulator activated',
                isLiveTickerActive
                  ? 'Prices will stop fluctuating.'
                  : 'Portfolio prices will now fluctuate in real time.'
              );
            }}
            className={cn(
              'relative h-7 w-12 rounded-full transition-colors',
              isLiveTickerActive ? 'bg-helios-gain/80' : 'bg-white/10'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform',
                isLiveTickerActive ? 'translate-x-[22px]' : 'translate-x-0.5'
              )}
            />
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-helios-mauve" />
          <h3 className="text-base font-bold text-white">Visual Theme</h3>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-helios-mauve/30 bg-helios-mauve/[0.06] p-4">
          <div className="flex gap-1.5">
            <span className="h-6 w-6 rounded-full bg-[#0e0c12] ring-1 ring-white/10" />
            <span className="h-6 w-6 rounded-full bg-[#15121b] ring-1 ring-white/10" />
            <span className="h-6 w-6 rounded-full bg-[#c084fc]" />
            <span className="h-6 w-6 rounded-full bg-[#34d399]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Dark Luxury Mauve Obsidian</p>
            <p className="text-[11px] text-white/50">Default signature Helios theme</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <h3 className="text-base font-bold text-white">Reset Portfolio Data</h3>
        <p className="mt-1 text-xs text-white/50">
          Restore the default Nadia Rachel portfolio seed. This clears local changes.
        </p>
        <div className="mt-4 flex items-center gap-2">
          {confirmReset ? (
            <>
              <Button
                variant="loss"
                onClick={() => {
                  resetToDefaultSeed();
                  setConfirmReset(false);
                  toast.success('Portfolio reset', 'Default Helios seed data restored.');
                }}
              >
                Confirm Reset
              </Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setConfirmReset(true)}>
              <RotateCcw className="h-4 w-4" />
              Reset to Default Seed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
