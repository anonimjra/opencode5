# 06-DATA-MODEL: TypeScript Contracts & Mock Seed Schema

Dokumen ini mendefinisikan seluruh antarmuka data TypeScript dan struktur state untuk aplikasi **Helios Investments**.

---

## 1. Definisi Tipe Data Inti (`types/index.ts`)

```typescript
// 1. Tipe Posisi Aset dalam Portofolio (AAPL, AMZN, MSFT, NVDA, dll.)
export interface AssetPosition {
  id: string;
  ticker: string;              // Contoh: "AAPL", "AMZN", "MSFT", "NVDA"
  name: string;                // Contoh: "Apple Inc.", "Amazon.com Inc."
  exchange: 'NYSE' | 'NASDAQ'; // Contoh: "NASDAQ"
  currentPrice: number;        // Harga per lembar saat ini (USD)
  units: number;               // Jumlah kepemilikan unit/lembar (contoh: 104, 12, 41, 16)
  averageBuyPrice: number;     // Harga rata-rata perolehan
  totalValue: number;          // units * currentPrice
  changeAmount: number;        // Kenaikan/penurunan nominal (+12.31)
  changePercentage: number;    // Kenaikan/penurunan persentase (+0.7%)
  logoUrl?: string;            // Ikon logo brand (SVG atau Unsplash CDN)
  allocationPercentage: number;// Persentase terhadap total portofolio
}

// 2. Tipe Aset dalam Daftar Pantau (Watchlist)
export interface WatchlistItem {
  id: string;
  ticker: string;              // "SPOT", "AMZN", "MSFT", "NVDA"
  name: string;                // "Spotify", "Amazon", "Microsoft", "NVIDIA"
  exchange: 'NYSE' | 'NASDAQ';
  price: number;               // 11770.3, 10280.8, 8510.2, 2110.2
  changePercentage: number;    // +16.31, +8.11, +4.89, +2.12
  isGaining: boolean;          // true jika profit, false jika loss
  viewCount: number;           // Untuk filter "Most Viewed"
  category: 'Tech' | 'Entertainment' | 'E-Commerce' | 'Semiconductor';
  sparkline: number[];         // 7 titik data tren mini
}

// 3. Tipe Titik Data Performa Grafik Tahunan (Recharts AreaChart)
export interface PerformanceDataPoint {
  month: string;               // "Jan", "Feb", "Mar", ..., "Dec"
  valuation: number;           // Nilai valuasi portofolio (contoh: 16500)
  milestone?: {
    dateLabel: string;         // "1st Jun 2025"
    gainBadge: string;         // "+25%"
    isHighlighted: boolean;    // true untuk titik sorot khusus bulan Juni
  };
}

// 4. Tipe Transaksi Portofolio (Simulasi Order Buy/Sell)
export interface PortfolioTransaction {
  id: string;
  ticker: string;
  assetName: string;
  type: 'BUY' | 'SELL';
  units: number;
  pricePerUnit: number;
  totalAmount: number;
  timestamp: string;           // ISO 8601 string
  status: 'COMPLETED' | 'PENDING';
}

// 5. Tipe Asisten AI Helios & Insight
export interface AIChatMessage {
  id: string;
  sender: 'user' | 'helios';
  content: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'REBALANCE' | 'BUY_MORE' | 'TAKE_PROFIT';
    ticker?: string;
  };
}

// 6. Profil Pengguna & State Utama
export interface UserProfile {
  name: string;                // "Nadia Rachel"
  email: string;               // "rachel_helios@gmail.com"
  avatarUrl: string;
  currency: 'USD' | 'IDR';
  cashBalance: number;         // Saldo kas tunai yang belum dibelanjakan
  totalHolding: number;        // Total valuasi ($ 12,304.11)
  holdingPeriod: '1M' | '3M' | '6M' | '1Y' | 'ALL';
  performanceTimeframe: '1D' | '1W' | '1M' | '6M' | '1Y';
  activeSubTab: 'Market' | 'Wallet' | 'Tools';
  isLiveTickerActive: boolean; // Toggle simulator fluktuasi harga
}
```

