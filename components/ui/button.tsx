import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/formatters';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gain' | 'loss';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-gradient-to-r from-fuchsia-400/90 to-purple-400/90 text-black font-semibold hover:opacity-95 shadow-helios-glow',
    secondary:
      'bg-helios-pill border border-white/10 text-white hover:bg-helios-card-hover',
    ghost: 'bg-transparent text-helios-text-secondary hover:bg-white/5 hover:text-white',
    gain:
      'bg-helios-gain/15 border border-helios-gain/30 text-helios-gain hover:bg-helios-gain/25',
    loss:
      'bg-helios-loss/15 border border-helios-loss/30 text-helios-loss hover:bg-helios-loss/25',
  };
  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-sm',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
