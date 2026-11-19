import type { AssetPosition, PortfolioTransaction, UserProfile } from '@/types';

function formatDateStamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function exportPortfolioToExcel(
  holdings: AssetPosition[],
  transactions: PortfolioTransaction[],
  user: UserProfile
): Promise<void> {
  const [{ default: ExcelJS }, { saveAs }] = await Promise.all([
    import('exceljs'),
    import('file-saver'),
  ]);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Helios Investments AI Platform';
  workbook.created = new Date();
  workbook.lastModifiedBy = 'Helios Investments';
  workbook.modified = new Date();

  const holdingsSheet = workbook.addWorksheet('Holdings & Valuation', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  holdingsSheet.columns = [
    { header: 'No', key: 'no', width: 6 },
    { header: 'Ticker', key: 'ticker', width: 10 },
    { header: 'Asset Name', key: 'name', width: 24 },
    { header: 'Exchange', key: 'exchange', width: 12 },
    { header: 'Units Held', key: 'units', width: 12 },
    { header: 'Average Buy Price ($)', key: 'avg', width: 20 },
    { header: 'Current Price ($)', key: 'current', width: 18 },
    { header: 'Total Valuation ($)', key: 'total', width: 20 },
    { header: 'Unrealized PnL ($)', key: 'pnl', width: 20 },
    { header: 'Return (%)', key: 'ret', width: 14 },
  ];

  const headerRow = holdingsSheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2B2338' },
    };
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });
  headerRow.height = 22;

  let totalValuation = 0;
  holdings.forEach((holding, index) => {
    const cost = holding.averageBuyPrice * holding.units;
    const marketValue = holding.currentPrice * holding.units;
    const pnl = marketValue - cost;
    const returnPct = cost > 0 ? (pnl / cost) * 100 : 0;
    totalValuation += marketValue;

    const row = holdingsSheet.addRow({
      no: index + 1,
      ticker: holding.ticker,
      name: holding.name,
      exchange: holding.exchange,
      units: holding.units,
      avg: holding.averageBuyPrice,
      current: holding.currentPrice,
      total: marketValue,
      pnl,
      ret: Number(returnPct.toFixed(2)),
    });

    ['avg', 'current', 'total', 'pnl'].forEach((key) => {
      const cell = row.getCell(key);
      cell.numFmt = '$#,##0.00';
    });
    row.getCell('ret').numFmt = '0.00"%"';
  });

  const totalRow = holdingsSheet.addRow({
    no: '',
    ticker: '',
    name: 'Total Portfolio Valuation',
    exchange: '',
    units: '',
    avg: '',
    current: '',
    total: totalValuation,
    pnl: '',
    ret: '',
  });
  totalRow.font = { bold: true, color: { argb: 'FFC084FC' } };
  totalRow.getCell('total').numFmt = '$#,##0.00';

  const cashRow = holdingsSheet.addRow({
    no: '',
    ticker: '',
    name: 'Cash Balance',
    exchange: '',
    units: '',
    avg: '',
    current: '',
    total: user.cashBalance,
    pnl: '',
    ret: '',
  });
  cashRow.font = { bold: true, color: { argb: 'FF34D399' } };
  cashRow.getCell('total').numFmt = '$#,##0.00';

  const transactionsSheet = workbook.addWorksheet('Transaction History', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  transactionsSheet.columns = [
    { header: 'Transaction ID', key: 'id', width: 28 },
    { header: 'Timestamp', key: 'timestamp', width: 24 },
    { header: 'Ticker', key: 'ticker', width: 10 },
    { header: 'Type (BUY/SELL)', key: 'type', width: 16 },
    { header: 'Units', key: 'units', width: 10 },
    { header: 'Execution Price ($)', key: 'price', width: 20 },
    { header: 'Total Amount ($)', key: 'amount', width: 20 },
    { header: 'Status', key: 'status', width: 14 },
  ];

  const txnHeader = transactionsSheet.getRow(1);
  txnHeader.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF3A3147' },
    };
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });
  txnHeader.height = 22;

  transactions.forEach((txn) => {
    const row = transactionsSheet.addRow({
      id: txn.id,
      timestamp: new Date(txn.timestamp).toLocaleString('en-US'),
      ticker: txn.ticker,
      type: txn.type,
      units: txn.units,
      price: txn.pricePerUnit,
      amount: txn.totalAmount,
      status: txn.status,
    });
    row.getCell('price').numFmt = '$#,##0.00';
    row.getCell('amount').numFmt = '$#,##0.00';
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `helios-portfolio-report-${formatDateStamp()}.xlsx`);
}
