# 04-TECH-STACK: Helios Investments Dependencies & Rationale

Dokumen ini mendokumentasikan spesifikasi pustaka perangkat lunak, versi target, dan justifikasi teknis penggunaan dependensi untuk proyek **Helios Investments**.

---

## 1. Core Framework & Language

| Paket | Versi | Peran & Justifikasi |
| :--- | :--- | :--- |
| **Next.js** | `^15.0.0` / `latest` | Menggunakan App Router untuk arsitektur modern berbasis komponen, dynamic client components, dan kapabilitas static HTML export (`output: 'export'`). |
| **React** | `^19.0.0` / `^18.3.1` | Fondasi UI reaktif, declarative state, dan transisi komponen yang mulus. |
| **TypeScript** | `^5.6.0` | Penegakan tipe data ketat (*Strict Mode*) untuk menjamin zero runtime type errors pada kalkulasi portofolio finansial. |

---

## 2. Styling, Icons & UI Primitives

| Paket | Versi | Peran & Justifikasi |
| :--- | :--- | :--- |
| **Tailwind CSS** | `^3.4.0` / `v4` | Utility-first styling untuk meracik palet warna dark luxury mauve obsidian secara modular tanpa file CSS terpisah yang berantakan. |
| **Lucide React** | `^0.460.0` | Koleksi ikon vektor modern, seragam, dan ringan untuk sidebar, status gain/loss, indikator search, dan kontrol audio/sparkle. |
| **Framer Motion** | `^11.11.0` | Animasi transisi drawer AI, modal pop-up, tooltip hover, dan efek pendaran aura radial yang halus (*60fps*). |
| **Canvas Confetti** | `^1.9.3` | Efek animasi selebrasi visual saat simulasi order pembelian aset berhasil dieksekusi. |
| **clsx & tailwind-merge** | `latest` | Utilitas penggabungan kelas conditional CSS yang bersih tanpa konflik (*twMerge*). |

---

## 3. Data Visualization & State Management

| Paket | Versi | Peran & Justifikasi |
| :--- | :--- | :--- |
| **Recharts** | `^2.13.0` | Pustaka grafik berbasis SVG teruji untuk merender `AreaChart` kurva performa tahunan dengan custom milestone marker, gradasi fill, dan tooltip interaktif. |
| **Zustand** | `^5.0.0` | Manajemen state client-side minimalis, cepat, dan reaktif dengan middleware persistensi bawaan (`persist`) ke `localStorage`. |

---

## 4. Reporting & Spreadsheet Engine

| Paket | Versi | Peran & Justifikasi |
| :--- | :--- | :--- |
| **ExcelJS** | `^4.4.0` | Mesin pembuat spreadsheet Excel (.xlsx) client-side tanpa ketergantungan server backend. Menghasilkan format angka akuntansi, header bertema mauve, dan kalkulasi PnL. |
| **File-Saver** | `^2.0.5` | Helper pengunduh file Blob spreadsheet langsung ke direktori Download pengguna. |

---

## 5. Development & Deployment Tools

| Paket | Versi | Peran & Justifikasi |
| :--- | :--- | :--- |
| **gh-pages** | `latest` | Alat deploy otomatis folder `out/` ke branch `gh-pages` GitHub dengan perintah `npx --yes gh-pages -d out -b gh-pages --dotfiles`. |
| **PostCSS & Autoprefixer** | `latest` | Pemrosesan vendor prefixing CSS otomatis lintas peramban modern. |
