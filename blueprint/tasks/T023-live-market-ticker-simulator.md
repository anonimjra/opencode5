# T023 - Live Market Price Ticker Simulator

**Depends on:** T005, T006  
**Estimasi:** kecil

## Tujuan
Membangun modul simulasi pergerakan harga bursa realtime (`lib/ticker-simulator.ts`) yang dapat diaktifkan/dinonaktifkan oleh pengguna, menghasilkan fluktuasi acak mikro (±0.1% s/d ±0.3%) pada saham portofolio dan watchlist dengan efek visual kilau hijau/merah.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `lib/ticker-simulator.ts` : Modul pengatur interval simulator fluktuasi harga
- `components/ui/price-flash.tsx` : Wrapper visual angka dengan efek transisi hijau/merah

## Langkah
1. Buat `lib/ticker-simulator.ts`.
2. Buat custom hook `useLiveTickerSimulator()`:
   - Memantau flag `isLiveTickerActive` dari `usePortfolioStore`.
   - Jika aktif, jalankan `setInterval` setiap 3000ms (3 detik).
   - Pada setiap interval, pilih secara acak 1–2 saham dari `holdings` atau `watchlist`.
   - Hitung persentase delta acak antara -0.25% hingga +0.35%.
   - Hitung harga baru: `newPrice = Math.max(1, currentPrice * (1 + delta / 100))`.
   - Panggil `updateAssetPrice(ticker, newPrice)` di Zustand store.
   - Bersihkan interval saat unmount (`clearInterval`).
3. Buat komponen `components/ui/price-flash.tsx`:
   - Menerima nilai harga saat ini.
   - Membandingkan dengan nilai sebelumnya; jika naik beri animasi flash hijau tipis selama 600ms, jika turun beri flash merah tipis.
4. Pasang hook ini pada `components/layout/app-shell.tsx` agar simulator berjalan secara global ketika diaktifkan di Settings.

## Kriteria selesai
- [ ] Harga saham bergerak secara berkala ketika simulator diaktifkan.
- [ ] Angka yang berubah menampilkan efek visual kedip (*flash*) hijau atau merah yang elegan tanpa merusak tata letak.
- [ ] Simulator dapat dimatikan kapan saja dari menu Settings.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan delta persentase tidak terlalu besar agar angka saldo portofolio tetap realistis mendekati angka $12,304.11.
