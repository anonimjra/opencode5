'use client';

import { useState } from 'react';
import { MessageSquare, ThumbsDown, ThumbsUp, Users } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { cn, formatCurrency, formatDate } from '@/lib/formatters';
import { COMMUNITY_POSTS, SENTIMENT_POLLS } from '@/lib/seeds';

type Vote = 'bullish' | 'bearish';

const SENTIMENT_LABEL = 'Greed';
const FEAR_GREED_VALUE = 72;

function sentimentColorClass(value: number): string {
  if (value >= 60) {
    return 'text-helios-gain';
  }
  if (value >= 40) {
    return 'text-yellow-300';
  }
  return 'text-helios-loss';
}

export default function CommunityPage() {
  const [votes, setVotes] = useState<Record<string, Vote>>({});

  const handleVote = (ticker: string, vote: Vote) => {
    setVotes((prev) => ({ ...prev, [ticker]: vote }));
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Market Pulse & Community Sentiment"
        subtitle="Real-time trader sentiment, consensus analyst ratings, and crowd insights."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/5 bg-helios-card p-5 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-helios-mauve" />
            <h3 className="text-sm font-bold text-white">Fear &amp; Greed Index</h3>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div className="relative flex h-36 w-36 items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(FEAR_GREED_VALUE / 100) * 327} 327`}
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-3xl font-extrabold text-white">{FEAR_GREED_VALUE}</p>
                <p className={cn('text-xs font-semibold', sentimentColorClass(FEAR_GREED_VALUE))}>
                  {SENTIMENT_LABEL}
                </p>
              </div>
            </div>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-white/50">
              Consistent optimistic momentum over the last 7 trading days. Sentiment remains
              constructive but watch for overheating in AI names.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-helios-card p-5 lg:col-span-2">
          <h3 className="text-base font-bold text-white">Community Sentiment Polls</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SENTIMENT_POLLS.map((poll) => {
              const userVote = votes[poll.ticker];
              const bullish = poll.bullishPercentage + (userVote === 'bullish' ? 1 : 0);
              const bearish = poll.bearishPercentage + (userVote === 'bearish' ? 1 : 0);
              return (
                <div
                  key={poll.ticker}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{poll.ticker}</p>
                      <p className="text-[11px] text-white/40">{poll.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40">Consensus</p>
                      <p className="text-xs font-semibold text-white">
                        {formatCurrency(poll.consensusTarget)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-helios-gain"
                      style={{ width: `${bullish}%` }}
                    />
                    <div
                      className="h-full bg-helios-loss"
                      style={{ width: `${bearish}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className="text-helios-gain">{bullish}% Bullish</span>
                    <span className="text-helios-loss">{bearish}% Bearish</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleVote(poll.ticker, 'bullish')}
                      className={cn(
                        'inline-flex items-center justify-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold transition-colors',
                        userVote === 'bullish'
                          ? 'border-helios-gain/40 bg-helios-gain/20 text-helios-gain'
                          : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                      )}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      Bullish
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVote(poll.ticker, 'bearish')}
                      className={cn(
                        'inline-flex items-center justify-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold transition-colors',
                        userVote === 'bearish'
                          ? 'border-helios-loss/40 bg-helios-loss/20 text-helios-loss'
                          : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                      )}
                    >
                      <ThumbsDown className="h-3 w-3" />
                      Bearish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-helios-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-helios-mauve" />
          <h3 className="text-base font-bold text-white">Verified Analyst Feed</h3>
        </div>
        <div className="flex flex-col gap-3">
          {COMMUNITY_POSTS.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-helios-pink to-helios-violet text-xs font-bold text-white">
                  {post.avatarInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">{post.author}</p>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                        post.sentiment === 'bullish'
                          ? 'bg-helios-gain/10 text-helios-gain'
                          : post.sentiment === 'bearish'
                            ? 'bg-helios-loss/10 text-helios-loss'
                            : 'bg-white/10 text-white/70'
                      )}
                    >
                      {post.sentiment}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/40">{post.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">{post.content}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-white/40">
                    <span>{formatDate(post.timestamp)}</span>
                    <span>· {post.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
