# T017 - Modal Drilldown Detail Aset & Simulasi Order Beli/Jual

**Depends on:** T005, T006, T013  
**Estimasi:** sedang

## Tujuan
Mengembangkan modal pop-up interaktif (`components/modals/transaction-modal.tsx`) untuk melihat detail posisi saham dan mengeksekusi simulasi order beli (*Buy*) atau jual (*Sell*) secara instan dengan efek selebrasi konfeti.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `components/modals/transaction-modal.tsx` : Modal transaksi beli/jual saham
- `components/modals/asset-detail-modal.tsx` : Modal rincian metrik performa saham

## Langkah
1. Buat `components/modals/transaction-modal.tsx`:
   - Backdrop semi-transparan gelap dengan `backdrop-blur-md`.
   - Header modal: Ticker saham (misal: "AAPL - Apple Inc."), harga pasar terkini, dan bursa.
   - Pilihan Tab Tipe Order: **BUY** (warna hijau) atau **SELL** (warna merah).
   - Input field: Jumlah unit/lembar saham yang ingin ditransaksikan.
   - Ringkasan kalkulasi otomatis:
     - Estimasi Total Biaya = `units * currentPrice`.
     - Sisa Saldo Kas Pengguna setelah transaksi.
   - Tombol Konfirmasi: "Execute Buy Order" atau "Execute Sell Order".
2. Integrasikan dengan aksi `buyAsset` atau `sellAsset` di `usePortfolioStore`.
3. Pasang efek animasi konfeti via `canvas-confetti` saat transaksi berhasil dieksekusi.
4. Tampilkan pesan feedback toast sukses dan perbarui total holding secara otomatis.

## Kriteria selesai
- [ ] Modal dapat dibuka dari kartu posisi saham di dashboard maupun dari watchlist.
- [ ] Transaksi beli/jual secara instan memperbarui unit saham dan saldo kas di LocalStorage.
- [ ] Validasi input mencegah pembelian melebihi saldo kas atau penjualan melebihi unit yang dimiliki.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan input angka tidak menerima nilai negatif atau non-numerik.
