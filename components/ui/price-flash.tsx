'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/formatters';

interface PriceFlashProps {
  value: number;
  children: ReactNode;
  className?: string;
}

export function PriceFlash({ value, children, className }: PriceFlashProps) {
  const previous = useRef<number | null>(null);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (previous.current === null) {
      previous.current = value;
      return;
    }
    if (value > previous.current) {
      setFlash('up');
    } else if (value < previous.current) {
      setFlash('down');
    }
    previous.current = value;
    const timer = window.setTimeout(() => setFlash(null), 600);
    return () => window.clearTimeout(timer);
  }, [value]);

  return (
    <span
      className={cn(
        'rounded-md px-1 transition-colors duration-500',
        flash === 'up' && 'bg-helios-gain/15 text-helios-gain',
        flash === 'down' && 'bg-helios-loss/15 text-helios-loss',
        className
      )}
    >
      {children}
    </span>
  );
}
