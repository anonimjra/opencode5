# T007 - Layout Root Shell, Metadata SEO & Responsive Wrapper

**Depends on:** T002, T005, T006  
**Estimasi:** sedang

## Tujuan
Membangun layout root aplikasi (`app/layout.tsx`) dengan metadata SEO modern, font sans yang bersih, proteksi hydration mismatch, dan komponen pembungkus `components/layout/app-shell.tsx`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/layout.tsx` : Root layout Next.js dengan html, body, dan font styling
- `components/layout/app-shell.tsx` : Shell container pembagi Sidebar kiri dan Main Content kanan

## Langkah
1. Buat `components/layout/app-shell.tsx`:
   - Komponen `'use client'` yang menangani hidrasi Zustand store.
   - Mengatur grid/flex responsif: Sidebar kiri (lebar statis ~260px pada desktop, collapsable pada mobile) dan area konten utama di sisi kanan.
   - Wadah utama diberi padding yang pas (`p-4 md:p-6 lg:p-8`) dan latar belakang obsidian `#0e0c12`.
2. Edit `app/layout.tsx`:
   - Konfigurasikan metadata: title "Helios Investments | AI Wealth & Portfolio Intelligence", description, Open Graph tags.
   - Terapkan background `#0e0c12` dan antialiased text.
   - Masukkan `AppShell` di dalam tag `body`.

## Kriteria selesai
- [ ] Root layout merender latar belakang obsidian dengan rapi tanpa flicker putih.
- [ ] AppShell siap menerima Sidebar dan konten halaman dinamis.
- [ ] Tidak ada error hydration mismatch pada konsol browser.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Gunakan state `isMounted` atau helper hydration di `AppShell` untuk merender skeleton loader tipis hingga LocalStorage siap.
