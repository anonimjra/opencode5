'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { exportPortfolioToExcel } from '@/lib/excel-export';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/formatters';

interface ExportButtonProps {
  className?: string;
}

export function ExportButton({ className }: ExportButtonProps) {
  const holdings = usePortfolioStore((state) => state.holdings);
  const transactions = usePortfolioStore((state) => state.transactions);
  const user = usePortfolioStore((state) => state.user);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isExporting) {
      return;
    }
    setIsExporting(true);
    try {
      await exportPortfolioToExcel(holdings, transactions, user);
      toast.success('Report exported', 'Your Excel workbook has been downloaded.');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to generate the Excel file.';
      toast.error('Export failed', message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-helios-mauve/30 bg-helios-mauve/10 px-4 py-2 text-xs font-semibold text-helios-mauve transition-colors hover:bg-helios-mauve/20 disabled:opacity-60',
        className
      )}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isExporting ? 'Exporting…' : 'Export to Excel'}
    </button>
  );
}
