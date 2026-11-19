# PROGRESS: Helios Investments Task Checklist

Daftar pelacakan eksekusi task otonom untuk `opencode`. Berikan tanda `[x]` saat sebuah task telah berhasil diverifikasi dan di-commit.

---

## Fase 1: Fondasi & Environment
- [x] `T001`: Inisialisasi Proyek Next.js 15, TypeScript Strict & Tooling (`package.json`, `tsconfig.json`)
- [x] `T002`: Konfigurasi Tailwind CSS v4, Token Warna Dark Mauve Obsidian & Utilitas Glow
- [x] `T003`: Definisi Kontrak Tipe TypeScript Komprehensif (`types/index.ts`)

## Fase 2: State Management & Mock Seeds
- [x] `T004`: Kompilasi Mock Seed Data Presisi Sesuai Gambar Referensi (`lib/seeds.ts`)
- [x] `T005`: Zustand Store Reaktif dengan Persistensi LocalStorage (`lib/store.ts`)
- [x] `T006`: Utilitas Formatter Finansial & Kalkulator Matematika Portofolio (`lib/formatters.ts`)

## Fase 3: Layout Shell & Navigasi
- [ ] `T007`: Root Layout, SEO Metadata & Wrapper Container (`app/layout.tsx`, `components/layout/app-shell.tsx`)
- [ ] `T008`: Sidebar Navigation Berkelas Dark Luxury dengan Pill Active Glow (`components/layout/sidebar.tsx`)
- [ ] `T009`: Top Header Shell, Segmented Controls & Global AI Prompt Bar (`components/layout/top-header.tsx`)

## Fase 4: Komponen Dashboard Utama (Visual Presisi)
- [ ] `T010`: Kartu Metrik Total Holding ($12,304.11) & Dropdown Rentang Waktu (`components/dashboard/total-holding-card.tsx`)
- [ ] `T011`: Banner Decisions Powered by Data & Tombol Explore AI Insights (`components/dashboard/ai-decision-banner.tsx`)
- [ ] `T012`: Kartu Watchlist Interaktif dengan Tab Most Viewed, Gain, Lose (`components/dashboard/watchlist-card.tsx`)
- [ ] `T013`: Grid 2x2 Posisi Portofolio (AAPL, AMZN, MSFT, NVDA) & Link See All (`components/dashboard/portfolio-grid.tsx`)
- [ ] `T014`: Portfolio Performance AreaChart Recharts dengan Milestone Marker (`components/dashboard/performance-chart.tsx`)
- [ ] `T015`: Perakitan Halaman Dashboard Utama (`app/page.tsx`)

## Fase 5: Fitur Interaktif & Ekstensi Enterprise
- [ ] `T016`: Helios AI Copilot Chat Drawer dengan Rekomendasi Rebalancing (`components/ai/ai-chat-drawer.tsx`)
- [ ] `T017`: Modal Drilldown Detail Aset & Simulasi Order Beli/Jual (`components/modals/transaction-modal.tsx`)
- [ ] `T018`: Halaman Detail Portofolio & Alokasi Sektor (`app/portfolio/page.tsx`)
- [ ] `T019`: Halaman Market Explorer & Screener Bursa NYSE/NASDAQ (`app/market/page.tsx`)
- [ ] `T020`: Halaman Analisis Risiko, Metrik & Sharpe Ratio (`app/analysis/page.tsx`)
- [ ] `T021`: Halaman Community Sentiment & Indeks Sentimen Pasar (`app/community/page.tsx`)
- [ ] `T022`: Service Export Laporan Portofolio ke Excel (.xlsx) dengan ExcelJS (`lib/excel-export.ts`)
- [ ] `T023`: Live Market Price Ticker Simulator (`lib/ticker-simulator.ts`)
- [ ] `T024`: Sistem Toast Notifikasi & Modal Konfirmasi Transaksi (`components/ui/toast.tsx`)

## Fase 6: Polish, Static Export & Final Verifikasi
- [ ] `T025`: Konfigurasi Static Export GitHub Pages & Bypass Jekyll (`next.config.ts`, `public/.nojekyll`)
- [ ] `T026`: Dokumentasi README.md Repositori, Audit Typecheck & Verifikasi Build Final

---

## Log Ringkasan Hasil Eksekusi
*(Diperbarui otomatis oleh opencode setelah seluruh task rampung)*
