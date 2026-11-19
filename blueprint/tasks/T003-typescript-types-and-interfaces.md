# T003 - Definisi Tipe Data TypeScript & Kontrak Model Finansial

**Depends on:** T001  
**Estimasi:** kecil

## Tujuan
Membuat berkas kontrak tipe data TypeScript komprehensif yang mencakup entitas AssetPosition, WatchlistItem, PerformanceDataPoint, PortfolioTransaction, AIChatMessage, dan UserProfile.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `types/index.ts` : Berkas sentral definisi antarmuka dan tipe data TypeScript

## Langkah
1. Buat folder `types/` di root proyek.
2. Buat berkas `types/index.ts` dengan interface lengkap sesuai `06-DATA-MODEL.md`:
   - `AssetPosition`: kepemilikan saham, ticker, nama, bursa, harga, unit, total valuasi, alokasi %.
   - `WatchlistItem`: item daftar pantau saham, persentase gain/loss, jumlah views, kategori, sparkline.
   - `PerformanceDataPoint`: histori kurva bulanan (Jan-Dec) dan penanda milestone khusus bulan Juni.
   - `PortfolioTransaction`: catatan simulasi order beli dan jual aset.
   - `AIChatMessage`: percakapan pengguna dan asisten Helios AI serta saran aksi.
   - `UserProfile`: data profil Nadia Rachel, saldo kas, pilihan mata uang, dan preferensi tampilan.
3. Ekspor seluruh antarmuka agar dapat diimpor dengan mudah melalui path `@/types`.

## Kriteria selesai
- [ ] Berkas `types/index.ts` terdefinisi 100% lengkap tanpa penggunaan tipe `any`.
- [ ] Seluruh tipe selaras dengan data pada gambar referensi.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan tinggalkan tipe opsional yang memicu *undefined errors* pada komponen kalkulasi numerik.
