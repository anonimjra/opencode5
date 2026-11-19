'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';
import type { AIChatMessage } from '@/types';
import { usePortfolioStore } from '@/lib/store';
import { useUiStore } from '@/lib/ui-store';
import { cn } from '@/lib/formatters';
import { AiInsightCard } from '@/components/ai/ai-insight-card';

const QUICK_ACTIONS = [
  'Rebalance Portfolio',
  'Simulate NVDA Take-Profit',
  'Dividend Analysis',
];

function makeHeliosResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('rebalance')) {
    return 'Rebalance plan: reduce Big Tech from 70% to 60%, allocate 8% into short-duration bonds and 2% into cash reserves. This trims concentration risk while keeping your core growth thesis intact.';
  }
  if (lower.includes('nvda') || lower.includes('take')) {
    return 'NVDA has delivered strong momentum. A phased take-profit of 25% of your position would lock in gains, and rotating those proceeds into cash would lift your Sharpe ratio to approximately 2.3.';
  }
  if (lower.includes('dividend')) {
    return 'Your current basket is growth-heavy with a ~0.4% yield. Adding a dividend sleeve of 5-7% would improve income stability and dampen drawdowns during volatile quarters.';
  }
  return 'Based on your local portfolio data, your Sharpe ratio is healthy at 2.14. I would keep AAPL and MSFT as core holdings, trim the most concentrated position, and maintain 10% cash for tactical opportunities.';
}

export function AiChatDrawer() {
  const isChatOpen = useUiStore((state) => state.isChatOpen);
  const closeChat = useUiStore((state) => state.closeChat);
  const chatMessages = usePortfolioStore((state) => state.chatMessages);
  const addChatMessage = usePortfolioStore((state) => state.addChatMessage);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeChat();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!useUiStore.getState().isChatOpen) {
          useUiStore.getState().openChat();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [closeChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping, isChatOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    const userMessage: AIChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);
    window.setTimeout(() => {
      const heliosMessage: AIChatMessage = {
        id: `msg-helios-${Date.now()}`,
        sender: 'helios',
        content: makeHeliosResponse(trimmed),
        timestamp: new Date().toISOString(),
      };
      addChatMessage(heliosMessage);
      setIsTyping(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isChatOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeChat}
          />
          <motion.aside
            className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#120f17]/95 backdrop-blur-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-helios-mauve to-helios-violet">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-white">Helios AI Portfolio Intelligence</p>
                  <p className="text-[10px] text-helios-text-secondary">
                    Predictive copilot · always online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeChat}
                className="rounded-full p-1.5 text-helios-text-secondary transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close AI drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed',
                    message.sender === 'user'
                      ? 'ml-auto bg-helios-pill text-white'
                      : 'bg-helios-card text-white/80'
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isTyping ? (
                <div className="w-20 rounded-2xl bg-helios-card px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-helios-mauve" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-helios-mauve [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-helios-mauve [animation-delay:240ms]" />
                  </div>
                </div>
              ) : null}
              <AiInsightCard />
            </div>

            <div className="border-t border-white/5 px-5 py-4">
              <div className="mb-2.5 flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => sendMessage(action)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-helios-text-secondary transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {action}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask helios.ai anything"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-helios-mauve/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-helios-mauve to-helios-violet text-white transition-opacity hover:opacity-90"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
