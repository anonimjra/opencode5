'use client';

import { Sparkles } from 'lucide-react';
import { useUiStore } from '@/lib/ui-store';

export function AiDecisionBanner() {
  const openChat = useUiStore((state) => state.openChat);

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-helios-card p-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 glow-ai-radial" />
      <div className="relative">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-helios-mauve/30 bg-helios-mauve/10">
          <Sparkles className="h-4 w-4 text-helios-mauve" />
        </div>
        <h3 className="text-base font-bold tracking-tight text-white">
          Decisions Powered by Data
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-white/60">
          Move beyond guesswork with AI-driven investment insights tailored to your
          strategy.
        </p>
      </div>
      <div className="relative mt-6 flex justify-center">
        <button
          type="button"
          onClick={openChat}
          className="rounded-full bg-gradient-to-r from-fuchsia-400/90 to-purple-400/90 px-6 py-2.5 text-xs font-semibold text-black shadow-helios-glow transition-all duration-200 hover:opacity-95"
        >
          Explore AI Insights
        </button>
      </div>
    </div>
  );
}
