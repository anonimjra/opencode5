# BLOCKERS: Log Kendala Teknis & Keputusan Otonom

Dokumen ini digunakan oleh `opencode` untuk mencatat kendala teknis yang dihadapi selama pengerjaan task, solusi alternatif yang diterapkan, dan keputusan arsitektural yang diambil.

---

| ID Task | Tanggal/Waktu | Kendala / Masalah | Tindakan / Solusi yang Diterapkan | Status |
| :--- | :--- | :--- | :--- | :--- |
| T001 | 2026-11-20 | `@next/swc-win32-x64-msvc` native binary tidak valid di lingkungan (fallback ke WASM). | Build tetap berjalan sukses menggunakan fallback `@next/swc-wasm-nodejs`. Tidak ada aksi destruktif. | Resolved |
| T007 | 2026-11-20 | File deklarasi `framer-motion` (`dist/index.d.ts`) hilang akibat instalasi parsial. | Reinstall `framer-motion@^11.11.0` dengan `--force`; tipe terpulihkan dan typecheck lolos. | Resolved |
