'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/formatters';

interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export function Dropdown<T extends string>({
  value,
  options,
  onChange,
  className,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
      >
        {active ? active.label : value}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-helios-text-secondary transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-24 overflow-hidden rounded-2xl border border-white/10 bg-helios-card-hover p-1 shadow-2xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center justify-center rounded-xl px-2 py-1.5 text-xs font-medium transition-colors',
                option.value === value
                  ? 'bg-helios-pill text-white'
                  : 'text-helios-text-secondary hover:bg-white/5 hover:text-white'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
