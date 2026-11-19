# 05-CONVENTIONS: Coding Standards & Engineering Conventions

Dokumen standarisasi gaya kode, konvensi penamaan, dan aturan kualitas perangkat lunak untuk **Helios Investments**.

---

## 1. Aturan Penamaan Berkas & Struktur Kode

1. **Komponen React:**
   - Gunakan format **kebab-case** untuk nama file komponen: `components/dashboard/total-holding-card.tsx`, `components/ai/ai-chat-drawer.tsx`.
   - Gunakan format **PascalCase** untuk nama fungsi komponen di dalam berkas: `export function TotalHoldingCard()`.
2. **Utilitas & Store:**
   - Gunakan format **kebab-case** untuk file utilitas: `lib/formatters.ts`, `lib/excel-export.ts`.
   - Gunakan awalan `use` untuk hooks dan Zustand store: `usePortfolioStore`.
3. **Definisi Tipe TypeScript:**
   - Letakkan tipe umum di `types/index.ts`.
   - Berikan nama antarmuka dengan format **PascalCase**: `interface AssetPosition`, `interface WatchlistItem`, `interface PerformanceDataPoint`.

---

## 2. Standar TypeScript Strict

- Wajib mengaktifkan `"strict": true` pada `tsconfig.json`.
- **Dilarang keras** menggunakan tipe `any`. Jika tipe data bersifat dinamis, gunakan `unknown` dengan type-guarding yang eksplisit.
- Semua properti props komponen wajib didefinisikan secara tegas melalui `interface` atau `type`.
- Seluruh nilai mata uang, persentase, dan tanggal harus melalui fungsi utilitas `lib/formatters.ts` untuk konsistensi tampilan.

---

## 3. Standar Tailwind CSS & Styling

- Gunakan hierarki kelas Tailwind yang konsisten:
  1. Layout & Posisi (`flex`, `grid`, `relative`, `absolute`)
  2. Sizing & Box Model (`w-full`, `max-w-md`, `p-4`, `m-2`)
  3. Typography (`text-sm`, `font-semibold`, `text-white/80`)
  4. Visual & Effects (`bg-[#15121b]`, `border border-white/5`, `rounded-2xl`, `shadow-lg`)
  5. Interaktivitas & Transisi (`hover:bg-white/10`, `transition-all duration-200`)
- Hindari penggunaan CSS inline arbitrary yang repetitif; manfaatkan token warna yang didefinisikan pada `blueprint/07-DESIGN-SYSTEM.md`.

---

## 4. Standar Git Commit Per Task

Setiap kali menyelesaikan task dari `blueprint/tasks/`, lakukan commit dengan format:

```text
TXXX: <deskripsi singkat perubahan dalam kalimat aktif>

Contoh:
T001: Inisialisasi Next.js 15, TypeScript Strict dan dependensi proyek
T014: Implementasi Recharts AreaChart dengan custom milestone marker
```
