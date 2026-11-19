# T015 - Perakitan Halaman Dashboard Utama (Integrasi Grid 3-Kolom)

**Depends on:** T009, T010, T011, T012, T013, T014  
**Estimasi:** sedang

## Tujuan
Merakit seluruh komponen dashboard ke dalam halaman utama (`app/page.tsx`) dengan struktur layout grid 3-kolom di bagian atas dan grafik performa selebar halaman di bagian bawah.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/03-ARCHITECTURE.md

## File yang dibuat / diubah
- `app/page.tsx` : Halaman dashboard utama aplikasi Helios Investments

## Langkah
1. Buka dan edit `app/page.tsx`.
2. Impor komponen:
   - `TopHeader` dari `@/components/layout/top-header`
   - `TotalHoldingCard` dari `@/components/dashboard/total-holding-card`
   - `AIDecisionBanner` dari `@/components/dashboard/ai-decision-banner`
   - `WatchlistCard` dari `@/components/dashboard/watchlist-card`
   - `PortfolioGrid` dari `@/components/dashboard/portfolio-grid`
   - `PerformanceChart` dari `@/components/dashboard/performance-chart`
3. Susun hirarki layout:
   - Bilah navigasi atas: `<TopHeader />`
   - Baris Grid Atas (3 Kolom):
     - Kolom 1 (Kiri): `<TotalHoldingCard />` ditumpuk di atas `<AIDecisionBanner />` dengan gap vertikal 4.
     - Kolom 2 (Tengah): `<WatchlistCard />`.
     - Kolom 3 (Kanan): `<PortfolioGrid />`.
     - Kelas container: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6`.
   - Baris Bawah (Full-Width):
     - Wadah grafik: `<div className="mt-6"><PerformanceChart /></div>`.
4. Pastikan wrapping container memiliki margin dan padding yang selaras dengan tema visual keseluruhan.

## Kriteria selesai
- [ ] Tampilan halaman utama mereplikasi 100% tata letak visual pada gambar referensi.
- [ ] Responsif dari resolusi mobile hingga layar desktop lebar.
- [ ] Build Next.js berjalan tanpa error sintaks atau layout shift.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Perhatikan proporsi tinggi kartu agar ketiga kolom di baris atas tampak seimbang dan harmonis.
