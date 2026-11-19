'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Briefcase,
  Headphones,
  LayoutDashboard,
  LineChart,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/formatters';
import { useUiStore } from '@/lib/ui-store';

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const primaryNav: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { label: 'Analysis', href: '/analysis', icon: BarChart3 },
  { label: 'Market', href: '/market', icon: LineChart },
  { label: 'Community', href: '/community', icon: Users },
];

const secondaryNav: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Support', href: '/settings', icon: Headphones },
];

function HeliosLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-helios-mauve to-helios-violet shadow-helios-glow">
        <span className="text-lg font-black text-white">H</span>
      </div>
      <span className="text-base font-bold tracking-tight text-white">
        Helios Investments
      </span>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const renderLink = (item: NavItem) => {
    const active = isActive(item.href);
    const Icon = item.icon;
    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={closeSidebar}
        className={cn(
          'flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
          active
            ? 'pill-active-glow text-white'
            : 'text-helios-text-secondary hover:bg-white/5 hover:text-white'
        )}
      >
        <Icon className={cn('h-[18px] w-[18px]', active && 'text-helios-mauve')} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {isSidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      ) : null}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col justify-between border-r border-white/5 bg-helios-card/60 px-5 py-6 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-transparent',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div>
          <div className="flex items-center justify-between">
            <HeliosLogo />
            <button
              type="button"
              onClick={closeSidebar}
              className="rounded-full p-1 text-helios-text-secondary hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-1.5">{primaryNav.map(renderLink)}</nav>
        </div>
        <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
          {secondaryNav.map(renderLink)}
        </div>
      </aside>
    </>
  );
}
