# AGENTS.md

Petunjuk kerja otomatis untuk `opencode` (autonomous coding agent) pada proyek **Helios Investments** di direktori `opencode5`.

---

## 1. Mode Kerja Otonom

- Kerjakan seluruh task di `blueprint/tasks/` secara berurutan mulai dari `T001` hingga selesai tanpa meminta konfirmasi user.
- **Sebelum mulai task:**
  1. Baca berkas task target (`blueprint/tasks/TXXX-...md`).
  2. Baca semua berkas yang dirujuk pada bagian **"Baca dulu"**.
  3. Cek dependensi pada bagian **"Depends on"**; pastikan task prasyarat sudah terselesaikan.
- **Saat mengeksekusi:**
  1. Tulis kode secara 100% lengkap tanpa placeholder, tanpa komentar `// TODO`, dan tanpa pemotongan kode.
  2. Terapkan standar TypeScript strict (`noImplicitAny`, type-safe interfaces).
  3. Pastikan estetika visual mencerminkan visual Dark Luxury Mauve Obsidian sesuai `blueprint/07-DESIGN-SYSTEM.md`.
- **Setelah selesai tiap task:**
  1. Jalankan perintah yang tertulis di bagian **"Verifikasi"** (contoh: `npm run build` atau `npx tsc --noEmit`).
  2. Pastikan semua checklist di **"Kriteria selesai"** terpenuhi.
  3. Update berkas `blueprint/PROGRESS.md`: ubah status `[ ]` menjadi `[x]`.
  4. Lakukan git commit dengan pesan terstruktur: `git commit -m "TXXX: <judul task>"`.

---

## 2. Penanganan Hambatan (Blocker Protocol)

- **Jangan berhenti dan jangan menunggu konfirmasi manusia.**
- Jika terjadi error build, dependensi, atau penamaan modul:
  1. Analisis akar masalah (root cause) melalui terminal output atau TypeScript diagnostics.
  2. Coba perbaiki secara mandiri dengan opsi alternatif yang paling aman dan sesuai arsitektur.
  3. Jika masih terblokir, catat detail kendala di `blueprint/BLOCKERS.md` (ID task, deskripsi error, langkah yang sudah dicoba, dan keputusan yang diambil), lalu lanjutkan ke task berikutnya yang tidak memiliki dependensi langsung.
  4. Jangan pernah meninggalkan repositori dalam kondisi compile error atau file setengah jadi.

---

## 3. Batasan Keras & Integritas Repositori

- **Scope Boundary:** Hanya sentuh, ubah, dan buat berkas di dalam root folder proyek `opencode5`. Jangan pernah mengakses atau memodifikasi direktori di luar `opencode5`.
- **Preservasi Blueprint:** Dilarang mengedit atau menghapus berkas perencanaan di folder `blueprint/`, KECUALI `blueprint/PROGRESS.md` (untuk mencentang status) dan `blueprint/BLOCKERS.md` (untuk mencatat log kendala).
- **Zero Destructive Commands:** Dilarang menjalankan perintah yang berpotensi menghapus data kerja seperti `rm -rf`, `git reset --hard`, `git clean -fd`, atau `git push --force`.
- **Dependensi Resmi:** Hanya gunakan dependensi npm yang terdaftar di `blueprint/04-TECH-STACK.md`. Jangan menginstal library acak tanpa justifikasi arsitektur.

---

## 4. Standar Ekspor Statis GitHub Pages

- Proyek ini dirancang enterprise-grade dengan kapabilitas Static Site Generation (SSG).
- Konfigurasi `next.config.ts` harus mendukung `output: 'export'` dan `images: { unoptimized: true }`.
- Pastikan berkas `.nojekyll` selalu ada di folder `public/` dan hasil build `out/` agar aset direktori `_next/` tidak diabaikan oleh mesin Jekyll GitHub Pages.

---

## 5. Penyelesaian Akhir

Setelah task terakhir selesai dikerjakan:
1. Jalankan checklist final di `blueprint/99-FINAL-CHECKLIST.md`.
2. Pastikan build static `npm run build` menghasilkan folder `out/` tanpa peringatan fatal.
3. Tulis ringkasan hasil eksekusi di bagian bawah `blueprint/PROGRESS.md`.
