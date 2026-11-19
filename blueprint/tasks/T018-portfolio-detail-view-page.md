# T018 - Halaman Detail Portofolio & Alokasi Sektor (/portfolio)

**Depends on:** T005, T008, T013  
**Estimasi:** sedang

## Tujuan
Membangun halaman manajemen portofolio lengkap (`app/portfolio/page.tsx`) yang diakses melalui tombol "See all" atau menu Sidebar, menampilkan tabel lengkap seluruh kepemilikan aset, alokasi sektor industri, dan ringkasan PnL kumulatif.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/03-ARCHITECTURE.md

## File yang dibuat / diubah
- `app/portfolio/page.tsx` : Halaman rute rincian portofolio lengkap

## Langkah
1. Buat folder `app/portfolio/` dan berkas `app/portfolio/page.tsx`.
2. Header Halaman:
   - Judul: "Portfolio Management & Asset Allocation".
   - Subjudul: "Detailed breakdown of Nadia's investment holdings and sector distribution."
   - Tombol Aksi: "Export to Excel (.xlsx)" dan "Add New Asset".
3. Ringkasan Metrik Kartu:
   - Total Portfolio Value ($).
   - Total Unrealized Gain/Loss ($ dan %).
   - Cash Balance ($).
   - Number of Active Holdings.
4. Tabel Kepemilikan Aset Komprehensif:
   - Kolom: Ticker & Asset Name, Exchange, Units Held, Average Buy Price, Current Price, Total Value, Unrealized PnL, Actions (Buy / Sell).
   - Terapkan styling baris tabel bertema dark luxury dengan border bawah tipis.
5. Diagram Donat / Progress Bar Alokasi Sektor:
   - Menampilkan persentase distribusi (Technology 65%, E-Commerce 15%, Entertainment 10%, Cash 10%).

## Kriteria selesai
- [ ] Halaman `/portfolio` dapat diakses dengan navigasi mulus dari Sidebar dan tautan "See all".
- [ ] Seluruh data saham terisi dari Zustand store dan reaktif terhadap perubahan transaksi.
- [ ] Tombol aksi Buy dan Sell di tabel membuka modal transaksi.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Gunakan komponen Client Component untuk tabel reaktif dan hindari layout shift saat data dimuat.
