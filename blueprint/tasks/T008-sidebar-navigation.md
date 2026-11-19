# T008 - Sidebar Navigation Berkelas Dark Luxury dengan Pill Active State

**Depends on:** T002, T007  
**Estimasi:** sedang

## Tujuan
Mengembangkan komponen Sidebar navigasi di sisi kiri (`components/layout/sidebar.tsx`) dengan logo Helios Investments, tautan menu (Dashboard, Portfolio, Analysis, Market, Community), status aktif berpendar (mauve pill glow), serta menu bawah (Settings, Support).

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/layout/sidebar.tsx` : Komponen sidebar navigasi vertikal

## Langkah
1. Buat `components/layout/sidebar.tsx` sebagai Client Component.
2. Render Header Brand di bagian atas:
   - Ikon geometris stylized "H" berwarna putih.
   - Teks brand "Helios Investments" dengan font tebal modern (`font-bold text-white text-base tracking-tight`).
3. Render Daftar Menu Utama:
   - **Dashboard**: Ikon layout/dashboard, label "Dashboard", state aktif dengan class `.pill-active-glow` (background ungu transparan, border mauve halus, teks putih terang).
   - **Portfolio**: Ikon shopping bag / brief, label "Portfolio", tautan ke `/portfolio`.
   - **Analysis**: Ikon chart bar / analysis, label "Analysis", tautan ke `/analysis`.
   - **Market**: Ikon easel / market, label "Market", tautan ke `/market`.
   - **Community**: Ikon users / community, label "Community", tautan ke `/community`.
4. Render Navigasi Bagian Bawah:
   - **Settings**: Ikon gear, label "Settings", tautan ke `/settings`.
   - **Support**: Ikon 24h / headphone support, label "Support".
5. Gunakan `usePathname()` dari `next/navigation` untuk mendeteksi rute aktif dan menerapkan style pill secara otomatis.

## Kriteria selesai
- [ ] Tampilan Sidebar identik dengan gambar referensi.
- [ ] Tombol Dashboard memiliki efek gradasi pill mauve glowing saat aktif.
- [ ] Hover effect yang halus pada setiap item menu navigasi.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan spacing vertikal antara logo, menu tengah, dan menu bawah seimbang menggunakan `flex flex-col justify-between`.
