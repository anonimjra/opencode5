# T006 - Helper Utilitas Formatter Finansial & Kalkulator Portofolio

**Depends on:** T003  
**Estimasi:** kecil

## Tujuan
Menyediakan modul utilitas terstandarisasi untuk pemformatan mata uang ($ USD dan Rp IDR), persentase kenaikan/penurunan, angka desimal akurat, tanggal, dan kalkulasi rasio portofolio.

## Baca dulu
- AGENTS.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `lib/formatters.ts` : Koleksi fungsi murni (*pure functions*) helper finansial

## Langkah
1. Buat `lib/formatters.ts`.
2. Buat fungsi `formatCurrency(amount: number, currency: 'USD' | 'IDR' = 'USD'): string`:
   - Contoh output USD: `$ 12,304.11` atau `$ 1,721.3`.
   - Contoh output IDR: `Rp 195.420.000`.
3. Buat fungsi `formatPercentage(value: number, showPlusSign: boolean = true): string`:
   - Contoh output: `+16.31%` atau `+0.7%` atau `-2.15%`.
4. Buat fungsi `formatNumber(value: number, decimals: number = 2): string`:
   - Menggunakan pemisah ribuan standar US (`12,304.11`).
5. Buat fungsi `calculatePnL(currentPrice: number, avgPrice: number, units: number)`:
   - Mengembalikan nominal profit/loss dan persentase return.
6. Buat fungsi `cn(...inputs)` menggunakan `clsx` dan `twMerge` untuk conditional className styling yang aman.

## Kriteria selesai
- [ ] Fungsi formatters mencakup seluruh kebutuhan tampilan di antarmuka Helios.
- [ ] Tampilan string mata uang dan persentase identik dengan visual pada gambar referensi.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Perhatikan spasi antara simbol dolar dan angka pada mockup: `$ 12,304.11` (memiliki spasi tunggal).
