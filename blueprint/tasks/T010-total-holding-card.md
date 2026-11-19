# T010 - Kartu Metrik Total Holding ($12,304.11) & Dropdown Rentang Waktu

**Depends on:** T005, T006  
**Estimasi:** kecil

## Tujuan
Mengembangkan komponen kartu "Total Holding" (`components/dashboard/total-holding-card.tsx`) yang menampilkan label judul, dropdown filter periode (default: 6M), angka saldo portofolio besar ($ 12,304.11), dan indikator pertumbuhan.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/dashboard/total-holding-card.tsx` : Komponen kartu valuasi total portofolio

## Langkah
1. Buat `components/dashboard/total-holding-card.tsx`.
2. Ambil nilai `totalHolding` dan `holdingPeriod` dari `usePortfolioStore`.
3. Susun layout kartu:
   - Wrapper: `bg-helios-card border border-white/5 rounded-3xl p-5 shadow-lg relative overflow-hidden`.
   - Header Baris 1:
     - Teks "Total Holding" di sisi kiri (`text-sm font-medium text-white/80`).
     - Dropdown pill di sisi kanan: menampilkan `6M` dengan ikon panah bawah (`chevron-down`). Opsi dropdown: 1M, 3M, 6M, 1Y, ALL.
   - Baris 2:
     - Angka besar utama: `<div className="text-3xl font-extrabold text-white mt-4 tracking-tight">$ 12,304.11</div>`.
     - Sub-indikator mini: gain `+$1,240.50 (+11.2%)` berwarna hijau mint lembut.
4. Hubungkan perubahan dropdown ke action `setHoldingPeriod` di Zustand store.

## Kriteria selesai
- [ ] Angka "$ 12,304.11" tertera jelas dan presisi sesuai gambar referensi.
- [ ] Dropdown 6M interaktif dan mengubah state holding period.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan spasi tunggal antara `$ ` dan angka nominal untuk menyamai visual asli.
