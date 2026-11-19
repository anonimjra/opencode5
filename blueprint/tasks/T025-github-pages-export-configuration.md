# T025 - Konfigurasi Static Export GitHub Pages & Bypass Jekyll

**Depends on:** T001, T007, T015  
**Estimasi:** kecil

## Tujuan
Memastikan konfigurasi ekspor statis Next.js (`next.config.ts`) siap untuk publikasi GitHub Pages, termasuk pembuatan file `.nojekyll` di folder `public/` dan otomatisasi skrip deployment.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md

## File yang dibuat / diubah
- `next.config.ts` : Konfigurasi static export dan basePath fleksibel
- `public/.nojekyll` : Berkas penanda pengabaian Jekyll
- `package.json` : Penambahan skrip deploy GitHub Pages

## Langkah
1. Pastikan `next.config.ts` memuat konfigurasi:
   ```typescript
   import type { NextConfig } from 'next';

   const nextConfig: NextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true,
     },
     basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
   };

   export default nextConfig;
   ```
2. Buat berkas kosong `public/.nojekyll`.
3. Tambahkan skrip ke `package.json`:
   - `"export": "next build"`,
   - `"deploy": "next build && npx --yes gh-pages -d out -b gh-pages --dotfiles"`.
4. Uji eksekusi `npm run build` dan pastikan folder `out/` berhasil terbuat dengan berkas `out/.nojekyll` dan seluruh halaman HTML statis (`index.html`, `portfolio/index.html`, dll.).

## Kriteria selesai
- [ ] Perintah `npm run build` menghasilkan output statis murni di folder `out/`.
- [ ] Berkas `out/.nojekyll` ada dan valid.
- [ ] Seluruh aset CSS dan JS terhubung dengan path relatif/basePath yang valid.

## Verifikasi
`npm run build && test -f out/.nojekyll`

## Catatan / jebakan
- Jangan pernah menghapus berkas `.nojekyll`; jika hilang, GitHub Pages akan menolak menyajikan berkas di dalam direktori `_next/`.
