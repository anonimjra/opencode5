'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import type { ToastMessage } from '@/types';
import { toastEmitter } from '@/lib/toast';

const AUTO_DISMISS_MS = 3500;

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = toastEmitter.subscribe((toast) => {
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, AUTO_DISMISS_MS);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon =
            toast.variant === 'success'
              ? CheckCircle2
              : toast.variant === 'error'
                ? AlertCircle
                : Info;
          const iconColor =
            toast.variant === 'success'
              ? 'text-helios-gain'
              : toast.variant === 'error'
                ? 'text-helios-loss'
                : 'text-helios-mauve';
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pointer-events-auto w-80 rounded-2xl border border-white/10 bg-[#1c1824]/95 p-4 text-sm text-white shadow-2xl backdrop-blur-lg"
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-0.5 text-xs text-white/60">{toast.description}</p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
