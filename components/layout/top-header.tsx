'use client';

import Link from 'next/link';
import { Bell, Menu, Settings } from 'lucide-react';
import { cn } from '@/lib/formatters';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import type { ActiveSubTab } from '@/types';

const subTabs: ActiveSubTab[] = ['Market', 'Wallet', 'Tools'];

export function TopHeader() {
  const user = usePortfolioStore((state) => state.user);
  const setActiveSubTab = usePortfolioStore((state) => state.setActiveSubTab);
  const openChat = useUiStore((state) => state.openChat);
  const openSidebar = useUiStore((state) => state.openSidebar);

  return (
    <header className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={openSidebar}
            className="mt-1 rounded-xl border border-white/10 bg-white/5 p-2 text-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Welcome, {user.name.split(' ')[0]}
            </h1>
            <p className="mt-0.5 text-xs text-white/50">
              Here&apos;s your investment portfolio overview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative rounded-full border border-white/10 bg-white/5 p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-helios-loss ring-2 ring-helios-bg" />
          </button>
          <Link
            href="/settings"
            className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-helios-pink to-helios-violet text-xs font-bold text-white">
              NR
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-xs font-semibold text-white">{user.name}</p>
              <p className="text-[10px] text-white/50">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1">
          {subTabs.map((tab) => {
            const active = user.activeSubTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveSubTab(tab)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200',
                  active
                    ? 'border border-white/10 bg-helios-pill text-white shadow-sm'
                    : 'text-helios-text-secondary hover:text-white'
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={openChat}
          className="group flex flex-1 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-left text-xs text-white/50 transition-colors hover:bg-white/[0.07] sm:max-w-md"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 text-helios-mauve"
            aria-hidden="true"
          >
            <path
              d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6L12 3z"
              fill="currentColor"
            />
            <path
              d="M18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
          <span className="flex-1 truncate">Ask helios.ai anything</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 text-white/40"
            aria-hidden="true"
          >
            <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6 11a6 6 0 0012 0M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
