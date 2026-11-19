# T022 - Service Export Laporan Portofolio ke Excel (.xlsx) dengan ExcelJS

**Depends on:** T005, T006  
**Estimasi:** sedang

## Tujuan
Membangun modul pembuat berkas spreadsheet Excel client-side (`lib/excel-export.ts`) menggunakan `exceljs` dan `file-saver` untuk mengunduh rekap portofolio, rincian kepemilikan aset, dan riwayat transaksi Nadia Rachel ke dalam file `.xlsx` berformat rapi.

## Baca dulu
- AGENTS.md
- blueprint/04-TECH-STACK.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `lib/excel-export.ts` : Helper fungsi pembuat workbook dan download Excel
- `components/portfolio/export-button.tsx` : Tombol UI unduh laporan Excel

## Langkah
1. Buat `lib/excel-export.ts`.
2. Impor `ExcelJS` dari `exceljs` dan `saveAs` dari `file-saver`.
3. Buat fungsi `exportPortfolioToExcel(holdings, transactions, user)`:
   - Buat workbook baru: `const workbook = new ExcelJS.Workbook();`.
   - Set metadata: creator "Helios Investments AI Platform", created date.
   - **Sheet 1: "Holdings & Valuation"**
     - Header Row: No, Ticker, Asset Name, Exchange, Units Held, Average Buy Price ($), Current Price ($), Total Valuation ($), Unrealized PnL ($), Return (%).
     - Style header: Background warna ungu tua (`#2b2338`), teks putih tebal, rata tengah.
     - Masukkan seluruh baris data dari `holdings`.
     - Baris Total di bagian bawah: Total Valuasi Portofolio dan Total Kas.
     - Terapkan format angka numerik `'$#,##0.00'` pada kolom harga dan valuasi.
   - **Sheet 2: "Transaction History"**
     - Header Row: Transaction ID, Timestamp, Ticker, Type (BUY/SELL), Units, Execution Price ($), Total Amount ($), Status.
     - Style header: Background abu-abu keunguan, teks putih.
     - Masukkan riwayat transaksi dari `transactions`.
   - Generate buffer: `const buffer = await workbook.xlsx.writeBuffer();`.
   - Trigger download dengan nama berkas dinamis: `helios-portfolio-report-YYYY-MM-DD.xlsx`.
4. Buat komponen tombol `components/portfolio/export-button.tsx` yang memicu pemanggilan fungsi ini saat diklik.

## Kriteria selesai
- [ ] Tombol export menghasilkan file `.xlsx` yang dapat dibuka di Microsoft Excel, Google Sheets, atau LibreOffice tanpa peringatan korup.
- [ ] Sheet 1 dan Sheet 2 memuat data presisi dengan styling header dan format angka dolar yang benar.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan import dinamis (`import('exceljs')`) atau pastikan tidak ada eksekusi kode Node.js filesystem (`fs`) saat berjalan di peramban klien.
