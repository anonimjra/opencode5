# T024 - Sistem Toast Notifikasi & Modal Konfirmasi Transaksi

**Depends on:** T002, T005  
**Estimasi:** kecil

## Tujuan
Membangun sistem notifikasi toast (`components/ui/toast.tsx`) dan modal konfirmasi aksi untuk memberikan feedback interaktif instan saat eksekusi order transaksi, ekspor spreadsheet, atau pengaturan preferensi.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/ui/toast.tsx` : Komponen toast notifikasi berbasis Framer Motion
- `lib/toast.ts` : Helper pemanggilan event notifikasi (`toast.success`, `toast.error`, `toast.info`)

## Langkah
1. Buat `components/ui/toast.tsx`:
   - Posisi di pojok kanan bawah layar (`bottom-6 right-6 z-50 flex flex-col gap-2`).
   - Masing-masing toast memiliki ikon status (CheckCircle untuk sukses, AlertCircle untuk error, Info untuk informasi).
   - Latar belakang: Gelap mewah (`bg-[#1c1824]/95 border border-white/10 shadow-2xl backdrop-blur-lg rounded-2xl p-4 text-sm text-white`).
   - Animasi kemunculan dan penghilangan mulus dengan Framer Motion (`initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}`).
   - Durasi tampil otomatis: 3500ms.
2. Buat `lib/toast.ts` yang menyediakan API sederhana untuk memicu notifikasi dari mana saja di aplikasi.
3. Pasang Toast Container di `components/layout/app-shell.tsx`.

## Kriteria selesai
- [ ] Notifikasi toast muncul dengan mulus saat aksi penting berhasil dilakukan (misal order beli/jual berhasil dieksekusi).
- [ ] Desain toast selaras dengan tema dark luxury mauve obsidian.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan event listener atau emitter dibersihkan dengan benar untuk mencegah kebocoran memori (*memory leaks*).
