# T005 - Store Zustand Reaktif dengan Persistensi LocalStorage

**Depends on:** T003, T004  
**Estimasi:** sedang

## Tujuan
Membangun store state terpusat menggunakan Zustand dengan middleware persistensi ke `localStorage`, mendukung aksi beli/jual aset, pembaruan watchlist, filter periode, dan penambahan pesan chat AI.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `lib/store.ts` : Implementasi Zustand store `usePortfolioStore`

## Langkah
1. Buat `lib/store.ts` dengan mengimpor `create` dari `zustand` dan `persist` dari `zustand/middleware`.
2. Definisikan state shape:
   - `user`: UserProfile
   - `holdings`: AssetPosition[]
   - `watchlist`: WatchlistItem[]
   - `performanceHistory`: PerformanceDataPoint[]
   - `transactions`: PortfolioTransaction[]
   - `chatMessages`: AIChatMessage[]
   - `isLiveTickerActive`: boolean
3. Implementasikan fungsi aksi (*actions*):
   - `setHoldingPeriod(period)`: mengubah filter rentang waktu (1M, 3M, 6M, 1Y, ALL).
   - `setPerformanceTimeframe(tf)`: mengubah filter timeframe grafik (1D, 1W, 1M, 6M, 1Y).
   - `setActiveSubTab(tab)`: mengubah sub-tab aktif (Market, Wallet, Tools).
   - `buyAsset(ticker, units, price)`: menambah unit kepemilikan, mengurangi saldo kas, merekam transaksi baru, dan menghitung ulang total holding.
   - `sellAsset(ticker, units, price)`: mengurangi unit kepemilikan, menambah saldo kas, merekam transaksi baru, dan menghitung ulang total holding.
   - `toggleWatchlist(ticker)`: menambah/menghapus saham dari watchlist.
   - `addChatMessage(message)`: menambah pesan ke percakapan asisten Helios AI.
   - `updateAssetPrice(ticker, newPrice)`: update harga realtime dari simulator.
   - `resetToDefaultSeed()`: mereset state ke kondisi default jika pengguna ingin kembali ke data awal.
4. Terapkan persistensi dengan nama key `'helios_investments_store_v1'`.

## Kriteria selesai
- [ ] Store Zustand terkonfigurasi dengan middleware persistensi.
- [ ] Seluruh aksi mutasi state (buy, sell, update price, add chat) berjalan reaktif.
- [ ] Data tersimpan di `localStorage` peramban pengguna dan bertahan setelah reload halaman.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Tangani hidrasi sisi klien dengan aman di Next.js untuk mencegah peringatan *hydration mismatch* (misal dengan flag `hasHydrated` atau komponen pembungkus).
