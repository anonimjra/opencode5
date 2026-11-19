import type { ReactNode } from 'react';
import { cn } from '@/lib/formatters';
import { formatPercentage } from '@/lib/formatters';

interface BadgeProps {
  children: ReactNode;
  variant?: 'gain' | 'loss' | 'neutral' | 'mauve';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
    gain: 'bg-helios-gain/10 text-helios-gain border-helios-gain/25',
    loss: 'bg-helios-loss/10 text-helios-loss border-helios-loss/25',
    neutral: 'bg-white/5 text-helios-text-secondary border-white/10',
    mauve: 'bg-helios-mauve/10 text-helios-mauve border-helios-mauve/25',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface ChangeBadgeProps {
  value: number;
  className?: string;
  showIcon?: boolean;
}

export function ChangeBadge({ value, className, showIcon = false }: ChangeBadgeProps) {
  const isGain = value >= 0;
  return (
    <Badge variant={isGain ? 'gain' : 'loss'} className={className}>
      {showIcon ? (isGain ? '▲' : '▼') : null}
      {formatPercentage(value)}
    </Badge>
  );
}
