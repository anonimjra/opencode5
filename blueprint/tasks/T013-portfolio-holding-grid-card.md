# T013 - Grid 2x2 Posisi Portofolio (AAPL, AMZN, MSFT, NVDA) & Link See All

**Depends on:** T004, T005, T006  
**Estimasi:** sedang

## Tujuan
Membangun kartu "My Portfolio" (`components/dashboard/portfolio-grid.tsx`) yang memiliki tautan "See all" dengan panah diagonal, serta grid 2x2 kartu saham (AAPL, AMZN, MSFT, NVDA) menampilkan valuasi $ 1,721.3, profit gain, dan unit kepemilikan.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/dashboard/portfolio-grid.tsx` : Komponen grid posisi kepemilikan saham

## Langkah
1. Buat `components/dashboard/portfolio-grid.tsx`.
2. Header Komponen:
   - Judul: `<h3 className="text-base font-bold text-white">My Portfolio</h3>`.
   - Tombol Kanan: Tombol pill "See all" didampingi ikon panah miring kanan-atas (`arrow-up-right`), mengarah ke rute `/portfolio`.
3. Grid 2x2 Kartu Posisi:
   - Gunakan layout `grid grid-cols-2 gap-3 mt-3`.
   - Masing-masing kotak kartu memiliki:
     - Header kartu: Logo ticker saham kecil.
     - Valuasi: `<div className="text-base font-bold text-white mt-1">$ 1,721.3</div>`.
     - Sub-baris Gain: `<span className="text-[11px] text-helios-gain font-medium">+12.31 (0.7%)</span>`.
     - Footer baris:
       - Ticker di kiri: `AAPL`, `AMZN`, `MSFT`, `NVDA`.
       - Jumlah unit di kanan: `Units 104`, `Units 12`, `Units 41`, `Units 16` (`text-xs text-white/50`).
4. Interaksi:
   - Klik pada salah satu kotak posisi memicu pembukaan modal drilldown posisi saham untuk melihat grafik mini dan tombol order.

## Kriteria selesai
- [ ] Grid 2x2 posisi menampilkan data persis seperti di gambar referensi.
- [ ] Tombol "See all" terhubung dengan navigasi halaman portofolio.
- [ ] Desain kartu selaras dengan tema dark luxury mauve obsidian.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan ukuran font responsif sehingga angka valuasi `$ 1,721.3` tidak terpotong pada layar yang lebih kecil.
