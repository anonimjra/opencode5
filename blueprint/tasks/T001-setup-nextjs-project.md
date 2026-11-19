# T001 - Inisialisasi Proyek Next.js 15, TypeScript Strict & Tooling

**Depends on:** none  
**Estimasi:** sedang

## Tujuan
Menginisialisasi konfigurasi dasar proyek Next.js dengan App Router, TypeScript dalam mode strict, package manifest, dan dependensi resmi di direktori `opencode5`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/04-TECH-STACK.md

## File yang dibuat / diubah
- `package.json` : Manifest dependensi npm dan skrip build/dev
- `tsconfig.json` : Konfigurasi compiler TypeScript strict mode dengan path alias `@/*`
- `next.config.ts` : Konfigurasi Next.js static export (`output: 'export'`) dan unoptimized images
- `.gitignore` : Pengabaian berkas `.next/`, `node_modules/`, `out/`, dan file lokal

## Langkah
1. Buat `package.json` yang memuat dependensi:
   - `next`, `react`, `react-dom`
   - `typescript`, `@types/react`, `@types/node`
   - `lucide-react`, `framer-motion`, `recharts`, `zustand`, `clsx`, `tailwind-merge`
   - `exceljs`, `file-saver`, `@types/file-saver`, `canvas-confetti`, `@types/canvas-confetti`
   - Skrip: `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`, `"lint": "next lint"`.
2. Jalankan instalasi dependensi dengan `npm install`.
3. Buat `tsconfig.json` dengan opsi `"strict": true`, `"moduleResolution": "bundler"`, `"jsx": "preserve"`, dan `"paths": { "@/*": ["./*"] }`.
4. Buat `next.config.ts` dengan konfigurasi `output: 'export'`, `trailingSlash: true`, dan `images: { unoptimized: true }`.
5. Buat `.gitignore` standar untuk Next.js.

## Kriteria selesai
- [ ] Berkas `package.json` dan `package-lock.json` terkonfigurasi dengan benar.
- [ ] Seluruh dependensi npm terinstal tanpa konflik dependensi.
- [ ] TypeScript strict mode aktif dengan alias `@/*`.

## Verifikasi
`npx tsc --noEmit || npm run build`

## Catatan / jebakan
- Pastikan eksekusi dilakukan di dalam folder `opencode5`.
- Jangan instal library selain yang tercantum di `04-TECH-STACK.md`.
