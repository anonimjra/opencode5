# T002 - Konfigurasi Tailwind CSS & Palet Dark Mauve Obsidian

**Depends on:** T001  
**Estimasi:** sedang

## Tujuan
Mengonfigurasi Tailwind CSS, PostCSS, token warna kustom (Obsidian, Deep Plum, Lavender Mauve, Emerald Gain, Crimson Loss), dan efek visual radial aura sesuai panduan sistem desain.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `postcss.config.mjs` : Konfigurasi plugin PostCSS (tailwindcss, autoprefixer)
- `tailwind.config.ts` : Konfigurasi theme colors, radial gradients, box-shadows, dan border radius
- `app/globals.css` : Direktif Tailwind, variabel CSS kustom, dan class utilitas glow

## Langkah
1. Buat `postcss.config.mjs` yang mendaftarkan `tailwindcss` dan `autoprefixer`.
2. Buat `tailwind.config.ts` dengan ekstensi tema:
   - Warna obsidian (`helios-bg: '#0e0c12'`, `helios-card: '#15121b'`, `helios-card-hover: '#1c1824'`, `helios-pill: '#2b2338'`).
   - Warna aksen (`helios-mauve: '#c084fc'`, `helios-violet: '#a855f7'`, `helios-pink: '#f472b6'`).
   - Warna indikator (`helios-gain: '#34d399'`, `helios-loss: '#f87171'`).
   - Garis batas halus (`helios-border: 'rgba(255, 255, 255, 0.06)'`).
3. Konfigurasikan `app/globals.css` dengan:
   - `@tailwind base; @tailwind components; @tailwind utilities;`
   - Class helper `.glow-ai-radial` untuk efek pendaran radial di kartu keputusan AI.
   - Class helper `.pill-active-glow` untuk latar belakang bercahaya tab/menu aktif.
   - Aturan kustom scrollbar tipis gelap transparan.

## Kriteria selesai
- [ ] Tailwind CSS dan PostCSS terkonfigurasi tanpa error.
- [ ] Token warna helios terdaftar dan dapat digunakan sebagai utility class (misal: `bg-helios-card`, `text-helios-mauve`).
- [ ] Class `.glow-ai-radial` dan `.pill-active-glow` siap pakai di komponen visual.

## Verifikasi
`npx tailwindcss -i app/globals.css -o /dev/null --dry-run || npm run build`

## Catatan / jebakan
- Pastikan warna latar belakang default body di `app/globals.css` diset ke `#0e0c12` dan warna teks putih agar tidak ada flash warna putih saat halaman dimuat.
