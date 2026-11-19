import { TopHeader } from '@/components/layout/top-header';
import { TotalHoldingCard } from '@/components/dashboard/total-holding-card';
import { AiDecisionBanner } from '@/components/dashboard/ai-decision-banner';
import { WatchlistCard } from '@/components/dashboard/watchlist-card';
import { PortfolioGrid } from '@/components/dashboard/portfolio-grid';
import { PerformanceChart } from '@/components/dashboard/performance-chart';

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <TopHeader />
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <TotalHoldingCard />
          <AiDecisionBanner />
        </div>
        <WatchlistCard />
        <PortfolioGrid />
      </div>
      <div className="mt-6">
        <PerformanceChart />
      </div>
    </div>
  );
}
