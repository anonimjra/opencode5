# T004 - Kompilasi Mock Seed Data Presisi Helios Nadia Portfolio

**Depends on:** T003  
**Estimasi:** sedang

## Tujuan
Menyusun data seed awal komprehensif di `lib/seeds.ts` yang merefleksikan nilai-nilai numerik pada gambar referensi: Total Holding $12,304.11, posisi 4 saham (AAPL, AMZN, MSFT, NVDA), watchlist (SPOT, AMZN, MSFT, NVDA), dan data kurva performa tahunan.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `lib/seeds.ts` : Koleksi data konstanta awal untuk hidrasi state lokal

## Langkah
1. Buat folder `lib/`.
2. Buat `lib/seeds.ts` dan impor antarmuka dari `@/types`.
3. Definisikan `INITIAL_USER_PROFILE`:
   - Name: "Nadia Rachel", Email: "rachel_helios@gmail.com", Saldo Kas: $ 5,418.91, Total Holding: $ 12,304.11.
4. Definisikan `INITIAL_HOLDINGS`:
   - AAPL: $ 1,721.3 (+12.31 / +0.7%), Units: 104
   - AMZN: $ 1,721.3 (+12.31 / +0.7%), Units: 12
   - MSFT: $ 1,721.3 (+12.31 / +0.7%), Units: 41
   - NVDA: $ 1,721.3 (+12.31 / +0.7%), Units: 16
5. Definisikan `INITIAL_WATCHLIST`:
   - Spotify (SPOT): $11,770.3 (+16.31%)
   - Amazon (AMZN): $10,280.8 (+8.11%)
   - Microsoft (MSFT): $8,510.2 (+4.89%)
   - NVIDIA (NVDA): $2,110.2 (+2.12%)
6. Definisikan `INITIAL_PERFORMANCE_HISTORY`:
   - 12 titik data bulanan (Jan–Dec), titik Juni memiliki milestone marker: Date "1st Jun 2025", Valuation "$ 16,500", Gain "+25%".
7. Definisikan `INITIAL_AI_MESSAGES`:
   - Pesan pembuka ramah dari Helios AI yang menyapa Nadia dan menawarkan analisis diversifikasi portofolio.

## Kriteria selesai
- [ ] Seluruh nilai numerik pada gambar referensi tersedia secara akurat di `lib/seeds.ts`.
- [ ] Validasi tipe TypeScript lolos tanpa error kompilasi.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan total penjumlahan valuasi aset dan saldo kas konsisten dengan nilai Total Holding $12,304.11.