---

## 2. Mock Seed Data Spesifik Gambar Referensi

Dataset awal wajib diisi dengan nilai yang identik dengan gambar:

```typescript
export const INITIAL_HOLDINGS: AssetPosition[] = [
  {
    id: 'asset-1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    currentPrice: 16.55,
    units: 104,
    averageBuyPrice: 16.43,
    totalValue: 1721.3,
    changeAmount: 12.31,
    changePercentage: 0.7,
    allocationPercentage: 14.0,
  },
  {
    id: 'asset-2',
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    exchange: 'NASDAQ',
    currentPrice: 143.44,
    units: 12,
    averageBuyPrice: 142.41,
    totalValue: 1721.3,
    changeAmount: 12.31,
    changePercentage: 0.7,
    allocationPercentage: 14.0,
  },
  {
    id: 'asset-3',
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    exchange: 'NASDAQ',
    currentPrice: 41.98,
    units: 41,
    averageBuyPrice: 41.68,
    totalValue: 1721.3,
    changeAmount: 12.31,
    changePercentage: 0.7,
    allocationPercentage: 14.0,
  },
  {
    id: 'asset-4',
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    exchange: 'NASDAQ',
    currentPrice: 107.58,
    units: 16,
    averageBuyPrice: 106.81,
    totalValue: 1721.3,
    changeAmount: 12.31,
    changePercentage: 0.7,
    allocationPercentage: 14.0,
  },
];

export const INITIAL_WATCHLIST: WatchlistItem[] = [
  {
    id: 'watch-1',
    ticker: 'SPOT',
    name: 'Spotify',
    exchange: 'NYSE',
    price: 11770.3,
    changePercentage: 16.31,
    isGaining: true,
    viewCount: 1420,
    category: 'Entertainment',
    sparkline: [9800, 10200, 10500, 10900, 11200, 11500, 11770.3],
  },
  {
    id: 'watch-2',
    ticker: 'AMZN',
    name: 'Amazon',
    exchange: 'NYSE',
    price: 10280.8,
    changePercentage: 8.11,
    isGaining: true,
    viewCount: 1280,
    category: 'E-Commerce',
    sparkline: [9500, 9700, 9850, 10000, 10100, 10200, 10280.8],
  },
  {
    id: 'watch-3',
    ticker: 'MSFT',
    name: 'Microsoft',
    exchange: 'NYSE',
    price: 8510.2,
    changePercentage: 4.89,
    isGaining: true,
    viewCount: 1150,
    category: 'Tech',
    sparkline: [8100, 8200, 8250, 8350, 8400, 8480, 8510.2],
  },
  {
    id: 'watch-4',
    ticker: 'NVDA',
    name: 'NVIDIA',
    exchange: 'NYSE',
    price: 2110.2,
    changePercentage: 2.12,
    isGaining: true,
    viewCount: 990,
    category: 'Semiconductor',
    sparkline: [2050, 2060, 2075, 2090, 2095, 2105, 2110.2],
  },
];

export const INITIAL_PERFORMANCE_HISTORY: PerformanceDataPoint[] = [
  { month: 'Jan', valuation: 185000 },
  { month: 'Feb', valuation: 155000 },
  { month: 'Mar', valuation: 160000 },
  { month: 'Apr', valuation: 145000 },
  { month: 'May', valuation: 150000 },
  {
    month: 'Jun',
    valuation: 165000,
    milestone: {
      dateLabel: '1st Jun 2025',
      gainBadge: '+25%',
      isHighlighted: true,
    },
  },
  { month: 'Jul', valuation: 172000 },
  { month: 'Aug', valuation: 135000 },
  { month: 'Sep', valuation: 95000 },
  { month: 'Oct', valuation: 115000 },
  { month: 'Nov', valuation: 90000 },
  { month: 'Dec', valuation: 80000 },
];
```
