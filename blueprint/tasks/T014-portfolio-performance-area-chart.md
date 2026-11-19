# T014 - Portfolio Performance AreaChart Recharts dengan Milestone Marker

**Depends on:** T004, T005, T006  
**Estimasi:** besar

## Tujuan
Membangun section visual utama "Portfolio Performance" (`components/dashboard/performance-chart.tsx`) menggunakan Recharts AreaChart dengan kurva ungu/mauve halus, filter rentang waktu (1D, 1W, 1M, 6M, 1Y), dan pin milestone interaktif pada titik bulan Juni ("1st Jun 2025", "$ 16,500", "+25%") dengan garis bantu putus-putus.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/dashboard/performance-chart.tsx` : Komponen grafik performa portofolio bertenaga Recharts

## Langkah
1. Buat `components/dashboard/performance-chart.tsx` sebagai Client Component.
2. Header Bagian Grafik:
   - Judul: `<h3 className="text-base font-bold text-white">Portfolio Performance</h3>`.
   - Filter Timeframe Pills di kanan:
     - Pilihan: `1D`, `1W`, `1M`, `6M`, `1Y`.
     - Opsi `1Y` dalam state aktif: pill bulat dengan warna aksen ungu/mauve lembut (`bg-[#2b2338] text-white border border-white/10`).
3. Konfigurasi Recharts `ResponsiveContainer` & `AreaChart`:
   - Hubungkan data ke `performanceHistory` dari `usePortfolioStore`.
   - Definisikan `<linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">`:
     - Stop 5%: `#c084fc`, opacity 0.3.
     - Stop 95%: `#c084fc`, opacity 0.0.
   - Sumbu Y: `ticks={[10000, 50000, 100000, 150000, 200000]}`, `tickFormatter={(v) => `${v/1000}k`}`, `stroke="#6b667b"`, `axisLine={false}`, `tickLine={false}`.
   - Sumbu X: `dataKey="month"`, label Jan hingga Dec, `stroke="#6b667b"`, `axisLine={false}`, `tickLine={false}`.
   - Kurva Area: `type="monotone"`, `dataKey="valuation"`, `stroke="#c084fc"`, `strokeWidth={2.5}`, `fill="url(#colorValuation)"`.
4. Implementasi Milestone Marker (Pin Bulan Juni):
   - Gunakan komponen SVG kustom atau `ReferenceDot` / overlay absolut yang diposisikan di atas koordinat bulan Juni (`month: 'Jun'`, `valuation: 165000`).
   - Kotak Pin Milestone:
     - Header: "1st Jun 2025" + ikon menu opsi `...`.
     - Nilai: "$ 16,500" + badge hijau "+25%".
   - Garis Panduan Vertikal: garis putus-putus (*dashed line*) yang menghubungkan kotak informasi ke titik lingkaran pink berpendar (*pink glowing pulse dot*) di kurva.
5. Tambahkan Tooltip Recharts kustom untuk menampilkan valuasi interaktif saat pengguna mengarahkan kursor ke bulan lainnya.

## Kriteria selesai
- [ ] AreaChart terender mulus dengan kurva warna mauve dan gradasi memudar ke bawah.
- [ ] Skala sumbu Y menampilkan 10k, 50k, 100k, 150k, 200k.
- [ ] Sumbu X menampilkan bulan Jan hingga Dec.
- [ ] Pin milestone bulan Juni dengan teks "1st Jun 2025", "$ 16,500", "+25%" dan garis putus-putus terlihat presisi seperti gambar referensi.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Komponen Recharts wajib dibungkus dalam Client Component dan membutuhkan penanganan SSR hydration yang aman (misalnya render hanya setelah mounted).
