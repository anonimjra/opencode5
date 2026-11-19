# 00-README: Helios Investments Blueprint & Execution Index

Dokumen master arsitektur dan panduan navigasi eksekusi untuk pembangunan aplikasi **Helios Investments** — platform dashboard manajemen portofolio investasi multi-aset bertenaga AI.

---

## 1. Ikhtisar Ekosistem Proyek

- **Nama Platform:** Helios Investments
- **Tagline:** AI-Driven Portfolio & Multi-Asset Wealth Intelligence
- **Konsep Inti:** Dashboard investasi dark luxury (mauve obsidian aesthetic) dengan pelacakan valuasi portofolio interaktif, grafik performa Recharts presisi tinggi dengan milestone marker, watchlist realtime, kartu posisi saham (AAPL, AMZN, MSFT, NVDA), rekomendasi rebalancing AI, dan ekspor spreadsheet Excel.
- **Arsitektur:** Client-side Local-First (Zustand + LocalStorage), Zero-Config Backend, GitHub Pages Static Export Ready.

---

## 2. Struktur Dokumen Perencanaan

Folder `blueprint/` ini berisi spesifikasi sistem lengkap yang dirancang khusus untuk eksekusi otonom:

| Dokumen | Deskripsi |
| :--- | :--- |
| `00-README.md` | Dokumen panduan utama dan indeks urutan eksekusi |
| `02-PROJECT-BRIEF.md` | Spesifikasi fungsional, fitur visual referensi, target audiens, dan batasan |
| `03-ARCHITECTURE.md` | Topologi komponen Next.js App Router, alur data Zustand, dan strategi SSG |
| `04-TECH-STACK.md` | Daftar library resmi, versi, dan rasionalisasi teknis |
| `05-CONVENTIONS.md` | Aturan penulisan kode TypeScript, Tailwind CSS, struktur commit git |
| `06-DATA-MODEL.md` | Definisi skema TypeScript (Portfolio, Asset, Transaction, AI Insight, Watchlist) |
| `07-DESIGN-SYSTEM.md` | Palet warna obsidian/mauve, efek glow radial, tipografi, dan Recharts style |
| `PROGRESS.md` | Checklist pelacakan progres pengerjaan task T001–T026 |
| `BLOCKERS.md` | Catatan kendala teknis dan keputusan arsitektural selama eksekusi |
| `99-FINAL-CHECKLIST.md` | Matriks verifikasi akhir sebelum serah terima |

---

## 3. Peta Urutan Eksekusi Task (`blueprint/tasks/`)

Eksekusi dibagi menjadi 6 fase bertahap dengan dependensi linier:

```text
[FASE 1: FONDASI & ENVIRONMENT]
T001: Inisialisasi Next.js 15, TypeScript Strict & Tooling
T002: Konfigurasi Tailwind CSS v4 & Palet Dark Mauve Obsidian
T003: Definisi Tipe TypeScript & Data Contracts

[FASE 2: STATE MANAGEMENT & DATA SEED]
T004: Kompilasi Mock Seed Data Presisi (Helios Nadia Portfolio)
T005: Store Zustand Reaktif & LocalStorage Synchronizer
T006: Helper Utility Formatters (Mata Uang, Persentase, Matematika Finansial)

[FASE 3: SHELL APLIKASI & NAVIGASI]
T007: Layout Root Shell & Responsive Container
T008: Sidebar Navigation (Pill Active State & Dark Luxury Accents)
T009: Header Navigasi Atas, Segmented Tabs & AI Search Prompt Bar

[FASE 4: KOMPONEN DASHBOARD UTAMA (MOCKUP VISUAL SPEC)]
T010: Kartu Metrik Total Holding & Dropdown Rentang Waktu (6M)
T011: Banner Promosi AI Decisions & Glowing Radial Accent
T012: Kartu Watchlist Interaktif (SPOT, AMZN, MSFT, NVDA + Gain/Lose Tabs)
T013: Kartu Grid Posisi Portofolio (AAPL, AMZN, MSFT, NVDA) & See All Link
T014: Portfolio Performance Recharts Area Chart & Milestone Tooltip Marker
T015: Assembler Halaman Dashboard Utama (Integrasi Grid 3-Kolom)

[FASE 5: FITUR ENTERPRISE & INTERAKTIVITAS]
T016: Helios AI Assistant Chat Drawer & Rebalancing Generator
T017: Modal Drilldown Detail Aset & Simulasi Order (Buy/Sell Instant)
T018: Halaman Detail Portofolio Lengkap (/portfolio)
T019: Halaman Market Explorer & Bursa Screener (/market)
T020: Halaman Analisis Risiko, Metrik & Sharpe Ratio (/analysis)
T021: Halaman Community Sentiment & Polling (/community)
T022: Service Export Laporan Portofolio Excel (.xlsx) dengan ExcelJS
T023: Live Market Ticker Price Simulator (Realtime Toggle Fluctuations)
T024: Toast Notification System & Dialog Konfirmasi Transaksi

[FASE 6: POLISH, STATIC EXPORT & VERIFIKASI]
T025: Konfigurasi GitHub Pages Static Export & .nojekyll Handler
T026: Verifikasi Build Total, Audit Tipe, Dokumentasi README.md
```

---

## 4. Instruksi Menjalankan Agen

Pindahkan terminal ke direktori root `opencode5`, lalu jalankan instruksi:

```bash
cd C:\Users\L480\Downloads\opencode5
```

Jalankan perintah otonom:
> Baca `AGENTS.md` dan `blueprint/00-README.md`, lalu kerjakan semua task di `blueprint/tasks/` berurutan sampai selesai tanpa bertanya. Update `blueprint/PROGRESS.md` setiap task selesai.
