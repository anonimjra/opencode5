'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { ToastContainer } from '@/components/ui/toast';
import { AiChatDrawer } from '@/components/ai/ai-chat-drawer';
import { TransactionModal } from '@/components/modals/transaction-modal';
import { AssetDetailModal } from '@/components/modals/asset-detail-modal';
import { usePortfolioStore } from '@/lib/store';
import { useLiveTickerSimulator } from '@/lib/ticker-simulator';

export function AppShell({ children }: { children: ReactNode }) {
  const hasHydrated = usePortfolioStore((state) => state.hasHydrated);
  const [isMounted, setIsMounted] = useState(false);

  useLiveTickerSimulator();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-helios-bg">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">
            {isMounted && hasHydrated ? (
              children
            ) : (
              <div className="space-y-4">
                <div className="h-24 animate-pulse rounded-3xl border border-white/5 bg-helios-card" />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="h-72 animate-pulse rounded-3xl border border-white/5 bg-helios-card" />
                  <div className="h-72 animate-pulse rounded-3xl border border-white/5 bg-helios-card" />
                  <div className="h-72 animate-pulse rounded-3xl border border-white/5 bg-helios-card" />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <AiChatDrawer />
      <TransactionModal />
      <AssetDetailModal />
      <ToastContainer />
    </div>
  );
}
